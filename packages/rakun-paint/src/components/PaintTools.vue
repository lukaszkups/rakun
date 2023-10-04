<script setup lang="ts">
import { useStore } from 'vuex';
// import { Tools } from '@/helpers/enums';
import { ToolsArr } from '@/helpers/data';

const store = useStore();

const computedClass = (toolName: string) => {
  return [
    'rkn-button',
    { 'rkn-button--active': toolName === store.state.selectedTool },
  ];
};

const selectTool = (toolName: string) => {
  store.dispatch('updateProp', { name: 'selectedTool', value: toolName });
};
</script>
<template>
  <div>
    <button
      v-for="tool in ToolsArr"
      :key="tool.id"
      :class="computedClass(tool.id)"
      @click="selectTool(tool.id)"
    >
      {{ tool.label }}
    </button>
  </div>
</template>
<style scoped lang="scss">
@import './../styles/style.scss';

.rkn-button {
  margin: 3px 3px 0 0;

  &--active {
    color: white;
    border-color: $primary-color;
    background-color: $primary-color;
    text-decoration: underline;
  }
}
</style>
