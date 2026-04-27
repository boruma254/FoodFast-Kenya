import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text, SafeAreaView } from "react-native";
import { useAuthStore } from "@store/authStore";
import { useAuthInitialize } from "@hooks/useAuthInitialize";

export const SplashScreen = ({ navigation }: any) => {
  const user = useAuthStore((state) => state.user);
  useAuthInitialize();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("@/../assets/logo.png")} style={styles.logo} />
        <Text style={styles.appName}>FoodFast</Text>
        <Text style={styles.tagline}>Fast delivery, Fresh food</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
});
