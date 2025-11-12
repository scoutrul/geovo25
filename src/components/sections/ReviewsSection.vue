<template>
  <BaseContainer :as="'section'" :bg="'bg-white-90'">
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
      <ReviewCard v-for="(review, index) in reviews" :key="index"
        class="min-w-[260px] sm:min-w-[auto] box-content sm:box-border flex-1"
        :text="review.text" :author="review.author" :image="review.image" />
    </AdaptiveGrid>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseHeading, BaseText, AdaptiveGrid } from '../base'
import ReviewCard from '../ui/ReviewCard.vue'
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
  reviews: {
    type: Array,
    required: true,
    validator: (reviews) => {
      return reviews.every(review =>
        typeof review.text === 'string' &&
        typeof review.author === 'string'
      )
    }
  }
})
</script>

