import create from "zustand";
import { Product } from "@types/index";
import { ProductService } from "@services/ProductService";

interface ProductStore {
  products: Product[];
  featuredProducts: Product[];
  categories: string[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;

  fetchProducts: (
    category?: string,
    limit?: number,
    skip?: number,
  ) => Promise<void>;
  fetchFeaturedProducts: (limit?: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  searchProducts: (query: string, limit?: number) => Promise<Product[]>;
  setSelectedCategory: (category: string | null) => void;
  clearError: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  featuredProducts: [],
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,

  fetchProducts: async (category, limit, skip) => {
    set({ isLoading: true, error: null });
    try {
      const result = await ProductService.getProducts(category, limit, skip);
      set({ products: result.products, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch products",
        isLoading: false,
      });
    }
  },

  fetchFeaturedProducts: async (limit) => {
    set({ isLoading: true, error: null });
    try {
      const result = await ProductService.getFeaturedProducts(limit);
      set({ featuredProducts: result.products, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch featured products",
        isLoading: false,
      });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await ProductService.getCategories();
      set({ categories });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch categories" });
    }
  },

  searchProducts: async (query, limit) => {
    try {
      const result = await ProductService.searchProducts(query, limit);
      return result.products || [];
    } catch (error: any) {
      set({ error: error.message || "Search failed" });
      return [];
    }
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearError: () => set({ error: null }),
}));
