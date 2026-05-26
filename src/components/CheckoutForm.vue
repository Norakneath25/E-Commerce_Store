<template>
  <div class="space-y-6">
    <!-- Checkout Form -->
    <form
      v-if="!showSuccess"
      @submit.prevent="submitForm"
      class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 class="text-2xl font-bold text-slate-900">
        Shipping Information
      </h2>

      <div class="mt-6 grid gap-5">
        <!-- Name -->
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">
            Full Name
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            class="input"
            placeholder="Enter your name"
          >
        </div>

        <!-- Email -->
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            required
            class="input"
            placeholder="Enter your email"
          >
        </div>

        <!-- Phone -->
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">
            Phone Number
          </label>
          <input
            v-model="form.phone"
            type="text"
            required
            class="input"
            placeholder="Enter your phone number"
          >
        </div>

        <!-- Address -->
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">
            Address
          </label>
          <textarea
            v-model="form.address"
            rows="4"
            required
            class="input resize-none"
            placeholder="Enter your address"
          />
        </div>

        <!-- Payment Card -->
        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-slate-200 pb-4">
            <div class="flex items-center gap-3">
              <div class="h-5 w-5 rounded-full border-4 border-black" />
              <span class="font-semibold text-slate-800">
                Credit card
              </span>
            </div>

            <div class="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                class="h-5 object-contain"
              >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                class="h-6 object-contain"
              >
              <span class="rounded-md bg-slate-200 px-2 py-1 text-xs text-slate-600">
                +5
              </span>
            </div>
          </div>

          <!-- Card Number -->
          <div class="mt-5">
            <input
              v-model="form.cardNumber"
              type="text"
              class="input"
              placeholder="Card number"
            >
          </div>

          <!-- Expiry + CVV -->
          <div class="mt-4 grid grid-cols-2 gap-4">
            <input
              v-model="form.expiry"
              type="text"
              class="input"
              placeholder="Expiration date (MM / YY)"
            >

            <input
              v-model="form.cvv"
              type="text"
              class="input"
              placeholder="Security code"
            >
          </div>

          <!-- Card Name -->
          <div class="mt-4">
            <input
              v-model="form.cardName"
              type="text"
              class="input"
              placeholder="Name on card"
            >
          </div>

          <!-- Checkbox -->
          <label class="mt-4 flex items-center gap-3 text-sm text-slate-700">
            <input
              v-model="form.sameAddress"
              type="checkbox"
              class="h-4 w-4 rounded border-slate-300 text-indigo-600"
            >
            Use shipping address as billing address
          </label>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="mt-3 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
        >
          Checkout
        </button>
      </div>
    </form>

    <!-- Success Popup -->
    <div
      v-if="showSuccess"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <div
        class="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl animate-popup"
      >
        <!-- Big Check Icon -->
        <div
          class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-14 w-14 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 class="mt-6 text-3xl font-bold text-slate-900">
          Payment Successful
        </h2>

        <p class="mt-3 text-slate-500">
          Thank you for your purchase!
        </p>

        <button
          @click="showSuccess = false"
          class="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['submit-order'])

const showSuccess = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardName: '',
  sameAddress: true
})

const submitForm = () => {
  emit('submit-order', form)

  // show popup
  showSuccess.value = true
}
</script>

<style scoped>
.input {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgb(226 232 240);
  background: white;
  padding: 0.95rem 1rem;
  font-size: 0.95rem;
  outline: none;
  transition: 0.2s;
}

.input:focus {
  border-color: rgb(99 102 241);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

.animate-popup {
  animation: popup 0.25s ease;
}

@keyframes popup {
  from {
    transform: scale(0.8);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>