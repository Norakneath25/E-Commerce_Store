<template>
  <div class="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
    
    <div class="mx-auto max-w-7xl">

      <!-- Title -->
      <h1 class="mb-8 text-3xl font-bold text-gray-800 md:text-4xl">
        Shopping Cart
      </h1>

      <!-- Cart Items -->
      <div v-if="cartStore.items.length">

        <div class="space-y-5">
          <CartItem
            v-for="item in cartStore.items"
            :key="item.product.id"
            :item="item"
            @remove="cartStore.removeItem"
            @update-qty="cartStore.updateQuantity"
          />
        </div>

        <!-- Summary -->
        <div
          class="mt-10 rounded-2xl bg-white p-6 shadow-md"
        >
          <div
            class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 class="text-lg font-semibold text-gray-700">
                Total Items:
                <span class="font-bold">
                  {{ cartStore.itemCount }}
                </span>
              </h2>

              <h2 class="mt-2 text-3xl font-bold text-gray-900">
                ${{ cartStore.totalPrice.toFixed(2) }}
              </h2>
            </div>

            <button
              @click="goCheckout"
              class="w-full rounded-xl bg-blue-500 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-600 md:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>

      <!-- Empty Cart -->
      <div
        v-else
        class="flex min-h-[60vh] flex-col items-center justify-center text-center"
      >
        <h2 class="text-2xl font-bold text-gray-700">
          Your cart is empty
        </h2>

        <p class="mt-2 text-gray-400">
          Looks like you haven’t added anything yet.
        </p>

        <RouterLink
          to="/products"
          class="mt-6 rounded-xl bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
        >
          Go Shopping
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import CartItem from '@/components/CartItem.vue'

const router = useRouter()
const cartStore = useCartStore()

const goCheckout = () => {
  router.push('/order')
}
</script>