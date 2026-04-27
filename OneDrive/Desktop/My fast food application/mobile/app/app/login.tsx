import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, ms, radius, shadow, spacing, type } from "./ui/theme";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.brand}>FoodExpress</Text>
        <Text style={styles.tag}>Delicious food delivered fast</Text>

        <View style={styles.formCard}>
          <Text style={styles.heading}>Welcome Back</Text>

          <View style={styles.inputWrap}>
            <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
            <TextInput placeholder="Email" placeholderTextColor="#9CA3AF" style={styles.input} />
          </View>

          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />
            <TextInput placeholder="Password" placeholderTextColor="#9CA3AF" style={styles.input} secureTextEntry />
          </View>

          <Pressable style={styles.signInButton} onPress={() => router.replace("/home")}>
            <Text style={styles.signInText}>Sign In</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>

          <Text style={styles.signUp}>Don't have an account? Sign Up</Text>
        </View>

        <Pressable onPress={() => router.replace("/home")}>
          <Text style={styles.guest}>Continue as Guest</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  container: {
    flex: 1,
    margin: 0,
    borderRadius: 0,
    backgroundColor: colors.brand,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  brand: { textAlign: "center", fontSize: type.h1, fontWeight: "900", color: colors.white, letterSpacing: ms(-0.3) },
  tag: { textAlign: "center", color: "rgba(255,255,255,0.92)", marginTop: spacing.xs, fontSize: type.body, marginBottom: spacing.xl },
  formCard: { backgroundColor: colors.card, borderRadius: radius.xl, padding: spacing.lg, ...shadow.card },
  heading: { fontSize: type.h2, fontWeight: "900", textAlign: "center", marginBottom: spacing.lg, color: colors.text, letterSpacing: ms(-0.2) },
  inputWrap: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  input: { flex: 1, paddingVertical: ms(12), paddingHorizontal: spacing.sm, fontSize: type.body, color: colors.text },
  signInButton: {
    backgroundColor: colors.brand,
    borderRadius: radius.md,
    paddingVertical: ms(13),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  signInText: { color: colors.white, fontSize: type.h3, fontWeight: "800" },
  signUp: { textAlign: "center", color: colors.brand, fontSize: type.body, marginTop: spacing.lg, fontWeight: "700" },
  guest: { textAlign: "center", marginTop: spacing.lg, color: colors.white, fontWeight: "800", fontSize: type.h3 },
});
