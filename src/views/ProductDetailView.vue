<template>
  <div class="min-h-screen bg-gray-100 py-10">

    <!-- toast notification -->
    <div
      v-if="cartStore.showMessage"
      class="fixed top-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-lg z-50"
    >
      ✓ {{ cartStore.message }}
    </div>

    <div class="container mx-auto px-4">

      <!-- back button -->
      <router-link
        to="/products"
        class="inline-flex items-center gap-2 text-gray-500 hover:text-black transition mb-6 group"
      >
        <span class="group-hover:-translate-x-1 transition-transform duration-200">←</span>
        Back to Products
      </router-link>

      <div v-if="productStore.singleProduct">
        <div class="bg-white rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

          <!-- left — image -->
          <div class="flex items-center justify-center bg-gray-50 p-12 min-h-[500px]">
            <img
              :src="productStore.singleProduct.image"
              :alt="productStore.singleProduct.title"
              class="h-[380px] object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- right — details -->
          <div class="flex flex-col justify-between p-10">
            <div>
              <!-- category -->
              <span class="inline-block px-4 py-1 text-sm font-medium bg-black text-white rounded-full mb-6 capitalize">
                {{ productStore.singleProduct.category }}
              </span>

              <!-- title -->
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {{ productStore.singleProduct.title }}
              </h1>

              <!-- rating -->
              <div class="flex items-center gap-3 mb-6">
                <div class="text-yellow-400 text-xl">
                  {{ '★'.repeat(Math.round(productStore.singleProduct.rating.rate)) }}
                  {{ '☆'.repeat(5 - Math.round(productStore.singleProduct.rating.rate)) }}
                </div>
                <p class="text-gray-500 text-sm">
                  {{ productStore.singleProduct.rating.rate }} · {{ productStore.singleProduct.rating.count }} reviews
                </p>
              </div>

              <!-- price -->
              <p class="text-5xl font-bold text-black mb-6">
                ${{ productStore.singleProduct.price }}
              </p>

              <!-- divider -->
              <div class="border-t border-gray-100 mb-6"></div>

              <!-- description -->
              <p class="text-gray-500 leading-relaxed mb-8">
                {{ productStore.singleProduct.description }}
              </p>
            </div>

            <!-- bottom — quantity + button -->
            <div>
              <!-- quantity -->
              <div class="flex items-center gap-4 mb-6">
                <span class="text-gray-600 font-medium">Quantity</span>
                <div class="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    @click="quantity > 1 ? quantity-- : null"
                    class="px-4 py-2 text-lg hover:bg-gray-100 transition"
                  >−</button>
                  <span class="px-6 py-2 font-semibold border-x-2 border-gray-200">{{ quantity }}</span>
                  <button
                    @click="quantity++"
                    class="px-4 py-2 text-lg hover:bg-gray-100 transition"
                  >+</button>
                </div>
              </div>

              <!-- add to cart button -->
              <button
                @click="cartStore.addItem(productStore.singleProduct)"
                class="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] shadow-md"
              >
                Add to Cart
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- loading -->
      <div v-if="productStore.isLoading" class="flex justify-center mt-20">
        <div class="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useProductStore } from "../stores/productStore"
import { useCartStore } from "../stores/cartStore"
import { useRoute } from "vue-router"

const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()
const quantity = ref(1)

onMounted(() => {
  productStore.fetchProductById(route.params.id)
})
</script>