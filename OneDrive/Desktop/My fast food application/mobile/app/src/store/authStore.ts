import create from "zustand";
import { User } from "@types/index";
import { AuthService } from "@services/AuthService";
import { StorageService } from "@services/StorageService";

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  register: (
    fullName: string,
    email: string,
    phone: string,
    password: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getProfile: () => Promise<void>;
  updateProfile: (
    fullName?: string,
    address?: string,
    profileImage?: string,
  ) => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  register: async (fullName, email, phone, password) => {
    set({ isLoading: true, error: null });
    try {
      const result = await AuthService.register(
        fullName,
        email,
        phone,
        password,
      );
      set({ user: result.user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Registration failed", isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const result = await AuthService.login(email, password);
      set({ user: result.user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Login failed", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await AuthService.logout();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  getProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await AuthService.getProfile();
      set({ user, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch profile",
        isLoading: false,
      });
    }
  },

  updateProfile: async (fullName, address, profileImage) => {
    set({ isLoading: true, error: null });
    try {
      const user = await AuthService.updateProfile(
        fullName,
        address,
        profileImage,
      );
      set({ user, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to update profile",
        isLoading: false,
      });
      throw error;
    }
  },

  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),
}));
