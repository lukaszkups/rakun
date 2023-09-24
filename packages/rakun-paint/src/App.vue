<script setup lang="ts">
import { onBeforeMount } from 'vue';
import Sidebar from './components/Sidebar.vue';
import { useStore } from 'vuex';

const store = useStore();

onBeforeMount(() => {
  store.dispatch('loadSavedState');
})
</script>

<template>
  <div class="rkn-paint__wrapper">
    <canvas-wrapper />
    <sidebar />
  </div>
</template>

<style lang="scss" scoped>
@import './styles/style.scss';

.rkn-paint__wrapper {
  font-family: 'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;

  canvas-wrapper {
    flex: 5;
  }
}
</style>
