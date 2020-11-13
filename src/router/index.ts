import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/Index.vue")
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/Notification.vue"),
    props: {
      code: 404,
      message: "Not Found",
      info: ""
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
