<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { drawGrid, clearCanvas, getCanvasImage, loadImageToCanvas } from '@/helpers/canvas';

const store = useStore();

const localCanvasWidth = ref(store.state.canvasWidth);
const localCanvasHeight = ref(store.state.canvasHeight);
const localFps = ref(store.state.fps);

const saveSettings = async () => {
  let canvasWidth = store.state.canvasWidth * store.state.zoom;
  let canvasHeight = store.state.canvasHeight * store.state.zoom;

  const cw = canvasWidth;
  const ch = canvasHeight;

  // save current canvas contents
  const imgData = await getCanvasImage(store.state.canvasImageCtx, cw, ch);
  // populate new project settings
  store.dispatch('updateProp', { name: 'canvasWidth', value: localCanvasWidth.value });
  store.dispatch('updateProp', { name: 'canvasHeight', value: localCanvasHeight.value });
  store.dispatch('updateProp', { name: 'fps', value: localFps });

  // update canvas size
  canvasWidth = store.state.canvasWidth * store.state.zoom;
  canvasHeight = store.state.canvasHeight * store.state.zoom;

  // restore canvas contents
  await loadImageToCanvas(store.state.canvasImageCtx, imgData);

  // redraw grid
  await clearCanvas(store.state.canvasGridCtx, canvasWidth, canvasHeight);
  await drawGrid(store.state.canvasGridCtx, canvasWidth, canvasHeight, 'pink', store.state.zoom);
}
</script>
<template>
<div class="rkn-project-settings rkn-form">
  <div class="rkn-field">
    <label class="rkn-input-label" for="canvasWidth">Width:</label>
    <input 
      name="canvasWidth" 
      class="rkn-input"
      type="number" 
      v-model="localCanvasWidth" 
    />
  </div>
  <div class="rkn-field">
    <label class="rkn-input-label" for="canvasHeight">Height:</label>
    <input 
      name="canvasHeight" 
      class="rkn-input"
      type="number" 
      v-model="localCanvasHeight" 
    />
  </div>
  <div class="rkn-field">
    <label class="rkn-input-label" for="fps">FPS:</label>
    <input 
      name="fps" 
      class="rkn-input"
      type="number" 
      v-model="localFps" 
    />
  </div>
  <button 
    class="rkn-button"
    @click="saveSettings"
  >Save</button>
</div>
</template>

<style scoped lang="scss">
@import './../styles/style.scss';
</style>
