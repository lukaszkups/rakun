<script setup lang="ts">
import SidebarSection from './SidebarSection.vue';
import ColorPicker from './ColorPicker.vue';
import ColorPalette from './ColorPalette.vue';
import ProjectSettingsSection from './ProjectSettingsSection.vue';
import PaintTools from './PaintTools.vue';
import CanvasThumbnail from './CanvasThumbnail.vue';
</script>

<template>
<div class="rkn-sidebar">
  <sidebar-section heading="Overview">
    <canvas-thumbnail />
  </sidebar-section>
  <sidebar-section heading="Tools">
    <paint-tools />
  </sidebar-section>
  <sidebar-section heading="Colors">
    <color-picker />
    <color-palette />
  </sidebar-section>
  <sidebar-section heading="Settings">
    <project-settings-section />
  </sidebar-section>
</div>
</template>

<style scoped lang="scss">
@import './../styles/style.scss';

.rkn-sidebar {
  border-left: 1px solid $gray-color;
  height: 100vh;
  padding: 0;
  flex: 1;
  flex-grow: 0;
}
</style>
