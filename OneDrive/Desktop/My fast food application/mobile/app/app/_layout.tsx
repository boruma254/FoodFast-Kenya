import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="index" options={{ title: "FoodFast Kenya" }} />
        <Stack.Screen name="menu" options={{ title: "Menu" }} />
        <Stack.Screen name="cart" options={{ title: "Cart" }} />
        <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
        <Stack.Screen name="order-tracking" options={{ title: "Order Tracking" }} />
        <Stack.Screen name="orders" options={{ title: "My Orders" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
        <Stack.Screen name="messages" options={{ title: "Messages" }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
