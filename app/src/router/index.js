import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Shop from "../views/Shop.vue";
import Details from "../views/Details.vue";
import Cart from "../views/Cart.vue";
import Account from "../views/Account.vue";
import Login from "../views/Login.vue";
import Success from "../views/Success.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Root",
    component: Home,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/shop/:id",
    name: "Item",
    component: Details,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Cart,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/success",
    name: "Success",
    component: Success,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
