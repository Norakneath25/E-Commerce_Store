import { request } from './api'

export const createOrder = async (orderData) => {
  try {
    const response = await request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    })

    return response
  } 
  catch (error) {
    console.log(error);
    throw error;
  }
}