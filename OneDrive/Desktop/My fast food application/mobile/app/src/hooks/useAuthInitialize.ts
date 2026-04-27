import { useEffect } from "react";
import { useAuthStore } from "@store/authStore";
import { StorageService } from "@services/StorageService";

export const useAuthInitialize = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const initializeAuth = async () => {
      const user = await StorageService.getUser();
      if (user) {
        setUser(user);
      }
    };

    initializeAuth();
  }, []);

  return isAuthenticated;
};
