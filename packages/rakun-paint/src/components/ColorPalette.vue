<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ColorType } from '@helpers/types';

const store = useStore();

const colors = computed(() => store.state.colors);

const getColorSquareStyle = (color: ColorType) => {
  return `background-color: ${color.hex}; opacity: ${(color.alpha/100)}`
}

const selectColor = (color: ColorType) => {
  store.dispatch('updateSelectedColor', color);
  store.dispatch('saveState');
}
</script>

<template>
<ul class="rkn-color-palette__list">
  <li
    v-for="color in colors"
    :key="`rkn-color-palette-item-${color.hex}-${color.alpha}`"
    class="rkn-color-palette__list-item"
    @click="selectColor(color)"
  >
    <div 
      class="rkn-color-palette__list-item-square"
      :style="getColorSquareStyle(color)"
    ></div>
  </li>
</ul>
</template>

<style scoped lang="scss">
.rkn-color-palette__list {
  list-style-type: none;
  margin: 15px 0 0 -1px;
  padding: 0;


  &-item {
    display: inline-block;
    width: 30px; 
    height: 30px;
    border: 1px solid #000;
    margin: 1px;
    
    &:hover {
      cursor: pointer;
      border-color: crimson;
    }

    &-square {
      display: block;
      width: 28px;
      height: 28px;
      margin: 1px;
    }
  }
}
</style>
