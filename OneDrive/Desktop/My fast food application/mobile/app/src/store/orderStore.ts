import create from "zustand";
import { Order } from "@types/index";
import { OrderService } from "@services/OrderService";

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;

  fetchOrders: (limit?: number, skip?: number) => Promise<void>;
  fetchOrder: (orderId: string) => Promise<void>;
  createOrder: (
    deliveryAddress: string,
    customerPhone: string,
    latitude?: number,
    longitude?: number,
    notes?: string,
  ) => Promise<Order>;
  cancelOrder: (orderId: string) => Promise<void>;
  clearError: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,

  fetchOrders: async (limit, skip) => {
    set({ isLoading: true, error: null });
    try {
      const result = await OrderService.getUserOrders(limit, skip);
      set({ orders: result.orders, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch orders",
        isLoading: false,
      });
    }
  },

  fetchOrder: async (orderId) => {
    set({ isLoading: true, error: null });
    try {
      const order = await OrderService.getOrder(orderId);
      set({ currentOrder: order, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch order",
        isLoading: false,
      });
    }
  },

  createOrder: async (
    deliveryAddress,
    customerPhone,
    latitude,
    longitude,
    notes,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const order = await OrderService.createOrder(
        deliveryAddress,
        customerPhone,
        latitude,
        longitude,
        notes,
      );
      set({ currentOrder: order, isLoading: false });
      return order;
    } catch (error: any) {
      set({
        error: error.message || "Failed to create order",
        isLoading: false,
      });
      throw error;
    }
  },

  cancelOrder: async (orderId) => {
    set({ isLoading: true, error: null });
    try {
      await OrderService.cancelOrder(orderId);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to cancel order",
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
