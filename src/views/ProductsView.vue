<template>
  <div>
    <div class="flex gap-2 flex-wrap p-4">
      <button
        @click="productStore.fetchAllProducts()"
        class="relative overflow-hidden px-6 py-3 font-semibold group bg-white border-2 border-black rounded-md cursor-pointer"
      >
        <span
          class="absolute inset-0 rounded-full bg-black scale-0 group-hover:scale-150 transition-transform duration-500"
        ></span>
        <span
          class="relative z-10 text-black group-hover:text-white transition-colors duration-500"
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
        <span
          class="relative z-10 text-black group-hover:text-white transition-colors duration-500"
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
        <span
          class="relative z-10 text-black group-hover:text-white transition-colors duration-500"
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
        <span
          class="relative z-10 text-black group-hover:text-white transition-colors duration-500"
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
        <span
          class="relative z-10 text-black group-hover:text-white transition-colors duration-500"
          >Women</span
        >
      </button>
    </div>
    <!-- loading -->
    <div class="p-4">
      <div
        v-if="productStore.isLoading"
        class="flex justify-center items-center min-h-[400px]"
      >
        <div>
          <div
            class="h-16 w-16 border-4 border-dashed rounded-full animate-spin border-blue-500"
          ></div>
        </div>
      </div>

      <!-- error -->
      <div
        v-else-if="productStore.error"
        class="text-center text-red-500 mt-10"
      >
        {{ productStore.error }}
      </div>

      <!-- products -->
      <div
        v-else
        class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
      >
        <ProductCard
          v-for="product in productStore.products"
          :key="product.id"
          :product="product"
          @add-to-cart="(product) => console.log('added:', product.title)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../stores/productStore";
import ProductCard from "../components/ProductCard.vue";

const productStore = useProductStore();
onMounted(() => productStore.fetchAllProducts());
</script>
