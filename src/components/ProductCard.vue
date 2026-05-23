<script setup>
import { useCartStore } from "../stores/cartStore";

defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const cartStore = useCartStore();
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
  >
    <div class="bg-gray-100 p-6">
      <router-link :to="`/products/${product.id}`">
        <img
          class="w-full h-56 object-contain transition-transform duration-300"
          :src="product.image"
          :alt="product.title"
        />
      </router-link>
    </div>
    <div class="p-4 space-y-3">
      <span class="text-xs font-bold uppercase tracking-wide">{{
        product.category
      }}</span>
      <h2 class="font-semibold text-gray-800 line-clamp-2 min-h-12">
        {{ product.title }}
      </h2>
      <div class="flex items-center gap-2">
        <span class="text-yellow-500">★</span>
        <span class="text-sm text-gray-600">{{ product.rating.rate }}</span>
        <span class="text-sm text-gray-400">({{ product.rating.count }})</span>
      </div>
      <div class="flex items-center justify-between pt-2">
        <p class="text-2xl font-bold text-gray-900">${{ product.price }}</p>
        <button
          class="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
          @click="cartStore.addItem(product)"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>
