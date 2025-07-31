import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TrendingView from "../views/TrendingView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/trending", name: "trending", component: TrendingView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
