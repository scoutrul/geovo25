<template>
  <div :class="['rounded-2xl overflow-hidden flex flex-col h-full', variantClass]">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'transparent'].includes(value)
  }
})

const variantClass = computed(() => {
  return props.variant === 'transparent' ? 'bg-transparent' : 'bg-white-100'
})
</script>

