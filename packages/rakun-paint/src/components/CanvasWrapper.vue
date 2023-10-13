<script setup lang="ts">
import { computed, ref, onMounted, Ref } from 'vue';
import { useStore } from 'vuex';
import {
  calculateRealMousePosition,
  drawSquareOnCanvas,
  convertHexWithOpacityToRGBA,
  drawGrid,
  calculateGridPosition,
  loadAndResizeImageToCanvas,
  clearCanvas,
  drawLineOnCanvas,
  removeSquareOnCanvas,
  fillCanvasFragment,
  drawRectOnCanvas,
} from '@/helpers/canvas';
import { wasPixelMarked } from '@/helpers/helpers';
import { Tools } from '@/helpers/enums';
import { PositionArray, RknMouseEvent } from '@/helpers/types';
import { PositionXY } from '@/helpers/types';

const store = useStore();

const zoom = computed(() => store.state.zoom);
const canvasWidth = computed(() => {
  return store.state.canvasWidth * zoom.value;
});
const canvasHeight = computed(() => {
  return store.state.canvasHeight * zoom.value;
});
const selectedColor = computed(() => store.state.selectedColor);
const selectedOpacity = computed(() => store.state.selectedOpacity);
const canvasThumbnailCtx = computed(() => store.state.canvasThumbnailCtx);

let lastPos: PositionXY = { x: 0, y: 0 };

const canvasHoverRef = ref(null);
const canvasGridRef = ref(null) as Ref;
const canvasImageRef = ref(null);
const canvasWholeImageRef = ref(null);
let gridX!: number;
let gridY!: number;

const colorToDraw = computed(() =>
  convertHexWithOpacityToRGBA(selectedColor.value, selectedOpacity.value),
);

const canvasHoverCtx = computed({
  get() {
    return store.state.canvasHoverCtx;
  },
  set(newVal) {
    store.dispatch('updateProp', { name: 'canvasHoverCtx', value: newVal });
  },
});

const canvasGridCtx = computed({
  get() {
    return store.state.canvasGridCtx;
  },
  set(newVal) {
    store.dispatch('updateProp', { name: 'canvasGridCtx', value: newVal });
  },
});

const canvasImageCtx = computed({
  get() {
    return store.state.canvasImageCtx;
  },
  set(newVal) {
    store.dispatch('updateProp', { name: 'canvasImageCtx', value: newVal });
  },
});

const mouseDown = ref(false);
// eslint-disable-next-line
let drawStartPoint: PositionArray = [
  undefined,
  undefined,
];
let markedPixels: Array<[number, number]> = [];

const highlightCurrentDrawingCell = async (e: Event) => {
  const pos = calculateRealMousePosition(
    e as RknMouseEvent,
    (canvasHoverRef as any)._value,
  );
  gridX = calculateGridPosition(pos.x as number, zoom.value);
  gridY = calculateGridPosition(pos.y as number, zoom.value);

  // to avoid unnecessary canvas clear
  if (gridX !== lastPos.x || gridY !== lastPos.y) {
    await clearCanvas(
      canvasHoverCtx.value,
      canvasWidth.value,
      canvasHeight.value,
    );
    lastPos = { x: gridX, y: gridY };
  }

  // Eraser have different pixel highlight color than other tools
  if (store.state.selectedTool === Tools.eraser) {
    drawSquareOnCanvas(
      canvasHoverCtx.value,
      gridX,
      gridY,
      zoom.value,
      'rgba(200, 200, 200, 0.9)',
    );
  } else {
    drawSquareOnCanvas(
      canvasHoverCtx.value,
      gridX,
      gridY,
      zoom.value,
      colorToDraw.value,
    );
  }
  if (mouseDown.value) {
    if (store.state.selectedTool === Tools.eraser) {
      removeSquareOnCanvas(canvasImageCtx.value, gridX, gridY, zoom.value);
    } else if (!wasPixelMarked(markedPixels, gridX, gridY)) {
      if (store.state.selectedTool === Tools.pencil) {
        drawSquareOnCanvas(
          canvasImageCtx.value,
          gridX,
          gridY,
          zoom.value,
          colorToDraw.value,
        );
      } else if (store.state.selectedTool === Tools.line) {
        drawLineOnCanvas(
          canvasHoverCtx.value,
          gridX,
          gridY,
          zoom.value,
          colorToDraw.value,
          drawStartPoint,
        );
      } else if (store.state.selectedTool === Tools.rect) {
        drawRectOnCanvas(
          canvasHoverCtx.value,
          gridX,
          gridY,
          zoom.value,
          colorToDraw.value,
          drawStartPoint,
        );
      }
    }
  }
};

const onMouseUp = async () => {
  if (store.state.selectedTool === Tools.line) {
    await drawLineOnCanvas(
      canvasImageCtx.value,
      gridX,
      gridY,
      zoom.value,
      colorToDraw.value,
      drawStartPoint,
    );
  } else if (store.state.selectedTool === Tools.rect) {
    await drawRectOnCanvas(
      canvasImageCtx.value,
      gridX,
      gridY,
      zoom.value,
      colorToDraw.value,
      drawStartPoint,
    );
  } else if (store.state.selectedTool === Tools.fill) {
    await fillCanvasFragment(
      canvasImageCtx.value,
      gridX,
      gridY,
      zoom.value,
      colorToDraw.value,
    );
  }

  mouseDown.value = false;
  markedPixels = [];

  // need to clear thumbnail before refresh to include eraser actions
  await clearCanvas(
    canvasThumbnailCtx.value,
    canvasWidth.value,
    canvasHeight.value,
  );
  // copy canvas image to thumbnail canvas in the sidebar
  loadAndResizeImageToCanvas(
    canvasImageCtx.value.canvas,
    canvasThumbnailCtx.value,
    canvasWidth.value,
    canvasHeight.value,
    zoom.value,
    2,
  );
};

const onMouseDown = (e: MouseEvent) => {
  mouseDown.value = true;
  const pos = calculateRealMousePosition(
    e as RknMouseEvent,
    (canvasHoverRef as any)._value,
  );
  drawStartPoint = [pos.x, pos.y];
};

onMounted(() => {
  canvasHoverCtx.value = (canvasHoverRef as any)._value.getContext('2d');
  canvasGridCtx.value = (canvasGridRef as any)._value.getContext('2d');
  canvasImageCtx.value = (canvasImageRef as any)._value.getContext('2d');

  drawGrid(
    canvasGridCtx.value,
    canvasWidth.value,
    canvasHeight.value,
    'pink',
    zoom.value,
  );
});
</script>
<template>
  <div class="rkn-canvas-wrapper">
    <canvas
      id="rkn-canvas-helper__grid"
      ref="canvasGridRef"
      class="rkn-drawing-canvas rkn-drawing-canvas--z-index-4"
      :width="canvasWidth"
      :height="canvasHeight"
      @mousemove="highlightCurrentDrawingCell"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    ></canvas>
    <canvas
      id="rkn-canvas-helper__hover"
      ref="canvasHoverRef"
      class="rkn-drawing-canvas rkn-drawing-canvas--z-index-3"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
    <canvas
      id="rkn-canvas-helper__current-image"
      ref="canvasImageRef"
      class="rkn-drawing-canvas rkn-drawing-canvas--z-index-2"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
    <canvas
      id="rkn-canvas-helper__current-image"
      ref="canvasHelperImageRef"
      class="rkn-hidden"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
    <canvas
      id="rkn-canvas-helper__whole-image"
      ref="canvasWholeImageRef"
      class="rkn-hidden"
    ></canvas>
  </div>
</template>

<style scoped lang="scss">
@import './../styles/style.scss';

.rkn-canvas-wrapper {
  flex: 5;
  overflow: auto;
  position: relative;

  .rkn-drawing-canvas {
    position: absolute;
    top: 0;
    left: 0;
    margin: 25px;

    &--z-index-4 {
      z-index: 4;
    }
    &--z-index-3 {
      z-index: 3;
    }
    &--z-index-2 {
      z-index: 2;
    }
  }
}
</style>
