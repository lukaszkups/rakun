<script setup lang="ts">
import { computed } from 'vue';
import { propagateClick } from '@/helpers/helpers';
import store from '@/store/store';

const colorHex = computed({
  get() {
    return store.state.selectedColor;
  },
  set(newValue) {
    store.dispatch('updateProp', { name: 'selectedColor', value: newValue });
  }
});

const alpha100 = computed({
  get() {
    return Number(store.state.selectedOpacity);
  },
  set(newValue) {
    store.dispatch('updateProp', { name: 'selectedOpacity', value: newValue });
  }
});

const computedColorPickerLabelStyle = computed(() => {
  return `opacity: ${Number(alpha100.value/100)}; background-color: ${colorHex.value};`;
});

const saveColorToPalette = () => {
  store.dispatch('saveColorToPalette', { hex: colorHex.value, alpha: alpha100.value });
}
</script>
<template>
<div class="rkn-flex">
  <input 
    id="rkn-color-picker-input" 
    class="rkn-color-picker-input" 
    type="color"
    v-model="colorHex"
  />
  <div 
    class="rkn-color-picker-input-label"
    @click="propagateClick('#rkn-color-picker-input')"
  >
    <div 
      class="rkn-square"
      :style="computedColorPickerLabelStyle"
    ></div>
  </div>
  <input type="text" v-model="colorHex" />
</div>
<div class="rkn-color-picker__alpha-wrapper">
  <input 
    name="color-picker-alpha" 
    class="rkn-color-picker__alpha" 
    v-model="alpha100"
    type="range" 
    min="0" 
    max="100" 
  />
  <label for="color-picker-alpha">{{ alpha100 }}</label>
</div>
<button 
  class="rkn-paint__tools-button rkn-paint__tools-button--save-color"
  @click="saveColorToPalette"
>Add to palette</button>
</template>
<style scoped lang="scss">
@import './../styles/style.scss';

.rkn-color-picker-input {
  display: none;

  &-label {
    cursor: pointer;
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid black;
    margin-right: 5px;

    &:hover {
      border-color: grey;
    }

    .rkn-square {
      display: block;
      margin: 1px;
      width: 28px;
      height: 28px;
    }
  }
}

.rkn-color-picker__alpha-wrapper {
  display: flex;
  margin-top: 10px;

  .rkn-color-picker__alpha {
    display: inline-block;
    margin-right: 10px;

    & + label {
      display: inline-block;
      line-height: 20px;
      padding-top: 4px;
    }
  }
}

.rkn-paint__tools-button {
  &--save-color {
    margin-top: 20px;
  }
}
</style>
