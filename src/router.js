import { createRouter, createWebHistory } from "vue-router";
import SignUp from "./components/SignUp.vue";
import SignIn from "./components/SignIn.vue";

import CustomerSignUp from "./components/CustomerSignUp.vue";
import CustomerSignIn from "./components/CustomerSignIn.vue";
import CustomerTourList from "./components/CustomerTourList.vue";
import CustomerTourDetails from "./components/CustomerTourDetails.vue";

import TourList from "./components/TourList.vue";
import CreateTour from "./components/CreateTour.vue";
import TourDetails from "./components/TourDetails.vue";

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
  {
    path: "/create_tours",
    component: CreateTour,
  },
  {
    path: "/tours/:id",
    component: TourDetails,
    props: true,
  },
  {
    path: "/customers_sign_up",
    component: CustomerSignUp,
  },
  {
    path: "/customers_sign_in",
    component: CustomerSignIn,
  },
  {
    path: "/customers_tour_lists",
    component: CustomerTourList,
  },
  {
    path: "/customer_tours/:id",
    component: CustomerTourDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
