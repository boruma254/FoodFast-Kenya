import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useFoodStore } from "../store/useFoodStore";
import { colors, ms, radius, shadow, spacing, type } from "./ui/theme";

export default function CheckoutScreen() {
  const cart = useFoodStore((state) => state.cart);
  const checkoutCart = useFoodStore((state) => state.checkoutCart);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.shell}>
        <View style={styles.header}><Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#fff" /></Pressable><Text style={styles.headerTitle}>Payment</Text></View>
        <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Order Summary</Text>
            <View style={styles.row}><Text style={styles.gray}>1x {cart[0]?.name ?? "Classic Burger"}</Text><Text style={styles.gray}>${subtotal.toFixed(2)}</Text></View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Payment Method</Text>
            <View style={[styles.method, styles.methodActive]}><Text style={styles.methodText}>Credit/Debit Card</Text><Ionicons name="checkmark-circle" size={18} color="#16A34A" /></View>
            <View style={styles.method}><Text style={styles.methodText}>Digital Wallet</Text></View>
            <View style={styles.method}><Text style={styles.methodText}>Cash on Delivery</Text></View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Card Details</Text>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput style={styles.input} placeholder="1234 5678 9012 3456" placeholderTextColor="#9CA3AF" />
            <Text style={styles.inputLabel}>Cardholder Name</Text>
            <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#9CA3AF" />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.row}><Text style={styles.gray}>Subtotal</Text><Text style={styles.gray}>${subtotal.toFixed(2)}</Text></View>
          <View style={styles.row}><Text style={styles.gray}>Delivery Fee</Text><Text style={styles.gray}>${deliveryFee.toFixed(2)}</Text></View>
          <View style={styles.row}><Text style={styles.gray}>Tax (8%)</Text><Text style={styles.gray}>${tax.toFixed(2)}</Text></View>
          <View style={styles.row}><Text style={styles.total}>Total</Text><Text style={styles.total}>${total.toFixed(2)}</Text></View>
          <Pressable style={styles.payBtn} onPress={() => { checkoutCart(); router.replace("/order-tracking"); }}><Text style={styles.payText}>Pay ${total.toFixed(2)}</Text></Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  shell: { flex: 1, margin: 0, borderRadius: 0, backgroundColor: colors.surface, overflow: "hidden" },
  header: { height: ms(56), backgroundColor: colors.brand, flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.md },
  headerTitle: { color: colors.white, fontSize: type.h2, fontWeight: "900", letterSpacing: ms(-0.2) },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginBottom: spacing.md, ...shadow.card },
  cardTitle: { fontSize: type.h3, fontWeight: "900", marginBottom: spacing.sm, color: colors.text },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.xs },
  gray: { color: colors.muted, fontSize: type.bodySm, fontWeight: "600" },
  method: { borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, flexDirection: "row", justifyContent: "space-between", backgroundColor: "#F9FAFB" },
  methodActive: { borderColor: colors.success, backgroundColor: "#ECFDF5" },
  methodText: { fontSize: type.body, fontWeight: "800", color: colors.text },
  inputLabel: { color: colors.muted, marginTop: spacing.xs, marginBottom: spacing.xs, fontSize: type.bodySm, fontWeight: "700" },
  input: { borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: ms(10), marginBottom: spacing.sm, backgroundColor: colors.white, fontSize: type.body },
  footer: { borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.card, padding: spacing.md },
  total: { fontSize: type.h3, fontWeight: "900", color: colors.text },
  payBtn: { marginTop: spacing.sm, backgroundColor: colors.brand, borderRadius: radius.xl, alignItems: "center", paddingVertical: spacing.sm, ...shadow.card },
  payText: { color: colors.white, fontWeight: "900", fontSize: type.body },
});
