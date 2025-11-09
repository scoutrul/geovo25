<template>
  <component :is="tag" :class="textClasses">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  as: {
    type: String,
    default: 'p'
  },
  size: {
    type: String,
    default: 'p2',
    validator: (value) => ['p1', 'p2', 'p3', 'body', 'body-sm'].includes(value)
  },
  color: {
    type: String,
    default: 'white-100'
  },
  weight: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'medium', 'semibold', 'bold'].includes(value)
  }
})

const tag = computed(() => props.as)

const textClasses = computed(() => {
  const sizeClasses = {
    'p1': 'text-p1',
    'p2': 'text-p2',
    'p3': 'text-p3',
    'body': 'text-body',
    'body-sm': 'text-body-sm'
  }
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }
  
  const colorClass = `text-${props.color}`
  
  return [
    sizeClasses[props.size],
    weightClasses[props.weight],
    colorClass
  ].join(' ')
})
</script>

