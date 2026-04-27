import { apiClient } from "./apiClient";
import { AuthResponse, User, ApiResponse } from "@types/index";
import { StorageService } from "./StorageService";

export const AuthService = {
  async register(
    fullName: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      {
        fullName,
        email,
        phone,
        password,
      },
    );

    if (response.data) {
      await StorageService.setToken(response.data.accessToken);
      await StorageService.setRefreshToken(response.data.refreshToken);
      await StorageService.setUser(response.data.user);
    }

    return response.data!;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      {
        email,
        password,
      },
    );

    if (response.data) {
      await StorageService.setToken(response.data.accessToken);
      await StorageService.setRefreshToken(response.data.refreshToken);
      await StorageService.setUser(response.data.user);
    }

    return response.data!;
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>("/auth/profile");
    return response.data!;
  },

  async updateProfile(
    fullName?: string,
    address?: string,
    profileImage?: string,
  ): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>("/auth/profile", {
      fullName,
      address,
      profileImage,
    });
    return response.data!;
  },

  async logout(): Promise<void> {
    await StorageService.clearAll();
  },
};
