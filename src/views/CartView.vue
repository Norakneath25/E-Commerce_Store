<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">
      Shopping Cart
    </h1>

    <div v-if="cartStore.items.length">
      <div class="space-y-4">
        <CartItem
          v-for="item in cartStore.items"
          :key="item.product.id"
          :item="item"
          @remove="cartStore.removeItem"
          @update-qty="cartStore.updateQuantity"
        />
      </div>

      <div class="mt-8 border-t pt-4">
        <h2 class="text-xl font-bold">
          Total Items:
          {{ cartStore.itemCount }}
        </h2>

        <h2 class="text-2xl font-bold mt-2">
          Total:
          ${{ cartStore.totalPrice.toFixed(2) }}
        </h2>

        <button
          @click="goCheckout"
          class="bg-blue-500 text-white px-6 py-3 rounded mt-4"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>

    <div v-else class="flex justify-center items-center flex-col text-2xl">
      <p>Your cart is empty.</p>

      <RouterLink
        to="/products"
        class="text-blue-500"
      >
        Go Shopping
      </RouterLink>
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