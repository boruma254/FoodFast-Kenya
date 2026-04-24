import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link } from "expo-router";
import { SAMPLE_MENU, useFoodStore } from "../store/useFoodStore";

export default function MenuScreen() {
  const [query, setQuery] = useState("");
  const cart = useFoodStore((state) => state.cart);
  const addToCart = useFoodStore((state) => state.addToCart);

  const filteredMenu = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return SAMPLE_MENU;
    return SAMPLE_MENU.filter((item) =>
      item.name.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.title}>Sample Menu</Text>
          <Text style={styles.subtitle}>Testing data (prices in KES)</Text>
        </View>
        <Link href="/cart" style={styles.cartLink}>
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Link>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search menu item..."
        style={styles.searchInput}
      />

      <Text style={styles.counter}>
        Cart Total: KES{" "}
        {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
      </Text>

      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>KES {item.price}</Text>
            </View>
            <Text style={styles.meta}>
              {item.category} • Prep: {item.prepTime}
            </Text>
            <Pressable
              style={styles.addButton}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No matching item found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cartLink: {
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 14,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  counter: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    marginVertical: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#DC2626",
  },
  meta: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
    marginBottom: 10,
  },
  addButton: {
    alignSelf: "flex-start",
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 24,
  },
});
