import axios, { AxiosInstance, AxiosError } from "axios";
import { API_BASE_URL } from "@config/constants";
import { StorageService } from "./StorageService";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const token = await StorageService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await StorageService.clearAll();
          // Trigger logout event
        }
        return Promise.reject(error);
      },
    );
  }

  get<T>(url: string, config?: any) {
    return this.client.get<any, T>(url, config);
  }

  post<T>(url: string, data?: any, config?: any) {
    return this.client.post<any, T>(url, data, config);
  }

  put<T>(url: string, data?: any, config?: any) {
    return this.client.put<any, T>(url, data, config);
  }

  delete<T>(url: string, config?: any) {
    return this.client.delete<any, T>(url, config);
  }
}

export const apiClient = new ApiClient();
