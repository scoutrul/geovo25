<template>
  <component :is="as" :class="containerClasses">
    <div class="flex flex-col gap-16 lg:gap-32 items-start w-full max-w-[1048px] mx-auto">
    <slot />
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
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
  const baseClasses = 'w-full px-4 py-16 sm:px-10 sm:py-32 xl:py-40 overflow-hidden'
  
  // Фон
  const bgClasses = props.bg || ''
  
  return [
    baseClasses,
    bgClasses
  ].filter(Boolean).join(' ')
})
</script>

