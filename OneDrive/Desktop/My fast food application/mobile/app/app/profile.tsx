import { StyleSheet, Text, View } from "react-native";
import { useFoodStore } from "../store/useFoodStore";

export default function ProfileScreen() {
  const deliveryAddress = useFoodStore((state) => state.deliveryAddress);
  const activeOrder = useFoodStore((state) =>
    state.orders.find((order) => order.status !== "Delivered")
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.name}>Customer Account</Text>
        <Text style={styles.meta}>Email: customer@foodfast.app</Text>
        <Text style={styles.meta}>
          Default Address: {deliveryAddress || "Not set"}
        </Text>
        <Text style={styles.meta}>
          Active Order: {activeOrder ? `${activeOrder.id} (${activeOrder.status})` : "None"}
        </Text>
      </View>
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
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  name: {
    fontSize: 18,
    color: "#111827",
    fontWeight: "700",
  },
  meta: {
    color: "#4B5563",
    fontSize: 14,
  },
});
