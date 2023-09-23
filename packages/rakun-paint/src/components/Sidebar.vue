<script setup lang="ts">
import SidebarSection from './SidebarSection.vue';
import ColorPicker from './ColorPicker.vue';
import ColorPalette from './ColorPalette.vue';
</script>

<template>
<div class="rkn-sidebar">
  <sidebar-section heading="Overview">
    <canvas />
  </sidebar-section>
  <sidebar-section heading="Colors">
    <color-picker />
    <color-palette />
  </sidebar-section>
</div>
</template>

<style scoped lang="scss">
</style>
