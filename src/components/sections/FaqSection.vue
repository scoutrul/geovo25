<template>
  <BaseContainer 
    :as="'section'"
    :maxWidth="'1052px'"
    :bg="'bg-white-90'"
  >

      <BaseHeading 
        :level="3" 
        :as="'h2'"
        class="w-full text-black-90 mb-16"
      >
        {{ title }}
      </BaseHeading>

      <div class="flex flex-col items-start w-full">
        <AccordionItem
          class="px-0 sm:px-8"
          v-for="(item, index) in faqItems"
          :key="index"
          :question="item.question"
          :answer="item.answer"
          :is-open="isOpen(index)"
          :is-last="index === faqItems.length - 1"
          @toggle="toggle(index)"
        />
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

const { isOpen, toggle } = useAccordion(props.faqItems.length)
</script>

