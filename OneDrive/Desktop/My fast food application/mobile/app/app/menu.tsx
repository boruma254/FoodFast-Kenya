import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { MenuItem, SAMPLE_MENU, useFoodStore } from "../store/useFoodStore";
import { colors, ms, radius, shadow, spacing, type } from "./ui/theme";

const buildMenuForRestaurant = (
  restaurantId: string,
  restaurantName: string,
  tags: string
): MenuItem[] => {
  const t = tags.toLowerCase();

  const make = (
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    category: "Burgers" | "Pizza" | "Wings" = "Burgers"
  ): MenuItem => ({
    id: `${restaurantId}-${id}`,
    restaurantId,
    restaurantName,
    name,
    price,
    prepTime: "20-30 min",
    description,
    image,
    category,
  });

  if (t.includes("pizza")) {
    return [
      make("1", "Margherita Pizza", 13.99, "Tomato sauce, mozzarella, fresh basil", "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80", "Pizza"),
      make("2", "Pepperoni Pizza", 16.49, "Pepperoni, mozzarella, oregano", "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?auto=format&fit=crop&w=700&q=80", "Pizza"),
      make("3", "BBQ Chicken Pizza", 17.25, "BBQ chicken, onions, smoky sauce", "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=700&q=80", "Pizza"),
    ];
  }

  if (t.includes("sushi") || t.includes("japanese")) {
    return [
      make("1", "Salmon Nigiri", 14.5, "Fresh salmon over seasoned sushi rice", "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80", "Wings"),
      make("2", "California Roll", 12.99, "Crab, cucumber, avocado", "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=700&q=80", "Wings"),
      make("3", "Tempura Shrimp Roll", 15.49, "Crispy shrimp with house mayo", "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=700&q=80", "Wings"),
    ];
  }

  if (t.includes("dessert") || t.includes("bakery")) {
    return [
      make("1", "Chocolate Lava Cake", 8.99, "Warm lava cake with dark chocolate center", "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80", "Wings"),
      make("2", "Blueberry Cheesecake", 9.49, "Creamy baked cheesecake and berries", "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80", "Wings"),
      make("3", "Classic Tiramisu", 10.25, "Coffee-soaked sponge with mascarpone", "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=80", "Wings"),
    ];
  }

  if (t.includes("chicken") || t.includes("wings") || t.includes("bbq")) {
    return [
      make("1", "Buffalo Wings", 11.99, "Spicy buffalo wings with ranch dip", "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80", "Wings"),
      make("2", "BBQ Drumsticks", 12.99, "Sticky BBQ glazed chicken drumsticks", "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=80", "Wings"),
      make("3", "Chicken Tenders", 10.5, "Crispy tenders with honey mustard", "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80", "Wings"),
    ];
  }

  if (t.includes("healthy") || t.includes("salad") || t.includes("vegan")) {
    return [
      make("1", "Quinoa Power Bowl", 12.5, "Quinoa, avocado, chickpeas, greens", "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80", "Burgers"),
      make("2", "Avocado Kale Salad", 11.25, "Kale, avocado, seeds, lemon dressing", "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=700&q=80", "Burgers"),
      make("3", "Tofu Veggie Wrap", 10.99, "Grilled tofu, veggies, whole grain wrap", "https://images.unsplash.com/photo-1625943555419-56a2cb596640?auto=format&fit=crop&w=700&q=80", "Burgers"),
    ];
  }

  return [
    ...SAMPLE_MENU.map((item, index) => ({
      ...item,
      id: `${restaurantId}-${index + 1}`,
      restaurantId,
      restaurantName,
    })),
  ];
};

export default function MenuScreen() {
  const params = useLocalSearchParams<{
    restaurantId?: string;
    restaurantName?: string;
    tags?: string;
    rating?: string;
    eta?: string;
    image?: string;
  }>();
  const addToCart = useFoodStore((state) => state.addToCart);
  const cart = useFoodStore((state) => state.cart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const restaurantId = params.restaurantId ?? "1";
  const restaurantName = params.restaurantName ?? "Burger Palace";
  const restaurantTags = params.tags ?? "American, Burgers";
  const restaurantRating = params.rating ?? "4.5";
  const restaurantEta = params.eta ?? "20-30 min";
  const restaurantImage = params.image ?? SAMPLE_MENU[0].image;
  const restaurantMenu = buildMenuForRestaurant(
    restaurantId,
    restaurantName,
    restaurantTags
  );

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.shell}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.heroWrap}>
            <Pressable style={styles.back} onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#111827" /></Pressable>
            <Image source={{ uri: restaurantImage }} style={styles.heroImage} />
          </View>

          <View style={styles.body}>
            <Text style={styles.name}>{restaurantName}</Text>
            <Text style={styles.tags}>{restaurantTags}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.meta}><MaterialCommunityIcons name="star" size={15} color="#EAB308" /> {restaurantRating}</Text>
              <Text style={styles.meta}><Ionicons name="time-outline" size={14} color="#6B7280" /> {restaurantEta}</Text>
            </View>

            <Text style={styles.menuTitle}>Menu</Text>
            {restaurantMenu.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.description}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <View>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <Pressable style={styles.plus} onPress={() => addToCart(item)}>
                    <Ionicons name="add" size={18} color="#fff" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {cartCount > 0 ? (
          <Pressable style={styles.cartBar} onPress={() => router.push("/cart")}>
            <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>
            <Text style={styles.cartBarText}>View Cart</Text>
            <Text style={styles.cartBarPrice}>${subtotal.toFixed(2)}</Text>
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  shell: { flex: 1, margin: 0, borderRadius: 0, backgroundColor: colors.surface, overflow: "hidden" },
  heroWrap: { position: "relative" },
  heroImage: { width: "100%", height: ms(200) },
  back: { position: "absolute", top: spacing.sm, left: spacing.sm, width: ms(38), height: ms(38), borderRadius: ms(19), backgroundColor: "rgba(255,255,255,0.95)", alignItems: "center", justifyContent: "center", zIndex: 2, ...shadow.card },
  body: { padding: spacing.md },
  name: { fontSize: type.h1, fontWeight: "900", color: colors.text, letterSpacing: ms(-0.3) },
  tags: { fontSize: type.body, color: colors.muted, marginTop: spacing.xs },
  metaRow: { flexDirection: "row", gap: spacing.md, marginVertical: spacing.sm },
  meta: { fontSize: type.bodySm, color: colors.subtle, fontWeight: "700" },
  menuTitle: { fontSize: type.h2, fontWeight: "900", marginTop: spacing.md, marginBottom: spacing.sm, color: colors.text },
  itemCard: { flexDirection: "row", backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md, ...shadow.card },
  itemName: { fontSize: type.h3, fontWeight: "900", color: colors.text, letterSpacing: ms(-0.2) },
  itemDesc: { marginTop: spacing.xs, color: colors.muted, fontSize: type.bodySm, lineHeight: ms(19) },
  itemPrice: { marginTop: spacing.sm, color: colors.success, fontSize: type.h3, fontWeight: "900" },
  itemImage: { width: ms(86), height: ms(86), borderRadius: radius.md },
  plus: { position: "absolute", right: ms(-6), bottom: ms(-6), width: ms(32), height: ms(32), borderRadius: ms(16), backgroundColor: colors.brand, alignItems: "center", justifyContent: "center", ...shadow.card },
  cartBar: { position: "absolute", left: spacing.md, right: spacing.md, bottom: spacing.md, backgroundColor: colors.brand, borderRadius: radius.xl, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, flexDirection: "row", alignItems: "center", ...shadow.card },
  badge: { width: ms(30), height: ms(30), borderRadius: ms(15), backgroundColor: colors.brandDark, alignItems: "center", justifyContent: "center", marginRight: spacing.sm },
  badgeText: { color: "#fff", fontWeight: "700" },
  cartBarText: { color: colors.white, fontSize: type.body, fontWeight: "900", flex: 1 },
  cartBarPrice: { color: colors.white, fontSize: type.body, fontWeight: "900" },
});
