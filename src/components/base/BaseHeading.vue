<template>
  <component :is="tag" :class="headingClasses">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: {
    type: [Number, String],
    default: 2,
    validator: (value) => [1, 2, 3, 4, 5, 6].includes(Number(value))
  },
  as: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: 'white-90'
  }
})

const tag = computed(() => {
  return props.as || `h${props.level}`
})

const headingClasses = computed(() => {
  const baseClasses = 'font-medium'
  
  // Размеры в зависимости от уровня
  const levelClasses = {
    1: 'text-h4',
    2: 'text-4xl leading-tight',
    3: 'text-3xl leading-snug',
    4: 'text-h4',
    5: 'text-xl leading-normal',
    6: 'text-lg leading-normal'
  }
  
  const colorClass = `text-${props.color}`
  
  return [
    baseClasses,
    levelClasses[Number(props.level)],
    colorClass
  ].join(' ')
})
</script>

