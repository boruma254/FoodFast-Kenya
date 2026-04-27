import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors, ms, radius, shadow, spacing, type } from "./ui/theme";

const BottomNav = () => (
  <View style={styles.bottomNav}>
    <Pressable style={styles.navItem} onPress={() => router.push("/home")}>
      <Ionicons name="home-outline" size={20} color={colors.subtle} />
      <Text style={styles.navText}>Home</Text>
    </Pressable>
    <Pressable style={styles.navItem} onPress={() => router.push("/orders")}>
      <Ionicons name="receipt-outline" size={20} color={colors.subtle} />
      <Text style={styles.navText}>Orders</Text>
    </Pressable>
    <Pressable style={styles.navItem}>
      <Ionicons name="person-outline" size={20} color={colors.success} />
      <Text style={[styles.navText, styles.navTextActive]}>Profile</Text>
    </Pressable>
  </View>
);

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.shell}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Ionicons name="person-outline" size={34} color="#fff" /></View>
          <Text style={styles.name}>Guest</Text>
          <Text style={styles.member}>Member since 2026</Text>
        </View>

        <View style={styles.menuCard}>
          {[
            "Account Details",
            "Saved Addresses",
            "Payment Methods",
            "Order History",
          ].map((item) => (
            <View key={item} style={styles.row}><Text style={styles.rowText}>{item}</Text><Ionicons name="chevron-forward" size={16} color="#9CA3AF" /></View>
          ))}
        </View>

        <Pressable style={styles.logout}><Ionicons name="log-out-outline" size={18} color="#EF4444" /><Text style={styles.logoutText}>Sign Out</Text></Pressable>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  shell: { flex: 1, margin: 0, borderRadius: 0, backgroundColor: colors.surface, overflow: "hidden", paddingHorizontal: spacing.md, paddingTop: spacing.md },
  profileCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, alignItems: "center", paddingVertical: spacing.md, ...shadow.card },
  avatar: { width: ms(62), height: ms(62), borderRadius: ms(31), backgroundColor: colors.brand, alignItems: "center", justifyContent: "center", marginBottom: spacing.sm },
  name: { fontSize: type.h2, fontWeight: "900", color: colors.text },
  member: { color: colors.muted, fontSize: type.bodySm, fontWeight: "600" },
  menuCard: { marginTop: spacing.md, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, overflow: "hidden", ...shadow.card },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  rowText: { color: colors.text, fontSize: type.body, fontWeight: "800" },
  logout: { marginTop: spacing.md, flexDirection: "row", gap: spacing.sm, justifyContent: "center", alignItems: "center", backgroundColor: "#FEE2E2", borderRadius: radius.lg, paddingVertical: spacing.md, ...shadow.card },
  logoutText: { color: colors.danger, fontSize: type.body, fontWeight: "800" },
  bottomNav: { position: "absolute", left: 0, right: 0, bottom: 0, height: ms(72), backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  navItem: { alignItems: "center", gap: 2, paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, borderRadius: radius.md },
  navText: { color: colors.subtle, fontSize: type.caption, fontWeight: "700" },
  navTextActive: { color: colors.success },
});
