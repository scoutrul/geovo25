<template>
  <div :class="wrapperClasses">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="relative w-full overflow-hidden rounded-[20px] bg-black-90/80"
    >
      <div :class="aspectClass" />

      <img
        v-if="item?.src"
        :src="item.src"
        :alt="item?.alt || `gallery-image-${index}`"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div :class="['pointer-events-none absolute inset-0', gradientClass]" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBreakpoints } from '../../composables/useBreakpoints.js'

const { ltMd, ltLg } = useBreakpoints()

const props = defineProps({
  items: {
    type: Array,
    default: () => [{}, {}, {}]
  }
})

const variant = computed(() => {
  if (ltMd.value) return 'mobile'
  if (ltLg.value) return 'tablet'
  return 'desktop'
})

const wrapperClasses = computed(() => {
  const base = 'flex w-full flex-col'
  const gaps = variant.value === 'mobile' ? 'gap-6' : 'gap-8'
  return `${base} ${gaps}`
})

const aspectClass = computed(() => {
  switch (variant.value) {
    case 'mobile':
      return 'aspect-[3/4]'
    case 'tablet':
      return 'aspect-[16/9]'
    default:
      return 'aspect-[16/9]'
  }
})

const gradientClass = computed(() => {
  switch (variant.value) {
    case 'mobile':
      return 'bg-gradient-to-b from-transparent via-black-90/20 to-black-90'
    case 'tablet':
      return 'bg-gradient-to-r from-transparent via-black-90/50 to-black-90'
    default:
      return 'bg-gradient-to-r from-transparent via-black-90/60 to-black-90'
  }
})
</script>


