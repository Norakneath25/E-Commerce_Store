<template>
  <div class="min-h-screen bg-slate-50 px-4 py-10">

    <div class="mx-auto max-w-6xl">

      <!-- TITLE -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-slate-900">
          Checkout
        </h1>

        <p class="mt-2 text-slate-500">
          Complete your order information
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">

        <!-- FORM -->
        <div class="lg:col-span-2">
          <CheckoutForm
            @submit-order="handleOrder"
          />
        </div>

        <!-- SUMMARY -->
        <div
          class="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <h2 class="text-xl font-bold text-slate-900">
            Order Summary
          </h2>

          <!-- ITEMS -->
          <div
            v-if="cartStore.items.length"
            class="mt-6 space-y-4"
          >

            <div
              v-for="item in cartStore.items"
              :key="item.product.id"
              class="flex items-center gap-4"
            >

              <!-- IMAGE -->
              <div
                class="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100"
              >
                <img
                  :src="item.product.image"
                  class="h-12 w-12 object-contain"
                >
              </div>

              <!-- INFO -->
              <div class="flex-1">
                <h3 class="line-clamp-1 text-sm font-semibold text-slate-800">
                  {{ item.product.title }}
                </h3>

                <p class="mt-1 text-sm text-slate-500">
                  Qty: {{ item.quantity }}
                </p>
              </div>

              <!-- PRICE -->
              <p class="font-bold text-slate-900">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </p>

            </div>

          </div>

          <!-- EMPTY -->
          <div
            v-else
            class="mt-6 rounded-2xl bg-slate-100 p-4 text-center text-sm text-slate-500"
          >
            No products in cart
          </div>

          <!-- TOTAL -->
          <div class="mt-6 border-t border-slate-200 pt-6">

            <div class="flex items-center justify-between">

              <h3 class="text-lg font-semibold text-slate-700">
                Total
              </h3>

              <p class="text-2xl font-bold text-indigo-600">
                ${{ cartStore.totalPrice.toFixed(2) }}
              </p>

            </div>

          </div>

        </div>

      </div>

      <!-- MY ORDERS -->
      <div
        v-if="orders.length"
        class="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        <!-- HEADER -->
        <div class="flex items-center justify-between">

          <h2 class="text-2xl font-bold text-slate-900">
            My Orders
          </h2>

          <span
            class="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600"
          >
            {{ orders.length }} Orders
          </span>

        </div>

        <!-- ORDER LIST -->
        <div class="mt-6 space-y-5">

          <!-- ORDER CARD -->
          <div
            v-for="order in orders"
            :key="order.id"
            class="rounded-3xl border border-slate-200 bg-slate-50 p-5"
          >

            <div
              class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
            >

              <!-- LEFT -->
              <div class="space-y-2">

                <h3 class="text-lg font-bold text-slate-800">
                  👤 {{ order.customer?.name || 'Unknown Customer' }}
                </h3>

                <p class="text-sm text-slate-500">
                  📧 {{ order.customer?.email || 'No Email' }}
                </p>

                <p class="text-sm text-slate-500">
                  📍 {{ order.customer?.address || 'No Address' }}
                </p>

              </div>

              <!-- RIGHT -->
              <div class="flex flex-col items-start gap-3 lg:items-end">

                <p class="text-2xl font-bold text-indigo-600">
                  ${{ order.total.toFixed(2) }}
                </p>

                <span
                  :class="[
                    'inline-flex rounded-full px-4 py-2 text-sm font-semibold',
                    order.delivered
                      ? 'bg-green-100 text-green-600'
                      : 'bg-orange-100 text-orange-600'
                  ]"
                >
                  {{
                    order.delivered
                      ? 'Delivered'
                      : 'On Delivery'
                  }}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- POPUP MODAL -->
    <transition name="modal">

      <div
        v-if="showModal"
        class="fixed left-1/2 top-8 z-9999 -translate-x-1/2"
      >

        <div
          :class="[
            'rounded-2xl px-6 py-4 text-sm font-semibold text-white shadow-2xl',
            modalType === 'success'
              ? 'bg-green-500'
              : 'bg-red-500'
          ]"
        >
          {{ modalMessage }}
        </div>

      </div>

    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CheckoutForm from '@/components/CheckoutForm.vue'
import { useCartStore } from '@/stores/cartStore'
import { createOrder } from '@/services/orderService'

const cartStore = useCartStore()

const orders = ref([])

// MODAL
const showModal = ref(false)
const modalMessage = ref('')
const modalType = ref('success')

const openModal = (message, type = 'success') => {

  modalMessage.value = message
  modalType.value = type
  showModal.value = true

  setTimeout(() => {
    showModal.value = false
  }, 3000)
}

// SAVE
const saveOrders = () => {
  localStorage.setItem(
    'orders',
    JSON.stringify(orders.value)
  )
}

// LOAD
const loadOrders = () => {

  const data = localStorage.getItem('orders')

  if (data) {
    orders.value = JSON.parse(data)
  }
}

// ORDER
const handleOrder = async (formData) => {

  // EMPTY CART
  if (!cartStore.items.length) {

    openModal(
      'Your cart is empty!',
      'error'
    )

    return
  }

  try {

    const orderData = {
      id: Date.now(),

      customer: formData,

      items: [...cartStore.items],

      total: cartStore.totalPrice,

      delivered: false
    }

    await createOrder(orderData)

    orders.value.unshift(orderData)

    saveOrders()

    // SUCCESS
    openModal(
      'Order placed successfully!',
      'success'
    )

    cartStore.clearCart()

    // FAKE DELIVERY
    setTimeout(() => {

      const order = orders.value.find(
        item => item.id === orderData.id
      )

      if (order) {
        order.delivered = true
      }

      saveOrders()

    }, 5000)

  } catch (error) {

    console.log(error)

    openModal(
      'Something went wrong!',
      'error'
    )
  }
}

onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>