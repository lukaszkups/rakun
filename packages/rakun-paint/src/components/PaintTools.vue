<script setup lang="ts">
import { useStore } from 'vuex';
import { Tools } from '@/helpers/enums';

const store = useStore();

const computedClass = (toolName: string) => {
  return [
    'rkn-button', 
    {'rkn-button--active': toolName === store.state.selectedTool},
  ];
}

const selectTool = (toolName: string) => {
  store.dispatch('updateProp', { name: 'selectedTool', value: toolName });
}
</script>
<template>
  <div>
    <button 
      :class="computedClass(Tools.pencil)"
      @click="selectTool(Tools.pencil)"
    >Pencil</button>
    <button 
      :class="computedClass(Tools.select)"
      @click="selectTool(Tools.select)"
    >Select</button>
    <button 
      :class="computedClass(Tools.line)"
      @click="selectTool(Tools.line)"
    >Line</button>
    <button 
      :class="computedClass(Tools.square)"
      @click="selectTool(Tools.square)"
    >Square</button>
    <button 
      :class="computedClass(Tools.filledSquare)"
      @click="selectTool(Tools.filledSquare)"
    >Filled Square</button>
    <button 
      :class="computedClass(Tools.circle)"
      @click="selectTool(Tools.circle)"
    >Circle</button>
    <button 
      :class="computedClass(Tools.filledCircle)"
      @click="selectTool(Tools.filledCircle)"
    >Filled Circle</button>
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
