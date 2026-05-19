import { request } from "./api";

export const productService = {
  getAllProduct() {
    return request("/products");
  },
  getProductById(id) {
    return request(`/products/${id}`);
  },
  getProductByCategory(category) {
    return request(`/products/category/${category}`);
  },
};
