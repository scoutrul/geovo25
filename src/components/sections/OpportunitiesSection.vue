<template>
  <BaseContainer :as="'section'" :bg="'bg-white-90'">
    <!-- Заголовок и подзаголовок -->
    <div class="flex flex-col gap-4 mb-16 xl:mb-24">
      <BaseHeading
        :level="gtLg ? 3 : 4"
        :as="gtLg? 'h2' : 'h3'"
        class="w-full text-black-90"
      >
        {{ title }}
      </BaseHeading>

      <BaseText :as="'p'" size="p1" class="text-black-50 w-full">
        {{ subtitle }}
      </BaseText>
    </div>

    <!-- Центральная часть: Flowchart -->
    <div
      :class="[
        'relative mb-16 xl:mb-24',
        flowHeightClass,
        'w-full',
      ]"
    >
      <!-- Logo в центре (только на desktop) -->
      <div
        v-if="gtLg"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px]"
      >
        <!-- Blur эффекты -->
        <div
          class="absolute left-[69px] top-[70px] w-[149px] h-[149px] bg-primary rounded-full blur-[60px]"
        />
        <div
          class="absolute left-[-75px] top-[-51px] w-[149px] h-[149px] bg-secondary rounded-full blur-[60px]"
        />

        <!-- Логотип -->
        <div
          class="absolute inset-0 bg-primary rounded-[32px] flex items-center justify-center"
        >
          <svg
            width="102"
            height="101"
            viewBox="0 0 102 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.8413 50.1182H39.4572L50.726 61.2892L62.0544 50.1564H102L50.7112 101L0 50.7291L51.1733 0V13.4977L13.6159 50.7291L50.7112 87.5023L78.7562 59.7007H66.0179L50.6964 74.7576L25.8413 50.1182Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <!-- Logo для mobile/tablet -->
      <div v-else class="relative w-[160px] h-[160px] mb-16">
        <!-- Blur эффекты -->
        <div
          class="absolute left-[69px] top-[70px] w-[149px] h-[149px] bg-primary rounded-full blur-[60px]"
        />
        <div
          class="absolute left-[-75px] top-[-51px] w-[149px] h-[149px] bg-secondary rounded-full blur-[60px]"
        />

        <!-- Логотип -->
        <div
          class="absolute inset-0 bg-primary rounded-[32px] flex items-center justify-center"
        >
          <svg
            width="102"
            height="101"
            viewBox="0 0 102 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.8413 50.1182H39.4572L50.726 61.2892L62.0544 50.1564H102L50.7112 101L0 50.7291L51.1733 0V13.4977L13.6159 50.7291L50.7112 87.5023L78.7562 59.7007H66.0179L50.6964 74.7576L25.8413 50.1182Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <!-- Карточки -->
       <div>
            <!-- Desktop: абсолютное позиционирование -->
            <template v-if="gtLg">
                <OpportunityCard
                  v-for="(opportunity, index) in opportunities"
                  :key="index"
                  class="absolute w-[320px] top-1/2 left-1/2"
                  :style="getCenteredTransform(index)"
                  :category="opportunity.category"
                  :description="opportunity.description"
                />
            </template>
            
            <!-- Mobile/Tablet: horizontal scroll -->
            <template v-else>
                <div class="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                    <OpportunityCard
                    v-for="(opportunity, index) in opportunities"
                    :key="index"
                    class="w-[260px] flex-shrink-0"
                    :category="opportunity.category"
                    :description="opportunity.description"
                    />
                </div>
            </template>
        </div>
    </div>

    <!-- Footer -->
    <div class="flex flex-col gap-8 pt-16 xl:pt-32 border-t border-black-90/5 max-w-[944px] lg:max-w-[780px] m-auto" >
      <!-- Двухколоночный контент -->
      <!-- Figma icon -->
      <svg
      width="54"
      height="80"
      viewBox="0 0 54 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
          d="M13.3334 80.0009C20.6935 80.0009 26.6669 74.0275 26.6669 66.6675V53.334H13.3334C5.97338 53.334 0 59.3074 0 66.6675C0 74.0275 5.97338 80.0009 13.3334 80.0009Z"
          fill="#161616"
      />
      <path
          d="M0 40.0014C0 32.6414 5.97338 26.668 13.3334 26.668H26.6669V53.3349H13.3334C5.97338 53.3349 0 47.3615 0 40.0014Z"
          fill="#161616"
      />
      <path
          d="M0 13.3335C0 5.97339 5.97338 0 13.3334 0H26.6669V26.6669H13.3334C5.97338 26.6669 0 20.6935 0 13.3335Z"
          fill="#161616"
      />
      <path
          d="M26.666 0H39.9995C47.3595 0 53.3329 5.97339 53.3329 13.3335C53.3329 20.6935 47.3595 26.6669 39.9995 26.6669H26.666V0Z"
          fill="#161616"
      />
      <path
          d="M53.3329 40.0014C53.3329 47.3615 47.3595 53.3349 39.9995 53.3349C32.6394 53.3349 26.666 47.3615 26.666 40.0014C26.666 32.6414 32.6394 26.668 39.9995 26.668C47.3595 26.668 53.3329 32.6414 53.3329 40.0014Z"
          fill="#161616"
      />
      </svg>
      <div :class="['flex gap-8']">
        <!-- Колонка 1: Figma icon + текст -->
        <div class="flex-1 flex flex-col gap-8">

          <BaseText
            :as="'p'"
            size="p1"
            class="text-black-90 whitespace-pre-wrap"
          >
            {{ footerText1 }}
          </BaseText>
        </div>

        <!-- Колонка 2: текст -->
        <div class="flex-1">
          <BaseText :as="'p'" size="p1" class="text-black-90">
            {{ footerText2 }}
          </BaseText>
        </div>
      </div>

      <!-- Кнопка -->
      <div>
        <BaseButton variant="secondary" size="md" @click="$emit('figma-click')">
          {{ buttonText }}
        </BaseButton>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseHeading, BaseText, BaseButton } from "../base";
import OpportunityCard from "../ui/OpportunityCard.vue";
import { useBreakpoints } from "../../composables/useBreakpoints.js";
import { computed } from "vue";

const { gtLg, gtXl } = useBreakpoints();

defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  opportunities: {
    type: Array,
    required: true,
    validator: (opportunities) => {
      return opportunities.every(
        (opp) =>
          typeof opp.category === "string" &&
          typeof opp.description === "string"
      );
    },
  },
  footerText1: {
    type: String,
    default: "",
  },
  footerText2: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "",
  },
});

defineEmits(["figma-click"]);

// Высота центрального блока по брейкпоинтам
const flowHeightClass = computed(() => {
  if (gtLg.value) {
    // LG (1024) макет: 758px, XL (1280+) макет: 782px
    return gtXl.value ? "h-[782px]" : "h-[758px]";
  }
  return "py-16";
});

// Смещения от центра (dx, dy) в пикселях, соответствующие макету

const xlOffsets = [
  { dx: -507, dy: -321 }, 
  { dx: -645, dy: -42 },  
  { dx: 82,   dy: -391 }, 
  { dx: 287,  dy: -145 }, 
  { dx: 82,   dy: 141 },  
  { dx: -188, dy: 237 },  
];

const lgOffsets = [
  { dx: -472, dy: -309 }, 
  { dx: -472, dy: -81 },  
  { dx: -25,  dy: -379 }, 
  { dx: 152,  dy: -133 }, 
  { dx: 76,   dy: 104 },  
  { dx: -324, dy: 225 },  
];

// Стиль transform с calc от центра
const getCenteredTransform = (index) => {
  const { dx, dy } = (gtXl.value ? xlOffsets : lgOffsets)[index] || { dx: 0, dy: 0 };
  return {
    transform: `translateX(calc(-50% + ${dx+200}px)) translateY(calc(-50% + ${dy+100}px))`,
  };
};
</script>
