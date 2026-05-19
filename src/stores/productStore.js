import { defineStore } from "pinia";
import { productService } from "../services/productService";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    singleProduct: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchAllProducts() {
      this.isLoading = true;
      this.error = null;

      try {
        this.products = await productService.getAllProduct();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchProductById(id) {
      this.isLoading = true;
      this.error = null;

      try {
        this.singleProduct = await productService.getProductById(id);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchProductByCategory(category) {
      this.isLoading = true;
      this.error = null;

      try {
        this.products = await productService.getProductByCategory(category);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});