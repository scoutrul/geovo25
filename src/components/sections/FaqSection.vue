<template>
  <BaseContainer 
    :as="'section'"
    :padding="true" 
    :vertical-padding="true"
    :max-width="'full'"
    :bg="'bg-white-90'"
  >
    <div class="flex flex-col gap-16 lg:gap-32 items-start w-full max-w-[1048px] mx-auto">
      <!-- Заголовок секции -->
      <BaseHeading 
        :level="3" 
        :as="'h2'"
        class="w-full text-black-90"
      >
        {{ title }}
      </BaseHeading>

      <!-- Список вопросов (аккордион) -->
      <div class="flex flex-col items-start w-full">
        <AccordionItem
          v-for="(item, index) in faqItems"
          :key="index"
          :question="item.question"
          :answer="item.answer"
          :is-open="isOpen(index)"
          :is-last="index === faqItems.length - 1"
          @toggle="toggle(index)"
        />
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseHeading } from '../base'
import AccordionItem from '../ui/AccordionItem.vue'
import { useAccordion } from '@/composables/useAccordion'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  faqItems: {
    type: Array,
    required: true
  }
})

// Инициализируем аккордион с количеством элементов
const { isOpen, toggle } = useAccordion(props.faqItems.length)
</script>

