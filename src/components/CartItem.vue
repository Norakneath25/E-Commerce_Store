<template>
  <div
    class="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:shadow-xl"
  >
    <!-- Remove Button -->
    <button
      @click="$emit('remove', item.product.id)"
      class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:scale-105 hover:bg-red-600"
    >
      ✕
    </button>

    <!-- Main Content -->
    <div
      class="flex flex-col gap-5 md:flex-row md:items-center"
    >

      <!-- Product Image -->
      <div
        class="mx-auto flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-gray-100 md:mx-0 md:h-28 md:w-28"
      >
        <img
          :src="item.product.image"
          class="h-24 w-24 object-contain"
        />
      </div>

      <!-- Product Info -->
      <div class="flex flex-1 flex-col items-center text-center md:items-start md:text-left">

        <h2
          class="max-w-62.5 text-center text-lg font-bold leading-snug text-gray-800 md:max-w-none md:text-left md:text-xl"
        >
          {{ item.product.title }}
        </h2>

        <p class="mt-2 text-sm text-gray-400">
          Premium product for your collection
        </p>

        <!-- Quantity -->
        <div
          class="mt-5 flex items-center justify-center gap-4 md:justify-start"
        >

          <button
            @click="decreaseQty"
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400 text-xl font-bold text-white transition hover:bg-orange-500"
          >
            -
          </button>

          <span class="text-xl font-bold text-gray-700">
            {{ item.quantity }}
          </span>

          <button
            @click="increaseQty"
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400 text-xl font-bold text-white transition hover:bg-orange-500"
          >
            +
          </button>

        </div>

      </div>

    </div>

    <!-- Bottom Section -->
    <div
      class="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5"
    >

      <!-- Price -->
      <div
        class="rounded-2xl bg-gray-50 p-4 text-center"
      >
        <p class="text-sm text-gray-400">
          Price
        </p>

        <p class="mt-1 text-xl font-bold text-gray-800">
          ${{ item.product.price }}
        </p>
      </div>

      <!-- Amount -->
      <div
        class="rounded-2xl bg-gray-50 p-4 text-center"
      >
        <p class="text-sm text-gray-400">
          Amount
        </p>

        <p class="mt-1 text-xl font-bold text-gray-900">
          ${{ (item.product.price * item.quantity).toFixed(2) }}
        </p>
      </div>

    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  item: Object
})

const emit = defineEmits(['remove', 'update-qty'])

const increaseQty = () => {
  emit(
    'update-qty',
    props.item.product.id,
    props.item.quantity + 1
  )
}

const decreaseQty = () => {
  if (props.item.quantity > 1) {
    emit(
      'update-qty',
      props.item.product.id,
      props.item.quantity - 1
    )
  }
}
</script>