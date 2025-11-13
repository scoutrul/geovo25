import { reactive } from "vue";

/**
 * Функция для преобразования путей к медиа файлам
 * В Vite для статических ресурсов из src/assets нужно использовать
 * правильный путь. Для путей из JSON используем new URL для правильной обработки.
 * @param {string} path - Путь к медиа файлу
 * @returns {string} - Обработанный путь
 */
function resolveAssetPath(path) {
  if (!path) return path;
  // Если путь уже является URL или начинается с http/https, возвращаем как есть
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  
  // В Vite для путей к ресурсам из src/assets нужно использовать
  // правильный путь. Для путей из JSON используем new URL с базовым путем к src
  // Это создаст правильный URL, который Vite сможет обработать
  try {
    // Убираем начальные ./ если есть
    let cleanPath = path.startsWith("./") ? path.slice(2) : path;
    
    // Получаем базовый URL для src директории
    // import.meta.url указывает на текущий файл (composables/useMediaPaths.js)
    // Нужно подняться на уровень выше к src
    const currentFileUrl = new URL(import.meta.url);
    const srcBaseUrl = new URL("../", currentFileUrl);
    const assetUrl = new URL(cleanPath, srcBaseUrl);
    
    // В dev режиме new URL создает file:// URL, который нужно преобразовать
    // В production Vite обработает пути автоматически
    if (assetUrl.protocol === "file:") {
      // Извлекаем путь из file:// URL и преобразуем в путь для Vite
      let filePath = assetUrl.pathname;
      
      // На Windows пути могут начинаться с /C:/, нужно это учесть
      // Находим позицию /src/ в пути
      const srcIndex = filePath.indexOf("/src/");
      if (srcIndex !== -1) {
        // Возвращаем путь начиная с /src/
        // Vite обработает этот путь правильно в dev режиме
        return filePath.substring(srcIndex);
      }
    }
    
    // Возвращаем href, который будет правильным URL для Vite
    return assetUrl.href;
  } catch (error) {
    // Если не получилось, возвращаем исходный путь
    // Vite может обработать его автоматически в шаблонах
    console.warn("Failed to resolve asset path:", path, error);
    return path;
  }
}

/**
 * Рекурсивно преобразует пути к медиа в объекте данных
 * @param {any} obj - Объект или массив для обработки
 * @returns {any} - Обработанный объект или массив
 */
function processMediaPaths(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => processMediaPaths(item));
  } else if (obj && typeof obj === "object") {
    const processed = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === "src" || key === "icon" || key === "image") {
        processed[key] = resolveAssetPath(value);
      } else {
        processed[key] = processMediaPaths(value);
      }
    }
    return processed;
  }
  return obj;
}

/**
 * Композбл для обработки данных с медиа путями
 * @param {Object} data - Исходные данные
 * @returns {Object} - Реактивный объект с обработанными путями к медиа
 */
export function useMediaPaths(data) {
  const processedData = processMediaPaths(data);
  return reactive(processedData);
}

