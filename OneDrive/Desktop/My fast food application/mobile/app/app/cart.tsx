import { Link, router } from "expo-router";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useFoodStore } from "../store/useFoodStore";

export default function CartScreen() {
  const cart = useFoodStore((state) => state.cart);
  const addToCart = useFoodStore((state) => state.addToCart);
  const decreaseCartItem = useFoodStore((state) => state.decreaseCartItem);
  const removeFromCart = useFoodStore((state) => state.removeFromCart);
  const checkoutCart = useFoodStore((state) => state.checkoutCart);
  const deliveryAddress = useFoodStore((state) => state.deliveryAddress);
  const mealInstructions = useFoodStore((state) => state.mealInstructions);
  const setMealInstructions = useFoodStore((state) => state.setMealInstructions);
  const activeOrder = useFoodStore((state) =>
    state.orders.find((order) => order.status !== "Delivered")
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
          <Link href="/menu" style={styles.link}>
            Browse menu
          </Link>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.topLine}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>KES {item.price * item.quantity}</Text>
                </View>
                <Text style={styles.meta}>
                  {item.quantity} x KES {item.price}
                </Text>

                <View style={styles.actionsRow}>
                  <Pressable
                    style={styles.smallButton}
                    onPress={() => decreaseCartItem(item.id)}
                  >
                    <Text style={styles.smallButtonText}>-</Text>
                  </Pressable>
                  <Pressable
                    style={styles.smallButton}
                    onPress={() => addToCart(item)}
                  >
                    <Text style={styles.smallButtonText}>+</Text>
                  </Pressable>
                  <Pressable
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            )}
            ListFooterComponent={
              <View style={styles.instructionsCard}>
                <Text style={styles.instructionsTitle}>Meal instructions</Text>
                <TextInput
                  value={mealInstructions}
                  onChangeText={setMealInstructions}
                  placeholder="E.g. No onions, extra spicy, well done..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  style={styles.instructionsInput}
                />
              </View>
            }
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: KES {total}</Text>
            <Text style={styles.addressLine}>
              Address: {deliveryAddress || "Not set"}
            </Text>
            {activeOrder ? (
              <Text style={styles.activeOrderWarning}>
                Active order {activeOrder.id} is still in progress. You can place a new order
                after it is delivered.
              </Text>
            ) : null}
            <Pressable
              style={[
                styles.checkoutButton,
                activeOrder ? styles.checkoutButtonDisabled : undefined,
              ]}
              onPress={() => {
                if (activeOrder) {
                  Alert.alert(
                    "Order in progress",
                    "You can only place one order at a time until the current one is delivered."
                  );
                  return;
                }
                router.push("/checkout");
              }}
              disabled={Boolean(activeOrder)}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </Pressable>
          </View>
        </>
      )}
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
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 16,
    marginBottom: 8,
  },
  link: {
    color: "#DC2626",
    fontWeight: "700",
  },
  listContent: {
    paddingBottom: 120,
  },
  instructionsCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  instructionsTitle: {
    color: "#111827",
    fontWeight: "700",
    marginBottom: 8,
  },
  instructionsInput: {
    minHeight: 72,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: "top",
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  itemName: {
    flex: 1,
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },
  itemPrice: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "700",
  },
  meta: {
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  smallButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
  smallButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 20,
  },
  removeButton: {
    marginLeft: 8,
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  removeButtonText: {
    color: "#B91C1C",
    fontWeight: "700",
  },
  footer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  addressLine: {
    color: "#374151",
    marginBottom: 10,
    fontSize: 13,
  },
  activeOrderWarning: {
    color: "#B91C1C",
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "600",
  },
  checkoutButton: {
    backgroundColor: "#16A34A",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  checkoutButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
