<template>
  <div :class="gridClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isCards: {
    type: Boolean,
    default: false
  }
})

const gridClasses = computed(() => {
  const classes = [
    'w-full flex flex-row',
    'overflow-hidden overflow-x-auto',
    'px-4 -mx-4 sm:px-0 sm:mx-0',
    'gap-6 sm:gap-8'
  ]

  if (props.isCards) {
    classes.push('sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4')
  }

  return classes.join(' ')
})
</script>

