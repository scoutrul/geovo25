<template>
  <BaseContainer :as="'section'" :bg="'bg-white-90'">
    <!-- Заголовок и подзаголовок -->
    <div class="flex flex-col gap-4 mb-16 xl:mb-24">
      <BaseHeading
        :level="gtLg ? 3 : 4"
        :as="gtLg ? 'h2' : 'h3'"
        class="w-full text-black-90"
      >
        {{ title }}
      </BaseHeading>

      <BaseText :as="'p'" size="p1" class="text-black-50 w-full">
        {{ subtitle }}
      </BaseText>
    </div>

    <!-- Адаптивная сетка карточек -->
    <div
      class="flex w-full sm:grid flex-row sm:flex-col overflow-auto sm:overflow-visible gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 pl-4 pr-4 ml-[-16px] mr-[-16px] min-w-[calc(100vw)] sm:min-w-[auto] sm:pl-0 sm:pr-0 sm:ml-0 sm:mr-0"
    >
      <ExpertiseCard
        class="min-w-[212px] sm:min-w-[auto] box-content sm:box-border min-h-[380px] sm:min-h-[420px]"
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :description="card.description"
        :items="card.items"
      />
    </div>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseHeading, BaseText } from "../base";
import ExpertiseCard from "../ui/ExpertiseCard.vue";
import { useBreakpoints } from "../../composables/useBreakpoints.js";

const { gtLg } = useBreakpoints();

defineProps({
  title: {
    type: String,
    default: "Команда в одном эксперте",
  },
  subtitle: {
    type: String,
    default:
      "Получите не просто дизайнера, а партнера, который заботится о бизнесе и совмещает функции целой команды",
  },
  cards: {
    type: Array,
    required: true,
    validator: (cards) => {
      return cards.every(
        (card) =>
          typeof card.title === "string" && typeof card.description === "string"
      );
    },
  },
});
</script>
