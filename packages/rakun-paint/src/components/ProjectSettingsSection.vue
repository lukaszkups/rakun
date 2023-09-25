<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const canvasWidth = computed({
  get() {
    return store.state.canvasWidth;
  },
  set(newVal: number) {
    store.dispatch('updateProp', { name: 'canvasWidth', value: newVal });
  }
});

const canvasHeight = computed({
  get() {
    return store.state.canvasHeight;
  },
  set(newVal: number) {
    store.dispatch('updateProp', { name: 'canvasHeight', value: newVal });
  }
});

const fps = computed({
  get() {
    return store.state.fps;
  },
  set(newVal: number) {
    store.dispatch('updateProp', { name: 'fps', value: newVal });
  }
});
</script>
<template>
<div class="rkn-project-settings rkn-form">
  <div class="rkn-field">
    <label class="rkn-input-label" for="canvasWidth">Width:</label>
    <input 
      name="canvasWidth" 
      class="rkn-input"
      type="number" 
      v-model="canvasWidth" 
    />
  </div>
  <div class="rkn-field">
    <label class="rkn-input-label" for="canvasHeight">Height:</label>
    <input 
      name="canvasHeight" 
      class="rkn-input"
      type="number" 
      v-model="canvasHeight" 
    />
  </div>
  <div class="rkn-field">
    <label class="rkn-input-label" for="fps">FPS:</label>
    <input 
      name="fps" 
      class="rkn-input"
      type="number" 
      v-model="fps" 
    />
  </div>
</div>
</template>

<style scoped lang="scss">
@import './../styles/style.scss';
</style>
