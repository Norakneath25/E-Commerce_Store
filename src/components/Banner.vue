<template>
  <section class=" overflow-hidden">
    <div
      class="px-6 py-16 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-14"
    >
      <!-- LEFT CONTENT -->
      <div class="flex-1 text-center lg:text-left">
        <span
          class="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 font-medium text-sm"
        >
          New Collection 2026
        </span>

        <h1
          class="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900"
        >
          Discover Modern
          <span class="text-indigo-600">Fashion</span>
          & Electronics
        </h1>

        <p
          class="mt-6 text-slate-600 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
        >
          Shop trending products with the FakeStore API. Explore electronics,
          jewelry, fashion, and more with a modern shopping experience.
        </p>

        <!-- BUTTONS -->
        <div
          class="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <button
            @click="goToProducts"
            class="px-7 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      <!-- RIGHT CONTENT -->
      <div class="flex-1 relative">
        <!-- MAIN PRODUCT CARD -->
        <div
          class="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 min-h-[450px] flex items-center justify-center"
        >
          <!-- loading -->
          <div v-if="productStore.isLoading">Loading...</div>

          <!-- error -->
          <div v-else-if="productStore.error" class="text-red-500">
            {{ productStore.error }}
          </div>

          <!-- image -->
          <img
            v-else-if="productStore.singleProduct"
            :src="productStore.singleProduct.image"
            :alt="productStore.singleProduct.title"
            class="h-[350px] w-full object-contain hover:scale-105 transition duration-500"
          />
        </div>

        <!-- DISCOUNT BADGE -->
        <!-- <div
          class="absolute top-6 right-6 bg-indigo-600 text-white px-5 py-2 rounded-2xl font-bold shadow-lg"
        >
          50% OFF
        </div> -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useProductStore } from "../stores/productStore";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const router = useRouter();

let intervalId;

const fetchRandomProduct = async () => {
  // fetch all products once
  if (productStore.products.length === 0) {
    await productStore.fetchAllProducts();
  }

  // get dynamic max length
  const max = productStore.products.length;

  // random index
  const randomIndex = Math.floor(Math.random() * max);

  // get random product
  const randomProduct = productStore.products[randomIndex];

  // set as current product
  productStore.singleProduct = randomProduct;
};

const goToProducts = () => {
  router.push("/products");
};

onMounted(() => {
  fetchRandomProduct();

  intervalId = setInterval(() => {
    fetchRandomProduct();
  }, 3000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
