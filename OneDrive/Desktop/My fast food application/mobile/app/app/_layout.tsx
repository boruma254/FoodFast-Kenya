import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F3F4F6" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="home" />
        <Stack.Screen name="menu" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="order-tracking" />
        <Stack.Screen name="orders" />
        <Stack.Screen name="profile" />
      </Stack>
      <StatusBar style="dark" translucent={false} backgroundColor="#F3F4F6" />
    </>
  );
}
