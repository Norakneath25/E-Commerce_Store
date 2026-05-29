<template>
  <div class="container mx-auto">
    <!-- Category Buttons -->
    <div class="flex gap-2 flex-wrap p-4">
      <button
        @click="productStore.fetchAllProducts()"
        class="relative overflow-hidden px-6 py-3 font-semibold group bg-white border-2 border-black rounded-md cursor-pointer"
      >
        <span
          class="absolute inset-0 rounded-full bg-black scale-0 group-hover:scale-150 transition-transform duration-500"
        ></span>
        <span class="relative z-10 text-black group-hover:text-white transition-colors duration-500"
          >All</span
        >
      </button>
      <button
        @click="productStore.fetchProductByCategory('electronics')"
        class="relative overflow-hidden px-6 py-3 font-semibold group bg-white border-2 border-black rounded-md cursor-pointer"
      >
        <span
          class="absolute inset-0 rounded-full bg-black scale-0 group-hover:scale-150 transition-transform duration-500"
        ></span>
        <span class="relative z-10 text-black group-hover:text-white transition-colors duration-500"
          >Electronics</span
        >
      </button>
      <button
        @click="productStore.fetchProductByCategory('jewelery')"
        class="relative overflow-hidden px-6 py-3 font-semibold group bg-white border-2 border-black rounded-md cursor-pointer"
      >
        <span
          class="absolute inset-0 rounded-full bg-black scale-0 group-hover:scale-150 transition-transform duration-500"
        ></span>
        <span class="relative z-10 text-black group-hover:text-white transition-colors duration-500"
          >Jewelery</span
        >
      </button>
      <button
        @click="productStore.fetchProductByCategory(`men's clothing`)"
        class="relative overflow-hidden px-6 py-3 font-semibold group bg-white border-2 border-black rounded-md cursor-pointer"
      >
        <span
          class="absolute inset-0 rounded-full bg-black scale-0 group-hover:scale-150 transition-transform duration-500"
        ></span>
        <span class="relative z-10 text-black group-hover:text-white transition-colors duration-500"
          >Men</span
        >
      </button>
      <button
        @click="productStore.fetchProductByCategory(`women's clothing`)"
        class="relative overflow-hidden px-6 py-3 font-semibold group bg-white border-2 border-black rounded-md cursor-pointer"
      >
        <span
          class="absolute inset-0 rounded-full bg-black scale-0 group-hover:scale-150 transition-transform duration-500"
        ></span>
        <span class="relative z-10 text-black group-hover:text-white transition-colors duration-500"
          >Women</span
        >
      </button>
    </div>

    <!-- Price Sort Buttons -->
    <div class="flex gap-2 flex-wrap px-4 pb-4">
      <button
        @click="priceSort = 'asc'"
        :class="priceSort === 'asc' ? 'bg-black text-white' : 'bg-white text-black'"
        class="relative overflow-hidden px-6 py-3 font-semibold border-2 border-black rounded-md cursor-pointer transition-colors duration-300"
      >
        Price: Low to High
      </button>
      <button
        @click="priceSort = 'desc'"
        :class="priceSort === 'desc' ? 'bg-black text-white' : 'bg-white text-black'"
        class="relative overflow-hidden px-6 py-3 font-semibold border-2 border-black rounded-md cursor-pointer transition-colors duration-300"
      >
        Price: High to Low
      </button>
      <button
        v-if="priceSort"
        @click="priceSort = null"
        class="px-6 py-3 font-semibold border-2 border-gray-300 text-gray-400 rounded-md cursor-pointer hover:border-black hover:text-black transition-colors duration-300"
      >
        Clear
      </button>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Loading -->
      <div
        v-if="productStore.isLoading"
        class="flex justify-center items-center min-h-100"
      >
        <div class="h-16 w-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>

      <!-- Error -->
      <div v-else-if="productStore.error" class="text-center text-red-500 mt-10">
        {{ productStore.error }}
      </div>

      <!-- Products -->
      <template v-else>
        <div
          v-if="sortedProducts.length"
          class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
        >
          <ProductCard
            v-for="product in sortedProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="(product) => cartStore.addItem(product, 1)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/productStore";
import ProductCard from "../components/ProductCard.vue";
import { useCartStore } from "../stores/cartStore";

const productStore = useProductStore();
const cartStore = useCartStore();

const priceSort = ref(null); // 'asc' | 'desc' | null

const sortedProducts = computed(() => {
  const products = [...productStore.products];
  if (priceSort.value === 'asc') return products.sort((a, b) => a.price - b.price);
  if (priceSort.value === 'desc') return products.sort((a, b) => b.price - a.price);
  return products;
});

onMounted(() => productStore.fetchAllProducts());
</script>