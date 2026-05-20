<template>

  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="w-full bg-indigo-600 h-10 flex items-center justify-center px-7 sm:px-6 lg:px-8">
        <h4 class="text-white text-sm font-medium italic">Get Free Shipping on Orders Over $50</h4>
    </div>
    <nav class="flex w-full items-center justify-between px-7 py-3 sm:px-6 lg:px-8">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3" aria-label="E-Commerce home">
        <img
          :src="logoUrl"
          alt="E-Commerce logo"
          class="h-12 w-12 rounded-lg object-cover ring-1 ring-slate-200"
        >
        <div class="leading-tight">
          <p class="text-base font-bold text-slate-950">E-Commerce</p>
          <p class="text-xs font-medium text-slate-500">Online Store</p>
        </div>
      </RouterLink>

      <!-- Navigation Items -->
      <div class="hidden items-center gap-1 lg:flex">
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

      <!-- User Actions -->
      <div class="hidden items-center gap-2 lg:flex">
        <button class="icon-button" type="button" 
        @click="isSearchOpen = !isSearchOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>

        <RouterLink to="/cart" class="icon-button relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <span class="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-bold leading-none text-white">
            {{ cartCount }}
          </span>
        </RouterLink>

        <button class="icon-button" type="button" 
        @click="isAccountOpen = !isAccountOpen">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </button>
      </div>

      <button
        class="icon-button menu-toggle"
        type="button"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <div v-if="isSearchOpen" class="relative w-full bg-red-500">
      <div class="absolute left-1/4 top-2 w-[50%] px-7 sm:px-6 lg:px-8">
        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="w-full h-10  rounded-md border border-slate-300 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        >
        <div class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" @click="toggleSearch">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>

      </div>
    </div>

    <div v-if="isMenuOpen" class="mobile-menu border-t border-slate-200 bg-white px-4 py-3">
      <div class="mx-auto flex max-w-7xl flex-col gap-2">
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

        <div class="mt-2 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
          <button class="mobile-action" type="button">Search</button>
          <RouterLink to="/cart" class="mobile-action text-center" @click="isMenuOpen = false">
            Cart ({{ cartCount }})
          </RouterLink>
          <button class="mobile-action" type="button">Account</button>
        </div>
      </div>
    </div>

    <div v-if="isAccountOpen" class="absolute right-10 w-40 h-auto rounded-md bg-gray-300">
      <div class="text-center  border rounded ">
        <p>Account Menu</p>
      </div>
      <div v-if="hasAccount" class="mt-2 border-t border-slate-100">
          <button class="w-full py-2 px-4 hover:bg-gray-200 flex"><p>Profile</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
  
          </button>
          <button class="w-full py-2 px-4 hover:bg-gray-200 flex"><p>Orders</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
  
          </button>
          <button class="w-full py-2 px-4 hover:bg-gray-200 flex"><p>Logout</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </button>
        </div>
        <div v-else> 
          <button class="w-full py-2 px-4 hover:bg-gray-200 flex"><p>Login</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
  
          </button>
          <button class="w-full py-2 px-4 hover:bg-gray-200 flex"><p>Register</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          </button>
        </div>

    </div>

   
  </header>
</template>

<script setup>
import { ref } from 'vue';

const logoUrl = 'src/assets/images/logoShop.jpg';;
const cartCount = ref(0);

const isSearchOpen = ref(false);
const isAccountOpen = ref(false);
const isMenuOpen = ref(false);

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Cart', to: '/cart' },
  { label: 'Order', to: '/order' },
];

const toggleMenu = () =>{
  isMenuOpen.value = !isMenuOpen.value;
}
const toggleSearch = () =>{
  isSearchOpen.value = !isSearchOpen.value;
}
const toggleAccount = () =>{
  isAccountOpen.value = !isAccountOpen.value;
}


</script>

<style scoped>
.icon-button {
  display: inline-flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  color: rgb(51 65 85);
  transition: background-color 150ms ease, color 150ms ease;
}

.icon-button:hover {
  background-color: rgb(195, 195, 196);
  color: rgb(2 6 23);
}

.nav-pill {
  display: inline-flex;
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(71 85 105);
  transition: background-color 150ms ease, color 150ms ease, box-shadow 150ms ease;
}

.nav-pill:hover {
  background-color: rgb(171, 171, 171);
  color: rgb(2 6 23);
}

.mobile-nav-pill {
  display: flex;
  min-height: 2.75rem;
  align-items: center;
  border-radius: 9999px;
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(51 65 85);
}

.mobile-nav-pill:hover {
  background-color: rgb(241 245 249);
}

.nav-pill-active {
  background-color: rgb(2 6 23);
  color: white;
  box-shadow: 0 10px 24px rgb(15 23 42 / 0.14);
}

.nav-pill-active:hover {
  background-color: rgb(2 6 23);
  color: white;
}

.mobile-action {
  border-radius: 0.5rem;
  background-color: rgb(248 250 252);
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(51 65 85);
}

@media (min-width: 1024px) {
  .menu-toggle,
  .mobile-menu {
    display: none;
  }
}
</style>
