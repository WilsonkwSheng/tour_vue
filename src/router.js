import { createRouter, createWebHistory } from "vue-router";
import SignUp from "./components/SignUp.vue";
import SignIn from "./components/SignIn.vue";

const routes = [
  {
    path: "/",
    component: SignUp,
  },
  {
    path: "/sign_in",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
