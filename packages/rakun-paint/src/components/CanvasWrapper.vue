<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { calculateRealMousePosition, drawSquareOnCanvas, convertHexWithOpacityToRGBA, drawGrid, calculateGridPosition } from '@/helpers/canvas';
import { wasPixelMarked } from '@/helpers/helpers';
import { clearCanvas } from '@/helpers/canvas';

const store = useStore();

const zoom = computed(() => store.state.zoom);
const canvasWidth = computed(() => {
  return store.state.canvasWidth * zoom.value
});
const canvasHeight = computed(() => {
  return store.state.canvasHeight * zoom.value
});
const selectedColor = computed(() => store.state.selectedColor);
const selectedOpacity = computed(() => store.state.selectedOpacity);

const canvasHoverRef = ref(null);
const canvasGridRef = ref(null);
const canvasImageRef = ref(null);
const canvasWholeImageRef = ref(null);

const canvasHoverCtx = computed({
  get() {
    return store.state.canvasHoverCtx;
  },
  set(newVal) {
    store.dispatch('updateProp', { name: 'canvasHoverCtx', value: newVal });
  }
});


const canvasGridCtx = computed({
  get() {
    return store.state.canvasGridCtx;
  },
  set(newVal) {
    store.dispatch('updateProp', { name: 'canvasGridCtx', value: newVal });
  }
});

const canvasImageCtx = computed({
  get() {
    return store.state.canvasImageCtx;
  },
  set(newVal) {
    store.dispatch('updateProp', { name: 'canvasImageCtx', value: newVal });
  }
});

const mouseDown = ref(false);
let markedPixels: Array<[number, number]> = [];

const highlightCurrentDrawingCell = (e: Event) => {
  clearCanvas(canvasHoverCtx.value, canvasWidth.value, canvasHeight.value)
  const pos = calculateRealMousePosition(e, (canvasHoverRef as any)._value);
  const colorToDraw = convertHexWithOpacityToRGBA(selectedColor.value, selectedOpacity.value);
  const gridX = calculateGridPosition(pos.x, zoom.value);
  const gridY = calculateGridPosition(pos.y, zoom.value);
  drawSquareOnCanvas(canvasHoverCtx.value, gridX, gridY, zoom.value, colorToDraw);
  if (mouseDown.value) {
    if (!wasPixelMarked(markedPixels, gridX, gridY)) {
      drawSquareOnCanvas(canvasImageCtx.value, gridX, gridY, zoom.value, colorToDraw);
    }
  }
}

const onMouseUp = () => {
  mouseDown.value = false; 
  markedPixels = [];
} 

onMounted(() => {
  canvasHoverCtx.value = (canvasHoverRef as any)._value.getContext('2d');
  canvasGridCtx.value = (canvasGridRef as any)._value.getContext('2d');
  canvasImageCtx.value = (canvasImageRef as any)._value.getContext('2d');

  drawGrid(canvasGridCtx.value, canvasWidth.value, canvasHeight.value, 'pink', zoom.value);
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
    @mousedown="mouseDown = true"
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
.rkn-canvas-wrapper {
  flex: 5;

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
