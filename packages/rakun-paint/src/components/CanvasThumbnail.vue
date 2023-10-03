<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const canvasThumbnailRef = ref(null);

const canvasWidth = computed(() => store.state.canvasWidth);
const canvasHeight = computed(() => store.state.canvasHeight);

const canvasThumbnailCtx = computed({
  get() {
    return store.state.canvasThumbnailCtx;
  },
  set(newVal) {
    store.dispatch('updateProp', { name: 'canvasThumbnailCtx', value: newVal });
  },
});

onMounted(() => {
  canvasThumbnailCtx.value = (canvasThumbnailRef as any)._value.getContext(
    '2d',
  );
});
</script>
<template>
  <canvas
    ref="canvasThumbnailRef"
    class="rkn-canvas rkn-canvas-thumbnail"
    :width="canvasWidth * 2"
    :height="canvasHeight * 2"
  />
</template>
<style scoped lang="scss">
.rkn-canvas-thumbnail {
  border: 1px solid gray;
}
</style>
