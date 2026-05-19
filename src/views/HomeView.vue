<script setup>
import { onMounted } from "vue"
import { useProductStore } from "../stores/productStore"
import ProductCard from "../components/ProductCard.vue"

const productStore = useProductStore()
onMounted(() => productStore.fetchAllProducts())
</script>

<template>
  <div class="container mx-auto">
    <!-- loading -->
    <div v-if="productStore.isLoading" class="text-center mt-10">Loading...</div>

    <!-- error -->
    <div v-else-if="productStore.error" class="text-center text-red-500 mt-10">
      {{ productStore.error }}
    </div>

    <!-- products -->
    <div v-else class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
        @add-to-cart="(product) => console.log('added:', product.title)"
      />
    </div>
  </div>
</template>