<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const localCanvasWidth = ref(store.state.canvasWidth);
const localCanvasHeight = ref(store.state.canvasHeight);
const localFps = ref(store.state.fps);

const saveSettings = () => {
  const canvasWidth = store.state.canvasWidth * store.state.zoom;
  const canvasHeight = store.state.canvasHeight * store.state.zoom;
  // save current canvas contents
  const imgData = store.state.canvasImageCtx.getImageData(0, 0, canvasWidth, canvasHeight);
  
  store.dispatch('updateProp', { name: 'canvasWidth', value: localCanvasWidth });
  store.dispatch('updateProp', { name: 'canvasHeight', value: localCanvasHeight });
  store.dispatch('updateProp', { name: 'fps', value: localFps });

  // restore canvas contents
  store.state.canvasImageCtx.putImageData(imgData, canvasWidth, canvasHeight);
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
