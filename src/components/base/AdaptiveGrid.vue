<template>
  <div :class="gridClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
const gridClasses = computed(() => {
  // Базовые классы
  const base = 'w-full flex flex-row overflow-auto pl-4 pr-4 ml-[-16px] mr-[-16px] min-w-[calc(100vw)] gap-6 sm:gap-8'

  // Tablet и Desktop: всегда grid
  const responsiveClasses = [
    `sm:grid sm:flex-col sm:overflow-visible`,
    `sm:grid-cols-2 xl:grid-cols-4`,
    `sm:pl-0 sm:pr-0 sm:ml-0 sm:mr-0 sm:min-w-[auto]`
  ].join(' ')
  
  return [
    base,
    responsiveClasses
  ].join(' ')
})
</script>

