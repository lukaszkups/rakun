<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { propagateClick } from '@/helpers/helpers';

const data = reactive({
  colorHex: '#000000',
  alpha100: 100,
});

const computedColorPickerLabelStyle = computed(() => {
  return `opacity: ${Number(data.alpha100/100)}; background-color: ${data.colorHex};`;
});
</script>

<template>
<div class="rkn-flex">
  <input 
    id="rkn-color-picker-input" 
    class="rkn-color-picker-input" 
    type="color"
    v-model="data.colorHex"
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
  <input type="text" v-model="data.colorHex" />
</div>
<div class="rkn-color-picker__alpha-wrapper">
  <input 
    name="color-picker-alpha" 
    class="rkn-color-picker__alpha" 
    v-model="data.alpha100"
    type="range" 
    min="0" 
    max="100" 
  />
  <label for="color-picker-alpha">{{ data.alpha100 }}</label>
</div>
<button id="rkn-color-picker__save-button" class="rkn-paint__tools-button rkn-paint__tools-button--save-color">Add to palette</button>
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
