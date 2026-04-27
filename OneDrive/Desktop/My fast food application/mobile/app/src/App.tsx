import React, { useEffect } from "react";
import { useAuthStore } from "@store/authStore";
import { RootNavigator } from "@navigation/RootNavigator";
import { useAuthInitialize } from "@hooks/useAuthInitialize";

export default function App() {
  const user = useAuthStore((state) => state.user);
  useAuthInitialize();

  return <RootNavigator isAuthenticated={!!user} />;
}
