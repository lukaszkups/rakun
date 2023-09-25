<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { calculateRealMousePosition, drawSquareOnCanvas, convertHexWithOpacityToRGBA, drawGrid, calculateGridPosition } from '@/helpers/canvas';

const store = useStore();

const zoom = computed(() => store.state.zoom);
const canvasWidth = computed(() => store.state.canvasWidth * zoom.value);
const canvasHeight = computed(() => store.state.canvasHeight * zoom.value);
const selectedColor = computed(() => store.state.selectedColor);
const selectedOpacity = computed(() => store.state.selectedOpacity);

const canvasHoverRef = ref(null);
const canvasImageRef = ref(null);
const canvasWholeImageRef = ref(null);
const canvasGridRef = ref(null);

let canvasHoverCtx: CanvasRenderingContext2D | null = null;
let canvasGridCtx: CanvasRenderingContext2D | null = null;
let canvasImageCtx: CanvasRenderingContext2D | null = null;
const mouseDown = ref(false);

const highlightCurrentDrawingCell = (e: Event) => {
  canvasHoverCtx?.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  const pos = calculateRealMousePosition(e, (canvasHoverRef as any)._value);
  const colorToDraw = convertHexWithOpacityToRGBA(selectedColor.value, selectedOpacity.value);
  const gridX = calculateGridPosition(pos.x, zoom.value);
  const gridY = calculateGridPosition(pos.y, zoom.value);
  drawSquareOnCanvas(canvasHoverCtx, gridX, gridY, zoom.value, colorToDraw);
  if (mouseDown.value) {
    drawSquareOnCanvas(canvasImageCtx, gridX, gridY, zoom.value, colorToDraw);
  }
}

onMounted(() => {
  canvasHoverCtx = (canvasHoverRef as any)._value.getContext('2d');
  canvasGridCtx = (canvasGridRef as any)._value.getContext('2d');
  canvasImageCtx = (canvasImageRef as any)._value.getContext('2d');
  drawGrid(canvasGridCtx, canvasWidth.value, canvasHeight.value, 'pink', zoom.value);
})
</script>

<template>
<div class="rkn-canvas-wrapper">
  {{ mouseDown }}
  <canvas 
    id="rkn-canvas-helper__grid" 
    ref="canvasGridRef" 
    class="rkn-drawing-canvas rkn-drawing-canvas--z-index-4"
    :width="canvasWidth"
    :height="canvasHeight"
    @mousemove="highlightCurrentDrawingCell"
    @mousedown="mouseDown = true"
    @mouseup="mouseDown = false"
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
