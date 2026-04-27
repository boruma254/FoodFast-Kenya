import { apiClient } from "./apiClient";
import { Product, ApiResponse } from "@types/index";

export const ProductService = {
  async getProducts(category?: string, limit: number = 20, skip: number = 0) {
    const params: any = { limit, skip };
    if (category) params.category = category;

    const response = await apiClient.get<ApiResponse<any>>("/products", {
      params,
    });
    return response.data!;
  },

  async getFeaturedProducts(limit: number = 10) {
    const response = await apiClient.get<ApiResponse<any>>(
      "/products/featured",
      { params: { limit } },
    );
    return response.data!;
  },

  async getProductById(productId: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(
      `/products/${productId}`,
    );
    return response.data!;
  },

  async searchProducts(query: string, limit: number = 20) {
    const response = await apiClient.get<ApiResponse<any>>("/products/search", {
      params: { q: query, limit },
    });
    return response.data!;
  },

  async getCategories(): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<any>>(
      "/products/categories",
    );
    return response.data!.categories;
  },
};
