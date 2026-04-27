import { apiClient } from "./apiClient";
import { Cart, ApiResponse } from "@types/index";

export const CartService = {
  async getCart(): Promise<Cart> {
    const response = await apiClient.get<ApiResponse<any>>("/cart");
    return response.data!.cart;
  },

  async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
    const response = await apiClient.post<ApiResponse<any>>("/cart/add", {
      productId,
      quantity,
    });
    return response.data!.cart;
  },

  async updateCartItem(productId: string, quantity: number): Promise<Cart> {
    const response = await apiClient.put<ApiResponse<any>>(
      `/cart/${productId}`,
      {
        quantity,
      },
    );
    return response.data!.cart;
  },

  async removeFromCart(productId: string): Promise<Cart> {
    const response = await apiClient.delete<ApiResponse<any>>(
      `/cart/${productId}`,
    );
    return response.data!.cart;
  },

  async clearCart(): Promise<Cart> {
    const response = await apiClient.delete<ApiResponse<any>>("/cart");
    return response.data!.cart;
  },
};
