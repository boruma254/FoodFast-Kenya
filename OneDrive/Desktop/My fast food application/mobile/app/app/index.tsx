import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors, ms, radius, shadow, spacing, type } from "./ui/theme";

const ROLES = [
  { key: "Customer", icon: <Ionicons name="person-outline" size={24} color="#fff" />, color: "#08A045", text: "Order delicious food" },
  { key: "Chef", icon: <MaterialCommunityIcons name="chef-hat" size={24} color="#fff" />, color: "#F45D01", text: "Manage restaurant orders" },
  { key: "Rider", icon: <MaterialCommunityIcons name="bike-fast" size={24} color="#fff" />, color: "#2563EB", text: "Deliver orders" },
  { key: "Admin", icon: <Ionicons name="shield-checkmark-outline" size={24} color="#fff" />, color: "#9333EA", text: "Manage platform" },
];

export default function RoleScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.brand}>FoodExpress</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>

        <View style={styles.grid}>
          {ROLES.map((role) => (
            <Pressable
              key={role.key}
              style={styles.roleCard}
              onPress={() => router.push("/login")}
            >
              <View style={[styles.iconWrap, { backgroundColor: role.color }]}>{role.icon}</View>
              <Text style={styles.roleTitle}>{role.key}</Text>
              <Text style={styles.roleText}>{role.text}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  card: {
    flex: 1,
    margin: 0,
    borderRadius: 0,
    backgroundColor: colors.surface,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  brand: { textAlign: "center", fontSize: type.h1, fontWeight: "800", color: colors.text, letterSpacing: ms(-0.3) },
  subtitle: { textAlign: "center", marginTop: spacing.xs, marginBottom: spacing.xl, color: colors.muted, fontSize: type.body },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: spacing.md },
  roleCard: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    ...shadow.card,
  },
  iconWrap: { width: ms(52), height: ms(52), borderRadius: ms(26), alignItems: "center", justifyContent: "center", marginBottom: spacing.md },
  roleTitle: { fontSize: type.h3, fontWeight: "800", color: colors.text, marginBottom: spacing.xs },
  roleText: { textAlign: "center", color: colors.muted, fontSize: type.bodySm, lineHeight: ms(19) },
});
