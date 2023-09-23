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
  <canvas-wrapper />
  <sidebar />
</template>

<style lang="scss" scoped>
</style>
