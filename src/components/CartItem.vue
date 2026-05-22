<template>
  <div
    class="flex items-center gap-6 rounded-2xl bg-white p-5 shadow-md border border-gray-100 transition hover:shadow-lg"
  >
    <!-- Product Image -->
    <div
      class="flex h-24 w-24 items-center justify-center rounded-xl bg-gray-100"
    >
      <img
        :src="item.product.image"
        class="h-16 w-16 object-contain"
      />
    </div>

    <!-- Product Info -->
    <div class="flex-1">
      <h2 class="text-lg font-semibold text-gray-800 line-clamp-1">
        {{ item.product.title }}
      </h2>

      <p class="mt-1 text-sm text-gray-400">
        Premium product for your collection
      </p>
    </div>

    <!-- Quantity -->
    <div class="flex items-center gap-3">
      <button
        @click="decreaseQty"
        class="flex h-8 w-8 items-center justify-center rounded-md bg-orange-400 text-white transition hover:bg-orange-500"
      >
        -
      </button>

      <span class="text-lg font-semibold text-gray-700">
        {{ item.quantity }}
      </span>

      <button
        @click="increaseQty"
        class="flex h-8 w-8 items-center justify-center rounded-md bg-orange-400 text-white transition hover:bg-orange-500"
      >
        +
      </button>
    </div>

    <!-- Price -->
    <div class="w-24 text-center">
      <p class="text-sm text-gray-400">
        Price
      </p>

      <p class="font-semibold text-gray-800">
        ${{ item.product.price }}
      </p>
    </div>

    <!-- Subtotal -->
    <div class="w-24 text-center">
      <p class="text-sm text-gray-400">
        Amount
      </p>

      <p class="font-bold text-gray-900">
        ${{ (item.product.price * item.quantity).toFixed(2) }}
      </p>
    </div>

    <!-- Remove Button -->
    <button
      @click="$emit('remove', item.product.id)"
      class="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
    >
      ✕
    </button>
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