<template>
  <form
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
      <!-- Button -->
      <button
        type="submit"
        class="mt-3 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
      >
        Place Order
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit-order'])
const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: ''
})

const submitForm = () => {
  emit('submit-order', form);

}
</script>

<style scoped>
.input {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgb(226 232 240);
  background: white;
  padding: 0.9rem 1rem;
  font-size: 0.95rem;
  outline: none;
  transition: 0.2s;
}
.input:focus {
  border-color: rgb(99 102 241);
}
</style>