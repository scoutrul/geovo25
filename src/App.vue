<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup>
import { watch, onMounted } from "vue";
import { useContentStore, useLanguageStore } from "@/stores";

const contentStore = useContentStore();
const languageStore = useLanguageStore();

const upsertMetaTag = (attribute, value, content) => {
  if (!value) return;

  let tag = document.querySelector(`meta[${attribute}="${value}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content || "");
};

// Обновление title и meta description
const updateDocumentMeta = () => {
  const {
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
  } = contentStore.meta;

  document.title = title || "";

  const normalizedDescription = (description || "").slice(0, 255);
  const normalizedOgDescription = (ogDescription || description || "").slice(
    0,
    255
  );

  upsertMetaTag("name", "description", normalizedDescription);
  upsertMetaTag("property", "og:title", ogTitle || title || "");
  upsertMetaTag(
    "property",
    "og:description",
    normalizedOgDescription || normalizedDescription
  );
  if (ogImage) {
    upsertMetaTag("property", "og:image", ogImage);
  }
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

<style>
.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: none;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-to {
  opacity: 1;
}
</style>
