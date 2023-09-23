<script setup lang="ts">
import { computed, reactive } from 'vue';

const props = defineProps({
  heading: {
    type: String,
    default: ''
  }
});

const data = reactive({
  collapsed: false,
});

const computedClasses = computed(() => {
  return [
    'rkn-sidebar__section-wrapper',
    {
      'rkn-sidebar__section-wrapper--collapsed': data.collapsed,
    }
  ]
})

const toggleCollapsed = () => {
  data.collapsed = !data.collapsed;
}
</script>

<template>
<div :class="computedClasses">
  <p class="rkn-sidebar__section-heading" @dblclick="toggleCollapsed">{{ props.heading }}</p>
  <div class="rkn-sidebar__section-content">
    <slot></slot>
  </div>
</div>
</template>

<style scoped lang="scss">
@import './../styles/style.scss';

.rkn-sidebar__section {
  &-heading {
    @include unselectable;

    cursor: pointer;
  }
  &-wrapper {
    &--collapsed {
      .rkn-sidebar__section-content {
        height: 0;
        overflow: hidden;
      }
    }
  }
}
</style>
