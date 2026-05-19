# getstore api from product service example:

import { productService } from '../services/productService.js'

// test all 3 functions
const allProduct = await productService.getAllProduct()
console.log('all products:', all)

const oneProduct = await productService.getProductById(1)
console.log('one product:', one)

const category = await productService.getProductByCategory('electronics')
console.log('electronics:', category)