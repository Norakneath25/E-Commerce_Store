<template>
  <footer class="bg-white border-t border-slate-200">
    <div class="container mx-auto px-6 py-14">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        <!-- brand -->
        <div>
          <h2 class="text-2xl font-extrabold text-slate-900">
            Fake<span class="text-indigo-600">Store</span>
          </h2>

          <p class="mt-4 text-slate-500 leading-relaxed">
            Discover modern fashion, electronics, and accessories with a clean
            shopping experience built using Vue and Tailwind CSS.
          </p>
        </div>

        <!-- shop -->
        <div>
          <h3 class="text-lg font-semibold text-slate-900 mb-4">
            Shop
          </h3>

          <ul class="space-y-3 text-slate-500">
            <li class="hover:text-indigo-600 cursor-pointer transition">
              All Products
            </li>

            <li class="hover:text-indigo-600 cursor-pointer transition">
              Electronics
            </li>

            <li class="hover:text-indigo-600 cursor-pointer transition">
              Fashion
            </li>

            <li class="hover:text-indigo-600 cursor-pointer transition">
              Jewelry
            </li>
          </ul>
        </div>

        <!-- company -->
        <div>
          <h3 class="text-lg font-semibold text-slate-900 mb-4">
            Company
          </h3>

          <ul class="space-y-3 text-slate-500">
            <li class="hover:text-indigo-600 cursor-pointer transition">
              About
            </li>

            <li class="hover:text-indigo-600 cursor-pointer transition">
              Careers
            </li>

            <li class="hover:text-indigo-600 cursor-pointer transition">
              Blog
            </li>

            <li class="hover:text-indigo-600 cursor-pointer transition">
              Contact
            </li>
          </ul>
        </div>

        <!-- newsletter -->
        <div>
          <h3 class="text-lg font-semibold text-slate-900 mb-4">
            Stay Updated
          </h3>

          <p class="text-slate-500 mb-4">
            Subscribe to receive updates and exclusive offers.
          </p>

          <div class="flex items-center bg-slate-100 rounded-2xl p-2">
            <input
              type="email"
              placeholder="Enter your email"
              class="bg-transparent outline-none flex-1 px-3 text-slate-700"
            />

            <button
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <!-- bottom -->
      <div
        class="mt-14 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500"
      >
        <p>© 2026 FakeStore. All rights reserved.</p>

        <div class="flex gap-6">
          <span class="hover:text-indigo-600 cursor-pointer transition">
            Privacy
          </span>

          <span class="hover:text-indigo-600 cursor-pointer transition">
            Terms
          </span>

          <span class="hover:text-indigo-600 cursor-pointer transition">
            Support
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>