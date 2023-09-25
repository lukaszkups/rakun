<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { calculateRealMousePosition, drawSquareOnCanvas, convertHexWithOpacityToRGBA } from '@/helpers/canvas';

const store = useStore();

const zoom = computed(() => store.state.zoom);
const canvasWidth = computed(() => store.state.canvasWidth * zoom.value);
const canvasHeight = computed(() => store.state.canvasHeight * zoom.value);
const selectedColor = computed(() => store.state.selectedColor);
const selectedOpacity = computed(() => store.state.selectedOpacity);

const canvasHoverRef = ref(null);
const canvasImageRef = ref(null);
const canvasWholeImageRef = ref(null);

let canvasHoverCtx: CanvasRenderingContext2D | null = null;

const highlightCurrentDrawingCell = (e: Event) => {
  const pos = calculateRealMousePosition(e, canvasHoverRef._value);
  const colorToDraw = convertHexWithOpacityToRGBA(selectedColor.value, selectedOpacity.value);
  drawSquareOnCanvas(canvasHoverCtx, pos.x, pos.y, zoom.value, colorToDraw);
}

onMounted(() => {
  canvasHoverCtx = canvasHoverRef._value.getContext("2d");
})
</script>

<template>
<div class="rkn-canvas-wrapper">
  <canvas 
    id="rkn-canvas-helper__hover"
    ref="canvasHoverRef"
    class="rkn-drawing-canvas"
    :width="canvasWidth"
    :height="canvasHeight"
    @mousemove="highlightCurrentDrawingCell"
  ></canvas>
  <canvas 
    id="rkn-canvas-helper__current-image" 
    ref="canvasImageRef" 
    class="rkn-drawing-canvas"
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
    margin: 25px;
  }
}
</style>
