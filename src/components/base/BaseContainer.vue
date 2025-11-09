<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  maxWidth: {
    type: String,
    default: 'full',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  padding: {
    type: Boolean,
    default: true
  },
  as: {
    type: String,
    default: 'div'
  }
})

const containerClasses = computed(() => {
  const baseClasses = 'w-full'
  
  // Максимальная ширина
  const maxWidthClasses = {
    sm: 'max-w-screen-sm mx-auto',
    md: 'max-w-screen-md mx-auto',
    lg: 'max-w-screen-lg mx-auto',
    xl: 'max-w-screen-xl mx-auto',
    full: 'w-full'
  }
  
  // Padding
  const paddingClasses = props.padding ? 'px-4 sm:px-6 lg:px-8' : ''
  
  return [
    baseClasses,
    maxWidthClasses[props.maxWidth],
    paddingClasses
  ].filter(Boolean).join(' ')
})
</script>

