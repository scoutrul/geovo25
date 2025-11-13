<template>
  <BaseContainer :as="'section'" bg="white">
    <!-- Заголовок и подзаголовок -->
    <div class="flex flex-col gap-4 mb-16 xl:mb-24">
      <BaseHeading :level="gtLg ? 3 : 4" :as="gtLg ? 'h2' : 'h3'" class="w-full text-black-90">
        {{ title }}
      </BaseHeading>

      <BaseText :as="'p'" size="p1" class="text-black-50 w-full">
        {{ subtitle }}
      </BaseText>
    </div>

    <!-- Адаптивная сетка карточек -->
    <AdaptiveGrid is-cards>
      <CaseCard v-for="(caseItem, index) in cases" :key="index"
        class="min-w-[260px] sm:min-w-[auto] box-content sm:box-border min-h-[380px] sm:min-h-[420px] flex-1"
        :title="caseItem.title" :description="caseItem.description" :image="caseItem.image" />
    </AdaptiveGrid>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseHeading, BaseText, AdaptiveGrid } from '../base'
import CaseCard from '../ui/CaseCard.vue'
import { useBreakpoints } from '../../composables/useBreakpoints.js'

const { gtLg } = useBreakpoints()

defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  cases: {
    type: Array,
    required: true,
    validator: (cases) => {
      return cases.every(caseItem =>
        typeof caseItem.title === 'string' &&
        typeof caseItem.description === 'string'
      )
    }
  }
})
</script>

