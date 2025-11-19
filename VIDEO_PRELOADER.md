# Глобальный прелоадер видео

## Описание

Композабл `useVideoPreloader` обеспечивает глобальное управление загрузкой видео перед отображением контента сайта. Показывает черный экран до полной загрузки всех критичных видео.

## Архитектура

### Компоненты системы

1. **`useVideoPreloader.js`** - композабл с глобальным состоянием
2. **`PageLayout.vue`** - отображает черный экран и управляет монтированием контента
3. **`GalleryPlaceholder.vue`** - регистрирует и отслеживает загрузку видео

## Как работает

### 1. Регистрация видео

При монтировании `GalleryPlaceholder` регистрирует все уникальные видео из пропса `items`:

```javascript
onMounted(() => {
  const uniqueVideos = new Set(props.items.map(item => item.src).filter(Boolean));
  uniqueVideos.forEach(videoSrc => {
    registerVideo(videoSrc);
  });
});
```

### 2. Отслеживание загрузки

Каждое видео при событии `loadeddata` уведомляет прелоадер:

```javascript
const handleVideoLoaded = (index) => {
  const videoSrc = duplicatedItems.value[index]?.src;
  if (videoSrc) {
    markVideoLoaded(videoSrc);
  }
};
```

### 3. Проверка готовности

Прелоадер автоматически проверяет, все ли видео загружены:

```javascript
const checkAllVideosLoaded = () => {
  const allLoaded = videosToLoad.value.size > 0 && 
                    videosToLoad.value.size === loadedVideos.value.size;
  
  if (allLoaded) {
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  }
};
```

### 4. Отображение прогресса

`PageLayout.vue` показывает процент загрузки и прогресс бар:

```vue
<template>
  <div class="page-layout bg-black-90 min-h-screen">
    <!-- Прелоадер с процентами -->
    <Transition name="fade">
      <div v-if="isLoading" class="fixed inset-0 bg-black-90 z-50 flex items-center justify-center">
        <div class="flex flex-col items-center gap-4">
          <!-- Процент -->
          <div class="text-white-100 text-4xl font-medium">
            {{ loadingProgress }}%
          </div>
          
          <!-- Прогресс бар -->
          <div class="w-48 h-1 bg-white-20 rounded-full">
            <div class="h-full bg-white-100" :style="{ width: `${loadingProgress}%` }" />
          </div>
          
          <!-- Счетчик -->
          <div class="text-white-50 text-sm">
            {{ loadedVideos.size }} / {{ videosToLoad.size }} видео
          </div>
        </div>
      </div>
    </Transition>
    
    <!-- Контент после загрузки -->
    <Transition name="fade">
      <div v-show="!isLoading" class="page-content">
        <!-- Header, Main, Footer -->
      </div>
    </Transition>
  </div>
</template>
```

## API композабла

### Состояние

- **`isLoading`** (readonly Ref\<boolean\>) - флаг загрузки
- **`videosToLoad`** (readonly Ref\<Set\<string\>\>) - список видео для загрузки
- **`loadedVideos`** (readonly Ref\<Set\<string\>\>) - список загруженных видео
- **`loadingProgress`** (readonly ComputedRef\<number\>) - процент загрузки (0-100)

### Методы

- **`registerVideo(videoSrc: string)`** - регистрирует видео для прелоадинга
- **`markVideoLoaded(videoSrc: string)`** - отмечает видео как загруженное
- **`reset()`** - сбрасывает состояние прелоадера
- **`forceComplete()`** - принудительно завершает загрузку (для отладки)

## Использование в других компонентах

Если нужно добавить прелоадинг для других видео:

```vue
<script setup>
import { useVideoPreloader } from '@/composables/useVideoPreloader.js';

const { registerVideo, markVideoLoaded } = useVideoPreloader();

onMounted(() => {
  // Регистрируем видео
  registerVideo('/path/to/video.mp4');
});

const handleVideoLoaded = () => {
  // Отмечаем как загруженное
  markVideoLoaded('/path/to/video.mp4');
};
</script>

<template>
  <video
    src="/path/to/video.mp4"
    @loadeddata="handleVideoLoaded"
    autoplay
    loop
    muted
  />
</template>
```

## Особенности

### Глобальное состояние

Композабл использует глобальные `ref` для синхронизации между компонентами:

```javascript
// Глобальное состояние
const isLoading = ref(true);
const videosToLoad = ref(new Set());
const loadedVideos = ref(new Set());
```

### Дедупликация видео

При регистрации используется `Set` для автоматической дедупликации одинаковых URL:

```javascript
const uniqueVideos = new Set(props.items.map(item => item.src));
```

### Плавный переход

После загрузки всех видео добавляется небольшая задержка для плавности:

```javascript
setTimeout(() => {
  isLoading.value = false;
}, 300);
```

## Отладка

Для отладки можно принудительно завершить загрузку:

```javascript
import { useVideoPreloader } from '@/composables/useVideoPreloader.js';

const { forceComplete } = useVideoPreloader();

// В консоли браузера или в коде
forceComplete();
```

## Визуальный индикатор загрузки

Прелоадер показывает три элемента:

1. **Процент загрузки** - большая цифра (например: 75%)
2. **Прогресс бар** - визуальная полоса загрузки
3. **Счетчик видео** - текст "3 / 4 видео"

Процент вычисляется автоматически:

```javascript
const loadingProgress = computed(() => {
  const total = videosToLoad.value.size;
  const loaded = loadedVideos.value.size;
  
  if (total === 0) return 0;
  
  return Math.round((loaded / total) * 100);
});
```

## Расширение функционала

### Добавление таймаута

Можно добавить таймаут для принудительного завершения:

```javascript
onMounted(() => {
  // Если через 10 секунд не загрузилось - показываем контент
  setTimeout(() => {
    if (isLoading.value) {
      forceComplete();
    }
  }, 10000);
});
```

## Производительность

- **Оптимизация**: Загружаются только уникальные видео (Set дедупликация)
- **Lazy loading**: Видео не в viewport могут загружаться позже
- **Размер видео**: Используйте оптимизированные видео (сжатие, правильный формат)
- **Mobile**: Отдельные видео для мобильных устройств (`galleryMobile`)

## Связанные файлы

- `/src/composables/useVideoPreloader.js` - основной композабл
- `/src/layouts/PageLayout.vue` - интеграция прелоадера
- `/src/components/ui/GalleryPlaceholder.vue` - регистрация видео
- `/src/data/en/hero.json` - список видео (desktop и mobile)

## Почему прелоадер в PageLayout, а не в App?

Прелоадер размещен в `PageLayout.vue` по следующим причинам:

1. **Контекст**: PageLayout содержит всю структуру страницы (header, main, footer)
2. **Переиспользование**: Если будут страницы без layout, они не будут ждать видео
3. **Логическая изоляция**: Прелоадинг связан с контентом layout, а не с роутингом
4. **Гибкость**: Можно создать другие layout без прелоадера

