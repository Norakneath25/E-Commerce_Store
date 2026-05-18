import { createRouter, createWebHistory } from "vue-router";
import CartView from "../views/CartView.vue";
import HomeView from "../views/HomeView.vue";
import OrderView from "../views/OrderView.vue";
import OrderView from "../views/OrderView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import ProductsView from "../views/ProductsView.vue";

const route = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/products",
    component: ProductsView,
  },
  {
    path: "/products/:id",
    component: ProductDetailView,
  },
  {
    path: "/cart",
    component: CartView,
  },
  {
    path: "/order",
    component: OrderView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
