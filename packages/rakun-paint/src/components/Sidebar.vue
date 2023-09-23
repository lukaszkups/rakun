<script setup lang="ts">
import SidebarSection from './SidebarSection.vue';
import ColorPicker from './ColorPicker.vue';
</script>

<template>
<div class="rkn-sidebar">
  <sidebar-section heading="Overview">
    <canvas />
  </sidebar-section>
  <sidebar-section heading="Colors">
    <color-picker />
  </sidebar-section>
</div>
</template>

<style scoped lang="scss">
</style>
