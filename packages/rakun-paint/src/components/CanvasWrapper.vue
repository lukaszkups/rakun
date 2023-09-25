<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const zoom = computed(() => store.state.zoom);
const canvasWidth = computed(() => store.state.canvasWidth * zoom.value);
const canvasHeight = computed(() => store.state.canvasHeight * zoom.value);
</script>

<template>
<div class="rkn-canvas-wrapper">
  <canvas 
    id="rkn-canvas-helper__hover" 
    class="rkn-drawing-canvas"
    :width="canvasWidth"
    :height="canvasHeight"
  ></canvas>
  <canvas 
    id="rkn-canvas-helper__current-image" 
    class="rkn-drawing-canvas"
    :width="canvasWidth"
    :height="canvasHeight"
  ></canvas>
  <canvas id="rkn-canvas-helper__whole-image" class="rkn-hidden"></canvas>
</div>
</template>

<style scoped lang="scss">
.rkn-canvas-wrapper {
  flex: 5;
}
</style>
