<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { drawGrid, clearCanvas, getCanvasImage, loadImageToCanvas, loadAndResizeImageToCanvas, cloneCanvasElement } from '@/helpers/canvas';

const store = useStore();

const localCanvasWidth = ref(store.state.canvasWidth);
const localCanvasHeight = ref(store.state.canvasHeight);
const localFps = ref(store.state.fps);
const localZoom = ref(store.state.zoom/10);

const saveSettings = async () => {
  // check if save is needed to avoid unnecessary store action dispatches & canvas redrawing
  if (localCanvasWidth.value !== store.state.canvasWidth || localCanvasHeight.value !== store.state.canvasHeight || localZoom.value !== store.state.zoom) {
    let canvasWidth = store.state.canvasWidth * store.state.zoom;
    let canvasHeight = store.state.canvasHeight * store.state.zoom;
    const previousZoom = Number(store.state.zoom);
  
    const cw = canvasWidth;
    const ch = canvasHeight;
  
    // save current canvas contents
    const imgData = await getCanvasImage(store.state.canvasImageCtx, cw, ch);
    const canvasClone =  await cloneCanvasElement(store.state.canvasImageCtx.canvas);
    // populate new project settings
    store.dispatch('updateProp', { name: 'canvasWidth', value: localCanvasWidth.value });
    store.dispatch('updateProp', { name: 'canvasHeight', value: localCanvasHeight.value });
    store.dispatch('updateProp', { name: 'zoom', value: localZoom.value * 10 });
  
    // update canvas size
    canvasWidth = store.state.canvasWidth * store.state.zoom;
    canvasHeight = store.state.canvasHeight * store.state.zoom;
  
    // restore canvas contents
    if (previousZoom !== store.state.zoom) {
      // make sure canvas is clear
      await clearCanvas(store.state.canvasImageCtx, canvasWidth, canvasHeight);
      await loadAndResizeImageToCanvas(canvasClone, store.state.canvasImageCtx, localCanvasWidth.value, localCanvasHeight.value, previousZoom, store.state.zoom);
        // redraw grid canvas
      await clearCanvas(store.state.canvasGridCtx, canvasWidth, canvasHeight);
      await drawGrid(store.state.canvasGridCtx, canvasWidth, canvasHeight, 'pink', store.state.zoom);
    } else {
      // make sure canvas is clear
      await clearCanvas(store.state.canvasImageCtx, canvasWidth, canvasHeight);
      await loadImageToCanvas(store.state.canvasImageCtx, imgData, localCanvasWidth.value * store.state.zoom, localCanvasHeight.value * store.state.zoom);
      // redraw grid canvas
      await clearCanvas(store.state.canvasGridCtx, canvasWidth, canvasHeight);
      await drawGrid(store.state.canvasGridCtx, canvasWidth, canvasHeight, 'pink', store.state.zoom); 
      // resize and draw on thumbnail 
      await loadAndResizeImageToCanvas(canvasClone, store.state.canvasThumbnailCtx, localCanvasWidth.value, localCanvasHeight.value, previousZoom, 2);
    }
  }
  // check if save is needed to avoid unnecessary store action dispatches
  if (localFps.value !== store.state.fps) {
    store.dispatch('updateProp', { name: 'fps', value: localFps.value });
  }

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
  <div class="rkn-field">
    <label class="rkn-input-label" for="fps">Zoom: ({{ localZoom }})</label>
    <input 
      name="color-picker-alpha" 
      v-model="localZoom"
      type="range"
      min="1"
      max="10" 
    />
  </div>
  <button 
    class="rkn-button"
    @click="saveSettings"
  >Apply</button>
</div>
</template>

<style scoped lang="scss">
@import './../styles/style.scss';
</style>
