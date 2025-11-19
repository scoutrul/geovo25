import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/HomePage.vue"),
  },
  {
    path: "/cases/:slug",
    name: "CaseDetail",
    component: () => import("../pages/CaseDetailPage.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Возвращаем promise, чтобы скроллить после завершения анимации перехода
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else {
          resolve({ top: 0, behavior: 'instant' });
        }
      }, 300); // Задержка соответствует длительности fade-in анимации
    });
  },
});

export default router;
