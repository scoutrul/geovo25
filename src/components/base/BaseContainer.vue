<template>
  <component :is="as" :class="containerClasses">
    <slot />
  </component>
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
  verticalPadding: {
    type: [Boolean, String],
    default: false,
    validator: (value) => {
      if (typeof value === 'boolean') return true
      return ['sm', 'md', 'lg', 'xl'].includes(value)
    }
  },
  bg: {
    type: String,
    default: '',
    validator: (value) => {
      // Разрешаем пустую строку или любой Tailwind bg-* класс
      if (value === '') return true
      return value.startsWith('bg-')
    }
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
  
  // Горизонтальный padding
  const paddingClasses = props.padding ? 'px-4 sm:px-6 lg:px-8' : ''
  
  // Вертикальный padding (адаптивный)
  let verticalPaddingClasses = ''
  if (props.verticalPadding === true || props.verticalPadding === 'lg') {
    // Большие отступы (для основных секций)
    verticalPaddingClasses = 'py-16 lg:py-32 xl:py-40'
  } else if (props.verticalPadding === 'md') {
    // Средние отступы
    verticalPaddingClasses = 'py-12 lg:py-24 xl:py-32'
  } else if (props.verticalPadding === 'sm') {
    // Маленькие отступы
    verticalPaddingClasses = 'py-8 lg:py-16 xl:py-20'
  } else if (props.verticalPadding === 'xl') {
    // Очень большие отступы
    verticalPaddingClasses = 'py-20 lg:py-40 xl:py-48'
  }
  
  // Фон
  const bgClasses = props.bg || ''
  
  return [
    baseClasses,
    maxWidthClasses[props.maxWidth],
    paddingClasses,
    verticalPaddingClasses,
    bgClasses
  ].filter(Boolean).join(' ')
})
</script>

