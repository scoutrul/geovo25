<template>
  <BaseContainer 
    :as="'section'"
    :bg="'bg-white-90'"
  >
    <!-- Заголовок -->
    <BaseHeading 
      :level="gtLg ? 3 : 4" 
      :as="gtLg ? 'h3' : 'h4'" 
      class="w-full text-black-90 mb-16 xl:mb-24"
      :class="gtXl ? 'text-center' : 'text-left'"
    >
      {{ title }}
    </BaseHeading>

    <!-- Адаптивная сетка карточек -->
    <div :class="gridClasses">
      <WorkCard
        v-for="(item, index) in items"
        :key="index"
        :icon="item.icon"
        :title="item.title"
        :description="item.description"
      />
    </div>
  </BaseContainer>
</template>

<script setup>
import { computed } from 'vue'
import { BaseContainer, BaseHeading } from '../base'
import WorkCard from '../ui/WorkCard.vue'
import { useBreakpoints } from '../../composables/useBreakpoints.js'

const { gtLg, gtXl } = useBreakpoints()

const props = defineProps({
  title: {
    type: String,
    default: 'Как мы будем работать'
  },
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(item => 
        typeof item.title === 'string' && 
        typeof item.description === 'string'
      )
    }
  },
})

const gridClasses = computed(() => {  
  // Базовые классы сетки
  const baseClasses = 'grid w-full gap-x-4 gap-y-16 md:gap-x-6 xl:gap-x-8 '
  
  // Адаптивные колонки
  const columnClasses = [
    `grid-cols-2`,       
    `md:grid-cols-3`,       
    `lg:grid-cols-4`     
  ].join(' ')
  
  return `${baseClasses} ${columnClasses}`
})
</script>

