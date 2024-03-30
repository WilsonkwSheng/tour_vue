import { createRouter, createWebHistory } from "vue-router";
import SignUp from "./components/SignUp.vue";
import SignIn from "./components/SignIn.vue";

import TourList from "./components/TourList.vue";

const routes = [
  {
    path: "/",
    component: SignUp,
  },
  {
    path: "/sign_in",
    component: SignIn,
  },
  {
    path: "/tour_lists",
    component: TourList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
