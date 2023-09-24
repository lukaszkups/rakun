<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const canvasWidth = computed({
  get() {
    return store.state.canvasWidth;
  },
  set(newVal) {
    store.dispatch('updateProp', { name: 'canvasWidth', value: newVal });
  }
});

const canvasHeight = computed({
  get() {
    return store.state.canvasHeight;
  },
  set(newVal) {
    store.dispatch('updateProp', { name: 'canvasHeight', value: newVal });
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
</div>
</template>

<style scoped lang="scss">
@import './../styles/style.scss';
</style>
