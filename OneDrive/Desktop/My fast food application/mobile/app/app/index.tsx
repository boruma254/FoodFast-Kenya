import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useFoodStore } from "../store/useFoodStore";

const TOP_MEALS = [
  { id: "1", name: "Classic Beef Burger", icon: "🍔", price: "KES 550" },
  { id: "2", name: "Pepperoni Pizza", icon: "🍕", price: "KES 1200" },
  { id: "3", name: "Crispy Wings", icon: "🍗", price: "KES 780" },
  { id: "4", name: "Vanilla Milkshake", icon: "🥤", price: "KES 350" },
];

export default function HomeScreen() {
  const deliveryAddress = useFoodStore((state) => state.deliveryAddress);
  const setDeliveryAddress = useFoodStore((state) => state.setDeliveryAddress);
  const [addressInput, setAddressInput] = useState(deliveryAddress);

  const saveAddress = () => {
    setDeliveryAddress(addressInput.trim());
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <View style={styles.heroSection}>
        <View style={styles.heroTopRow}>
          <Text style={styles.brand}>FoodFast</Text>
          <View style={styles.loginPill}>
            <Text style={styles.loginText}>Login</Text>
          </View>
        </View>

        <Text style={styles.heroTitle}>Enter your address to know what's near you</Text>

        <View style={styles.addressBar}>
          <TextInput
            value={addressInput}
            onChangeText={setAddressInput}
            onSubmitEditing={saveAddress}
            placeholder="What's your address?"
            placeholderTextColor="#6B7280"
            style={styles.addressInput}
          />
          <Pressable style={styles.arrowButton} onPress={saveAddress}>
            <Text style={styles.arrow}>→</Text>
          </Pressable>
        </View>
        {deliveryAddress ? (
          <Text style={styles.savedAddress}>Delivering to: {deliveryAddress}</Text>
        ) : null}
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Order our top meals today</Text>

        <View style={styles.mealsRow}>
          {TOP_MEALS.map((meal) => (
            <Pressable
              key={meal.id}
              style={styles.mealCard}
              onPress={() => router.push("/menu")}
            >
              <View style={styles.mealIconWrap}>
                <Text style={styles.mealIcon}>{meal.icon}</Text>
              </View>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealPrice}>{meal.price}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.quickLinks}>
          <Text style={styles.quickTitle}>Quick actions</Text>
          <Link href="/menu" style={styles.link}>
            Browse Menu
          </Link>
          <Link href="/cart" style={styles.link}>
            Open Cart
          </Link>
          <Link href="/checkout" style={styles.link}>
            Checkout
          </Link>
          <Link href="/order-tracking" style={styles.link}>
            Order Tracking
          </Link>
          <Link href="/profile" style={styles.link}>
            Profile
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  pageContent: {
    paddingBottom: 24,
  },
  heroSection: {
    backgroundColor: "#FBBF24",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 30,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0F766E",
  },
  loginPill: {
    backgroundColor: "#0F766E",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loginText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  heroTitle: {
    textAlign: "center",
    marginTop: 14,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  addressBar: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    paddingVertical: 0,
  },
  arrowButton: {
    marginLeft: 10,
  },
  arrow: {
    fontSize: 24,
    color: "#4B5563",
  },
  savedAddress: {
    marginTop: 8,
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },
  contentSection: {
    paddingHorizontal: 18,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 38,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 42,
    marginBottom: 18,
  },
  mealsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 22,
  },
  mealCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  mealIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  mealIcon: {
    fontSize: 26,
  },
  mealName: {
    fontWeight: "600",
    color: "#111827",
    fontSize: 13,
  },
  mealPrice: {
    marginTop: 4,
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 12,
  },
  quickLinks: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
  },
  quickTitle: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "700",
    marginBottom: 8,
  },
  link: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 6,
  },
});
