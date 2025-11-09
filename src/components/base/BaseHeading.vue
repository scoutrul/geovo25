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
  }
})

const tag = computed(() => {
  return props.as || `h${props.level}`
})

const headingClasses = computed(() => {
  const baseClasses = 'font-medium'
  
  // Размеры в зависимости от уровня
  const levelClasses = {
    1: 'text-h1',
    2: 'text-h2',
    3: 'text-h3',
    4: 'text-h4',
    5: 'text-h5',
    6: 'text-lg leading-normal'
  }
  
  return [
    baseClasses,
    levelClasses[Number(props.level)]
  ].join(' ')
})
</script>

