import { Link, router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useFoodStore } from "../store/useFoodStore";

export default function CheckoutScreen() {
  const cart = useFoodStore((state) => state.cart);
  const deliveryAddress = useFoodStore((state) => state.deliveryAddress);
  const mealInstructions = useFoodStore((state) => state.mealInstructions);
  const checkoutCart = useFoodStore((state) => state.checkoutCart);
  const activeOrder = useFoodStore((state) =>
    state.orders.find((order) => order.status !== "Delivered")
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.body}>Your cart is empty. Add meals first.</Text>
        <Link href="/menu" style={styles.link}>
          Browse Menu
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Items: {cart.length}</Text>
        <Text style={styles.label}>Total: KES {total}</Text>
        <Text style={styles.label}>Address: {deliveryAddress || "Not set"}</Text>
        <Text style={styles.label}>
          Instructions: {mealInstructions.trim() || "None"}
        </Text>
      </View>

      <Pressable
        style={[
          styles.button,
          (!deliveryAddress.trim() || Boolean(activeOrder)) ? styles.buttonDisabled : undefined,
        ]}
        onPress={() => {
          if (!deliveryAddress.trim()) {
            Alert.alert(
              "Address required",
              "Please set your delivery address on Home before placing order."
            );
            return;
          }
          if (activeOrder) {
            Alert.alert(
              "Order in progress",
              "You can only place one order at a time until current order is delivered."
            );
            return;
          }
          checkoutCart();
          router.replace("/order-tracking");
        }}
        disabled={!deliveryAddress.trim() || Boolean(activeOrder)}
      >
        <Text style={styles.buttonText}>Place Order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  body: {
    color: "#4B5563",
    fontSize: 15,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    gap: 6,
  },
  label: {
    color: "#374151",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#16A34A",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  link: {
    color: "#DC2626",
    fontWeight: "700",
    marginTop: 4,
  },
});
