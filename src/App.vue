<template>
  <router-view />
</template>

<script setup>
import { watch, onMounted } from "vue";
import { useContentStore, useLanguageStore } from "@/stores";

const contentStore = useContentStore();
const languageStore = useLanguageStore();

// Обновление title и meta description
const updateDocumentMeta = () => {
  document.title = contentStore.meta.title || "";

  const description = (contentStore.meta.description || "").slice(0, 255);
  let metaDescription = document.querySelector('meta[name="description"]');

  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    document.head.appendChild(metaDescription);
  }

  metaDescription.setAttribute("content", description);
};

// Устанавливаем title при монтировании
onMounted(() => {
  updateDocumentMeta();
});

// Обновляем title при смене языка
watch(
  () => languageStore.currentLanguage,
  () => {
    updateDocumentMeta();
  }
);
</script>
