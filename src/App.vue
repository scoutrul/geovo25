<template>
  <router-view />
</template>

<script setup>
import { watch, onMounted } from "vue";
import { useContentStore, useLanguageStore } from "@/stores";

const contentStore = useContentStore();
const languageStore = useLanguageStore();

// Функция для обновления title документа
const updateDocumentTitle = () => {
  document.title = contentStore.meta.title || "";
};

// Устанавливаем title при монтировании
onMounted(() => {
  updateDocumentTitle();
});

// Обновляем title при смене языка
watch(
  () => languageStore.currentLanguage,
  () => {
    updateDocumentTitle();
  }
);
</script>
