<template>
  <BaseContainer :as="'section'" :bg="'bg-black-90'">
    <div class="grid gap-10 xl:grid-cols-2 xl:items-start xl:gap-16">
      <!-- Текст и аватары -->
      <div class="flex w-full flex-col gap-8 xl:max-w-[720px]">
        <BaseHeading
          :level="gtXl ? 3 : 5"
          :as="'h1'"
          class="text-white-100"
        >
          <span class="block">{{ title }}</span>
          <span class="block">{{ subtitle }}</span>
        </BaseHeading>

        <div class="flex flex-row gap-4 sm:flex-row">
          <div class="flex items-center justify-start">
            <div
              v-for="(avatar, index) in highlightAvatars"
              :key="index"
              class="relative h-12 w-12 overflow-hidden rounded-full border-4 border-black-90 bg-gradient-to-br from-white-100/10 via-white-100/5 to-transparent -mr-6 last:mr-0"
              :style="{ zIndex: highlightAvatars.length - index }"
            >
              <img
                v-if="avatar?.src"
                :src="avatar.src"
                :alt="avatar?.alt || 'avatar'"
                class="h-full w-full object-cover"
              />
            </div>
          </div>

          <BaseText :as="'p'" size="p2" class="text-black-70 flex items-center">
            {{ highlightText }}
          </BaseText>
        </div>

        <BaseButton variant="primary" size="md" class="w-max" @click="$emit('cta-click')">
          {{ buttonText }}
        </BaseButton>
      </div>

      <!-- Галерея -->
      <div class="flex flex-col gap-8 xl:row-span-2">
        <GalleryPlaceholder :items="galleryItems" />
      </div>

      <!-- Статистика -->
      <div class="relative w-full overflow-hidden">
        <div class="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black-90 to-transparent" />
        <div class="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black-90 to-transparent" />
        <div class="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="flex flex-col gap-4"
          >
            <BaseText :as="'p'" size="h5" class="text-white-100">
              {{ stat.value }}
            </BaseText>
            <BaseText :as="'p'" size="p2" class="text-black-70">
              {{ stat.description }}
            </BaseText>
          </div>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { computed } from 'vue'
import { BaseContainer, BaseHeading, BaseText, BaseButton } from '../base'
import GalleryPlaceholder from '../ui/GalleryPlaceholder.vue'
import { useBreakpoints } from '../../composables/useBreakpoints.js'

const { gtXl } = useBreakpoints()

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  highlightText: {
    type: String,
    default: ''
  },
  highlightAvatars: {
    type: Array,
    default: () => [{}, {}, {}]
  },
  buttonText: {
    type: String,
    default: ''
  },
  stats: {
    type: Array,
    default: () => []
  },
  gallery: {
    type: Array,
    default: () => [{}, {}, {}]
  }
})

const galleryItems = computed(() => (gtXl.value ? props.gallery.slice(0, 3) : props.gallery.slice(0, 1)))

defineEmits(['cta-click'])
</script>


