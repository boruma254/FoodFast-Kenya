import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFoodStore } from "../store/useFoodStore";
import { colors, ms, radius, shadow, spacing, type } from "./ui/theme";

export default function CartScreen() {
  const cart = useFoodStore((state) => state.cart);
  const addToCart = useFoodStore((state) => state.addToCart);
  const decreaseCartItem = useFoodStore((state) => state.decreaseCartItem);
  const removeFromCart = useFoodStore((state) => state.removeFromCart);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.shell}>
        <View style={styles.header}><Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#fff" /></Pressable><Text style={styles.headerTitle}>Your Cart</Text></View>

        {cart.length > 0 ? (
          <ScrollView contentContainerStyle={{ paddingBottom: spacing.sm }}>
            {cart.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemRestaurant}>{item.restaurantName}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <View style={styles.qtyRow}>
                    <Pressable onPress={() => decreaseCartItem(item.id)}><Text style={styles.qtyBtn}>-</Text></Pressable>
                    <Text style={styles.qty}>{item.quantity}</Text>
                    <Pressable onPress={() => addToCart(item)}><Text style={styles.qtyBtn}>+</Text></Pressable>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
                  <Pressable onPress={() => removeFromCart(item.id)}><Ionicons name="trash-outline" size={18} color="#EF4444" /></Pressable>
                  <Text style={styles.itemPrice}>${(item.quantity * item.price).toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.empty}><Text style={styles.emptyText}>Your cart is empty</Text></View>
        )}

        {cart.length > 0 ? (
          <View style={styles.footer}>
            <View style={styles.row}><Text style={styles.label}>Subtotal</Text><Text style={styles.value}>${subtotal.toFixed(2)}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Delivery Fee</Text><Text style={styles.value}>${deliveryFee.toFixed(2)}</Text></View>
            <View style={styles.row}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>${total.toFixed(2)}</Text></View>
            <Pressable style={styles.button} onPress={() => router.push("/checkout")}><Text style={styles.buttonText}>Proceed to Payment</Text></Pressable>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  shell: { flex: 1, margin: 0, borderRadius: 0, backgroundColor: colors.surface, overflow: "hidden" },
  header: { height: ms(56), backgroundColor: colors.brand, flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.md },
  headerTitle: { color: colors.white, fontSize: type.h2, fontWeight: "900", letterSpacing: ms(-0.2) },
  itemCard: { margin: spacing.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md, flexDirection: "row", ...shadow.card },
  image: { width: ms(64), height: ms(64), borderRadius: radius.md },
  itemName: { fontSize: type.h3, fontWeight: "900", color: colors.text, letterSpacing: ms(-0.2) },
  itemRestaurant: { marginTop: 2, fontSize: type.caption, color: colors.subtle, fontWeight: "700" },
  itemPrice: { color: colors.success, fontSize: type.h3, fontWeight: "900", marginTop: spacing.xs },
  qtyRow: { marginTop: spacing.sm, width: ms(124), borderRadius: radius.pill, backgroundColor: "#F3F4F6", flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingVertical: ms(6), borderWidth: 1, borderColor: colors.border },
  qtyBtn: { fontSize: type.h3, color: colors.subtle, fontWeight: "900" },
  qty: { fontSize: type.body, fontWeight: "900", color: colors.text },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { fontSize: type.body, color: colors.subtle, fontWeight: "700" },
  footer: { marginTop: "auto", borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.card, padding: spacing.md },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.xs },
  label: { color: colors.muted, fontSize: type.bodySm, fontWeight: "600" },
  value: { color: colors.muted, fontSize: type.bodySm, fontWeight: "700" },
  totalLabel: { fontSize: type.h3, fontWeight: "900", color: colors.text },
  totalValue: { fontSize: type.h3, fontWeight: "900", color: colors.text },
  button: { marginTop: spacing.md, backgroundColor: colors.brand, borderRadius: radius.xl, alignItems: "center", paddingVertical: spacing.sm, ...shadow.card },
  buttonText: { color: colors.white, fontSize: type.body, fontWeight: "900" },
});
