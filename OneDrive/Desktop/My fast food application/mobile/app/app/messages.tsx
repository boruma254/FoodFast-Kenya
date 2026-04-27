import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.text}>Chat support is coming soon.</Text>
        <Pressable style={styles.button} onPress={() => router.push("/orders")}>
          <Text style={styles.buttonText}>Back to Orders</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#E5E7EB", justifyContent: "center", padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: "#E5E7EB" },
  title: { fontSize: 28, fontWeight: "700", color: "#111827" },
  text: { marginTop: 8, color: "#4B5563", fontSize: 16 },
  button: { marginTop: 14, backgroundColor: "#08A045", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
