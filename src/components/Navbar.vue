<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

    <!-- Top Promo -->
    <div class="flex h-10 w-full items-center justify-center bg-indigo-600 px-4">
      <h4 class="text-sm font-semibold italic text-white">
        Get Free Shipping on Orders Over $50
      </h4>
    </div>

    <!-- Navbar -->
    <nav class="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3">
        <img
          :src="logoUrl"
          alt="logo"
          class="h-12 w-12 rounded-xl object-cover ring-1 ring-slate-200"
        >

        <div class="flex flex-col leading-tight">
          <h1 class="lg:text-lg font-bold tracking-wide text-slate-900 text-sm">
            E-Commerce
          </h1>

          <p class="mt-0.5 lg:text-xs text-sm font-medium text-slate-500">
            Online Store
          </p>
        </div>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-2 lg:flex">

        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-pill"
          active-class="nav-pill-active"
        >
          {{ item.label }}
        </RouterLink>

      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-2">

        <!-- Search -->
        <button
          class="hidden lg:inline-flex icon-button"
          @click="toggleSearch"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.7"
            stroke="currentColor"
            class="h-5 w-5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <!-- Cart -->
        <RouterLink
          to="/cart"
          class="icon-button relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.7"
            stroke="currentColor"
            class="h-5 w-5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
            />
          </svg>

          <span class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white">
            {{ cartStore.itemCount }}
          </span>
        </RouterLink>

        <!-- Account -->
        <button
          class="hidden lg:inline-flex icon-button"
          @click="toggleAccount"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.7"
            stroke="currentColor"
            class="h-5 w-5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>

      </div>

      <!-- Mobile Menu Button -->
      <button
        class="flex lg:hidden items-center justify-center h-11 w-11 rounded-xl text-slate-700 hover:bg-slate-100"
        @click="toggleMenu"
      >

        <!-- Open -->
        <svg
          v-if="!isMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.7"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <!-- Close -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.7"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>

      </button>

    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="border-t border-slate-200 bg-white px-4 py-4 lg:hidden"
    >

      <div class="flex flex-col gap-2">

        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="mobile-nav-pill"
          active-class="nav-pill-active"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </RouterLink>

        <!-- Mobile Buttons -->
        <div class="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">

          <button
            class="mobile-action"
            @click="toggleSearch"
          >
            Search
          </button>

          <RouterLink
            to="/cart"
            class="mobile-action text-center"
            @click="isMenuOpen = false"
          >
            Cart
          </RouterLink>

          <button
            class="mobile-action"
            @click="toggleAccount"
          >
            Account
          </button>

        </div>

      </div>

    </div>

    <!-- Search Overlay -->
    <div
      v-if="isSearchOpen"
      class="fixed inset-0 z-100 flex min-h-screen w-full justify-center bg-black/10 backdrop-blur-lg"
    >

      <!-- Search Container -->
      <div class="mt-24 w-full max-w-4xl px-4">

        <!-- Search Box -->
        <div
          class="w-full rounded-3xl border border-white/20 bg-white/80 p-4 shadow-2xl backdrop-blur-xl"
        >

          <!-- Search Input -->
          <div class="relative">

            <input
              v-model="search"
              type="text"
              placeholder="Search products..."
              class="w-full rounded-2xl border border-slate-200 bg-white/80 py-3 pl-12 pr-12 text-sm outline-none transition focus:border-indigo-500"
            >

            <!-- Search Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.7"
              stroke="currentColor"
              class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <!-- Close -->
            <button
              @click="toggleSearch"
              class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 transition hover:bg-slate-100"
            >
              ✕
            </button>

          </div>

          <!-- Loading -->
          <div
            v-if="loading"
            class="py-10 text-center text-sm text-slate-500"
          >
            Loading...
          </div>

          <!-- No Result -->
          <div
            v-else-if="filteredProducts.length === 0 && search.length > 0"
            class="py-10 text-center text-sm text-slate-500"
          >
            No products found
          </div>

          <!-- Product Results -->
          <div
            v-else
            class="mt-4 max-h-[70vh] overflow-y-auto pr-2"
          >

            <div
              class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >

              <!-- Product Card -->
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="group rounded-2xl border border-slate-200 bg-white/70 p-4 transition hover:-translate-y-1 hover:shadow-xl"
              >

                <!-- Product Image -->
                <div class="overflow-hidden rounded-2xl bg-slate-100">

                  <img
                    :src="product.image"
                    alt=""
                    class="h-48 w-full object-contain transition duration-300 group-hover:scale-105"
                  >

                </div>

                <!-- Product Info -->
                <div class="mt-4">

                  <h3 class="line-clamp-1 font-semibold text-slate-800">
                    {{ product.title }}
                  </h3>

                  <p class="mt-1 text-sm text-slate-500">
                    {{ product.category }}
                  </p>

                  <div class="mt-3 flex items-center justify-between">

                    <p class="text-lg font-bold text-indigo-600">
                      ${{ product.price }}
                    </p>

                    <button
                      @click="handleAddToCart(product)"
                      class="flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:scale-105 hover:bg-gray-700"
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- Account Dropdown -->
<div
  v-if="isAccountOpen"
  class="fixed right-0 top-0 z-9999 h-screen w-full max-w-md overflow-y-auto bg-white shadow-2xl transition-all"
>

  <!-- Header -->
  <div class="flex items-center justify-between border-b border-slate-200 p-6">

    <div>
      <h2 class="text-2xl font-bold text-slate-900">
        {{ isLoginMode ? 'Login' : 'Register' }}
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        Welcome to E-Commerce Store
      </p>
    </div>

    <!-- Close -->
    <button
      @click="isAccountOpen = false"
      class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 transition hover:bg-slate-200"
    >
      ✕
    </button>

  </div>

  <!-- USER LOGGED -->
  <div
    v-if="authStore.isAuthenticated"
    class="p-6"
  >

    <!-- Profile -->
    <div class="flex flex-col items-center">

      <div
        class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600"
      >
        {{ authStore.user.name.charAt(0).toUpperCase() }}
      </div>

      <h3 class="mt-4 text-xl font-bold text-slate-900">
        {{ authStore.user.name }}
      </h3>

      <p class="mt-1 text-slate-500">
        {{ authStore.user.email }}
      </p>

    </div>

    <!-- Menu -->
    <div class="mt-8 space-y-3">

      <RouterLink
        to="/order"
        @click="isAccountOpen = false"
        class="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        My Orders

        <span class="text-slate-400">
          →
        </span>
      </RouterLink>

      <button
        @click="logout"
        class="flex w-full items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-500 transition hover:bg-red-100"
      >
        Logout

        <span>
          →
        </span>
      </button>

    </div>

  </div>

  <!-- LOGIN / REGISTER -->
  <div
    v-else
    class="p-6"
  >

    <form
      class="space-y-5"
      @submit.prevent="submitAuth"
    >

      <!-- Name -->
      <div v-if="!isLoginMode">

        <label class="mb-2 block text-sm font-semibold text-slate-700">
          Full Name
        </label>

        <input
          v-model="form.name"
          type="text"
          placeholder="Enter your name"
          class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
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
          placeholder="Enter your email"
          class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
        >

      </div>

      <!-- Password -->
      <div>

        <label class="mb-2 block text-sm font-semibold text-slate-700">
          Password
        </label>

        <input
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
        >

      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full rounded-2xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        {{ isLoginMode ? 'Login' : 'Create Account' }}
      </button>

    </form>

    <!-- Switch -->
    <div class="mt-6 text-center">

      <button
        @click="isLoginMode = !isLoginMode"
        class="text-sm font-semibold text-indigo-600"
      >
        {{
          isLoginMode
            ? "Don't have an account? Register"
            : 'Already have an account? Login'
        }}
      </button>

    </div>

  </div>

</div>

    <!-- POPUP -->
    <Teleport to="body">
      <transition name="cart-popup">
        <div
          v-if="cartStore.showMessage"
          class="fixed left-1/2 top-24 z-99999 w-fit max-w-[90%] -translate-x-1/2 rounded-2xl bg-green-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-2xl"
        >
          {{ cartStore.message }}
        </div>
      </transition>
    </Teleport>

  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import logoUrl from '@/assets/images/logoShop.jpg'
import { request } from '@/services/api'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const isSearchOpen = ref(false)
const isAccountOpen = ref(false)
const isMenuOpen = ref(false)
const search = ref('')
const loading = ref(false)
const hasAccount = ref(false)
const products = ref([])

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Cart', to: '/cart' },
  { label: 'Order', to: '/order' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value

  if (isMenuOpen.value) {
    isAccountOpen.value = false
  }
}

const toggleSearch = () => {
  isAccountOpen.value = false
  isMenuOpen.value = false
  isSearchOpen.value = !isSearchOpen.value
}

const toggleAccount = () => {
  if (window.innerWidth < 1024) {
    isMenuOpen.value = false
  }

  isSearchOpen.value = false
  isAccountOpen.value = !isAccountOpen.value
}

const fetchProducts = async () => {
  try {
    loading.value = true

    const data = await request('/products')

    if (data) {
      products.value = data
    }

  } catch (error) {
    console.log(error)

  } finally {
    loading.value = false
  }
}

const handleAddToCart = (product) => {
  cartStore.addItem(product)

  cartStore.message = `${product.title} added to cart`
  cartStore.showMessage = true

  setTimeout(() => {
    cartStore.showMessage = false
  }, 2000)
}

onMounted(() => {
  fetchProducts()
})

const filteredProducts = computed(() => {

  if (!search.value) {
    return products.value.slice(0, 6)
  }

  return products.value.filter(product =>
    product.title.toLowerCase().includes(search.value.toLowerCase())
  )
})


import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const isLoginMode = ref(true)

const form = ref({
  name: '',
  email: '',
  password: ''
})

const submitAuth = () => {

  if (isLoginMode.value) {

    authStore.login({
      user: {
        name: form.value.name || 'User',
        email: form.value.email
      },
      token: 'sample_token'
    })

  } else {

    authStore.login({
      user: {
        name: form.value.name,
        email: form.value.email
      },
      token: 'sample_token'
    })
  }

  form.value = {
    name: '',
    email: '',
    password: ''
  }

  isAccountOpen.value = false
}

const logout = () => {
  authStore.logout()
  isAccountOpen.value = false
}
</script>

<style scoped>
.icon-button {
  display: inline-flex;
  height: 2.75rem;
  width: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  color: rgb(51 65 85);
  transition: 0.2s;
}

.icon-button:hover {
  background: rgb(241 245 249);
  color: rgb(15 23 42);
}

.nav-pill {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(71 85 105);
  transition: 0.2s;
}

.nav-pill:hover {
  background: rgb(241 245 249);
}

.nav-pill-active {
  background: rgb(15 23 42);
  color: white;
}

.mobile-nav-pill {
  display: flex;
  min-height: 3rem;
  align-items: center;
  border-radius: 9999px;
  padding: 0 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(51 65 85);
}

.mobile-nav-pill:hover {
  background: rgb(241 245 249);
}

.mobile-action {
  border-radius: 1rem;
  background: rgb(248 250 252);
  padding: 0.85rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: 0.2s;
}

.mobile-action:hover {
  background: rgb(226 232 240);
}

.account-button {
  width: 100%;
  padding: 0.9rem 1rem;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgb(51 65 85);
  transition: 0.2s;
}

.account-button:hover {
  background: rgb(241 245 249);
}

.cart-popup-enter-active,
.cart-popup-leave-active {
  transition: all 0.35s ease;
}

.cart-popup-enter-from,
.cart-popup-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>