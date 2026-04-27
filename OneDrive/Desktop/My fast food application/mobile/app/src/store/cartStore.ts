import create from "zustand";
import { Cart, CartItem } from "@types/index";
import { CartService } from "@services/CartService";

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;

  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotal: () => number;
  clearError: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await CartService.getCart();
      set({ cart, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch cart", isLoading: false });
    }
  },

  addToCart: async (productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await CartService.addToCart(productId, quantity);
      set({ cart, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to add item", isLoading: false });
      throw error;
    }
  },

  updateCartItem: async (productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await CartService.updateCartItem(productId, quantity);
      set({ cart, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to update item",
        isLoading: false,
      });
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await CartService.removeFromCart(productId);
      set({ cart, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to remove item",
        isLoading: false,
      });
      throw error;
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await CartService.clearCart();
      set({ cart, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to clear cart", isLoading: false });
    }
  },

  getTotal: () => {
    const state = get();
    return state.cart?.total || 0;
  },

  clearError: () => set({ error: null }),
}));
