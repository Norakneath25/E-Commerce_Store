import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    showMessage: false,
    message: ''
  }),

  getters: {
    itemCount: (state) => {
      return state.items.reduce(
        (total, item) => total + item.quantity,
        0
      )
    },

    totalPrice: (state) => {
      return state.items.reduce(
        (total, item) =>
          total + item.product.price * item.quantity,
        0
      )
    }
  },

  actions: {
    addItem(product) {
      const existing = this.items.find(
        item => item.product.id === product.id
      )

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({
          product,
          quantity: 1
        })
      }

      // show message
      this.message = `${product.title} added to cart`
      this.showMessage = true

      setTimeout(() => {
        this.showMessage = false
      }, 2500)
    },

    removeItem(id) {
      this.items = this.items.filter(
        item => item.product.id !== id
      )
    },

    updateQuantity(id, qty) {
      const item = this.items.find(
        item => item.product.id === id
      )

      if (item) {
        item.quantity = qty
      }
    },

    clearCart() {
      this.items = []
    }
  }
})