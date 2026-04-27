import { apiClient } from "./apiClient";
import { Order, ApiResponse } from "@types/index";

export const OrderService = {
  async createOrder(
    deliveryAddress: string,
    customerPhone: string,
    latitude?: number,
    longitude?: number,
    notes?: string,
  ): Promise<Order> {
    const response = await apiClient.post<ApiResponse<any>>("/orders", {
      deliveryAddress,
      customerPhone,
      latitude,
      longitude,
      notes,
    });
    return response.data!.order;
  },

  async getOrder(orderId: string): Promise<Order> {
    const response = await apiClient.get<ApiResponse<any>>(
      `/orders/${orderId}`,
    );
    return response.data!.order;
  },

  async getUserOrders(limit: number = 10, skip: number = 0) {
    const response = await apiClient.get<ApiResponse<any>>("/orders", {
      params: { limit, skip },
    });
    return response.data!;
  },

  async getOrderStats() {
    const response = await apiClient.get<ApiResponse<any>>("/orders/stats");
    return response.data!;
  },

  async cancelOrder(orderId: string): Promise<Order> {
    const response = await apiClient.put<ApiResponse<any>>(
      `/orders/${orderId}/cancel`,
    );
    return response.data!.order;
  },
};
