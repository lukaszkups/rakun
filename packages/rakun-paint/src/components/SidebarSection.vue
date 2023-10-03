<script setup lang="ts">
import { computed, reactive } from 'vue';

const props = defineProps({
  heading: {
    type: String,
    default: '',
  },
});

const data = reactive({
  collapsed: false,
});

const computedClasses = computed(() => {
  return [
    'rkn-sidebar__section-wrapper',
    {
      'rkn-sidebar__section-wrapper--collapsed': data.collapsed,
    },
  ];
});

const toggleCollapsed = () => {
  data.collapsed = !data.collapsed;
};
</script>

<template>
  <div :class="computedClasses">
    <p class="rkn-sidebar__section-heading" @dblclick="toggleCollapsed">
      {{ props.heading }}
    </p>
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
    background: $primary-color;
    color: #fff;
    font-weight: 900;
    text-transform: uppercase;
    padding: 5px 5px 5px 10px;
    margin: 0;
  }

  &-content {
    box-sizing: border-box;
    padding: 5px;
    opacity: 1;
  }

  &-wrapper {
    &--collapsed {
      .rkn-sidebar__section-heading {
        background-color: $secondary-color;
      }

      .rkn-sidebar__section-content {
        height: 0;
        overflow: hidden;
        opacity: 0;
        padding: 0;
      }
    }
  }
}
</style>
