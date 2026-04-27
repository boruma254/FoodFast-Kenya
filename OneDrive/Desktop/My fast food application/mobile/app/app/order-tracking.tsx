import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFoodStore } from "../store/useFoodStore";
import { colors, ms, radius, shadow, spacing, type } from "./ui/theme";

const BottomNav = () => (
  <View style={styles.bottomNav}>
    <Pressable style={styles.navItem} onPress={() => router.push("/home")}>
      <Ionicons name="home-outline" size={20} color={colors.subtle} />
      <Text style={styles.navText}>Home</Text>
    </Pressable>
    <Pressable style={styles.navItem}>
      <Ionicons name="receipt-outline" size={20} color={colors.success} />
      <Text style={[styles.navText, styles.navTextActive]}>Orders</Text>
    </Pressable>
    <Pressable style={styles.navItem} onPress={() => router.push("/profile")}>
      <Ionicons name="person-outline" size={20} color={colors.subtle} />
      <Text style={styles.navText}>Profile</Text>
    </Pressable>
  </View>
);

export default function TrackingScreen() {
  const order = useFoodStore((state) => state.orders[0]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.shell}>
        <View style={styles.header}><Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#fff" /></Pressable><Text style={styles.headerTitle}>Track Order</Text></View>

        <View style={styles.card}>
          <Text style={styles.orderId}>Order #{order?.id ?? "ORD613817"}</Text>
          <Text style={styles.time}>30 min</Text>
          <Text style={styles.sub}>Estimated delivery time</Text>

          <View style={styles.step}><View style={[styles.dot, styles.dotActive]} /><View><Text style={styles.stepTitle}>Preparing</Text><Text style={styles.stepSub}>Restaurant is preparing your order</Text></View></View>
          <View style={styles.line} />
          <View style={styles.step}><View style={styles.dot} /><View><Text style={styles.stepTitle}>On the Way</Text><Text style={styles.stepSub}>Driver is delivering your order</Text></View></View>
          <View style={styles.line} />
          <View style={styles.step}><View style={styles.dot} /><View><Text style={styles.stepTitle}>Delivered</Text><Text style={styles.stepSub}>Order has been delivered</Text></View></View>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Order Details</Text>
          <Text style={styles.detail}>Burger Palace</Text>
          <Text style={styles.detail}>1x Classic Burger</Text>
          <View style={[styles.row, { marginTop: 8 }]}><Text style={styles.total}>Total</Text><Text style={styles.totalGreen}>${order?.total?.toFixed(2) ?? "17.02"}</Text></View>
        </View>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  shell: { flex: 1, margin: 0, borderRadius: 0, backgroundColor: colors.surface, overflow: "hidden" },
  header: { height: ms(56), backgroundColor: colors.brand, flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.md },
  headerTitle: { color: colors.white, fontSize: type.h2, fontWeight: "900", letterSpacing: ms(-0.2) },
  card: { margin: spacing.md, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.md, ...shadow.card },
  orderId: { textAlign: "center", color: colors.muted, fontSize: type.bodySm, fontWeight: "700" },
  time: { textAlign: "center", fontSize: ms(44), fontWeight: "900", color: colors.text, letterSpacing: ms(-0.5) },
  sub: { textAlign: "center", color: colors.muted, marginBottom: spacing.md, fontSize: type.bodySm, fontWeight: "600" },
  step: { flexDirection: "row", gap: spacing.sm, alignItems: "center" },
  dot: { width: ms(14), height: ms(14), borderRadius: ms(7), backgroundColor: colors.borderStrong },
  dotActive: { backgroundColor: colors.brand },
  line: { width: 2, height: ms(22), backgroundColor: colors.borderStrong, marginLeft: ms(6), marginVertical: spacing.xs },
  stepTitle: { fontSize: type.body, fontWeight: "900", color: colors.text },
  stepSub: { color: colors.muted, fontSize: type.bodySm, lineHeight: ms(18) },
  details: { marginHorizontal: spacing.md, marginBottom: ms(88), backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.md, ...shadow.card },
  detailsTitle: { fontSize: type.h3, fontWeight: "900", color: colors.text, marginBottom: spacing.sm },
  detail: { color: colors.muted, marginBottom: spacing.xs, fontSize: type.bodySm, fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  total: { fontSize: type.h3, fontWeight: "900", color: colors.text },
  totalGreen: { fontSize: type.h3, fontWeight: "900", color: colors.success },
  bottomNav: { position: "absolute", left: 0, right: 0, bottom: 0, height: ms(72), backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  navItem: { alignItems: "center", gap: 2, paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, borderRadius: radius.md },
  navText: { color: colors.subtle, fontSize: type.caption, fontWeight: "700" },
  navTextActive: { color: colors.success },
});
