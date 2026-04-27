import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useFoodStore } from "../store/useFoodStore";
import { colors, ms, radius, shadow, spacing, type } from "./ui/theme";

const RESTAURANTS = [
  { id: "1", name: "Burger Palace", tags: "American, Burgers", rating: 4.5, eta: "20-30 min", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
  { id: "2", name: "Pizza Express", tags: "Italian, Pizza", rating: 4.7, eta: "25-35 min", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80" },
  { id: "3", name: "Sushi House", tags: "Japanese, Sushi", rating: 4.8, eta: "30-40 min", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80" },
  { id: "4", name: "Taco Fiesta", tags: "Mexican, Tacos", rating: 4.4, eta: "20-28 min", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=80" },
  { id: "5", name: "Curry Corner", tags: "Indian, Curry", rating: 4.6, eta: "28-38 min", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80" },
  { id: "6", name: "Noodle Hub", tags: "Asian, Noodles", rating: 4.3, eta: "22-32 min", image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=900&q=80" },
  { id: "7", name: "Steak Grill", tags: "Grill, Steak", rating: 4.7, eta: "35-45 min", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" },
  { id: "8", name: "Healthy Bowl", tags: "Salads, Healthy", rating: 4.5, eta: "18-26 min", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80" },
  { id: "9", name: "Chicken Spot", tags: "Chicken, Wings", rating: 4.2, eta: "20-30 min", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80" },
  { id: "10", name: "Pasta Point", tags: "Italian, Pasta", rating: 4.6, eta: "24-34 min", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80" },
  { id: "11", name: "Seafood Bay", tags: "Seafood, Grill", rating: 4.4, eta: "32-42 min", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80" },
  { id: "12", name: "Breakfast Club", tags: "Breakfast, Coffee", rating: 4.5, eta: "15-24 min", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80" },
  { id: "13", name: "Kebab Kingdom", tags: "Middle Eastern, Kebab", rating: 4.3, eta: "26-36 min", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80" },
  { id: "14", name: "Vegan Delight", tags: "Vegan, Plant-Based", rating: 4.7, eta: "19-27 min", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80" },
  { id: "15", name: "BBQ Barn", tags: "BBQ, Ribs", rating: 4.6, eta: "30-40 min", image: "https://images.unsplash.com/photo-1529692236671-f1dc307eab3f?auto=format&fit=crop&w=900&q=80" },
  { id: "16", name: "Dumpling Den", tags: "Chinese, Dumplings", rating: 4.5, eta: "22-31 min", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=80" },
  { id: "17", name: "Sandwich Stop", tags: "Sandwiches, Fast Food", rating: 4.1, eta: "14-22 min", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80" },
  { id: "18", name: "Pho Street", tags: "Vietnamese, Noodles", rating: 4.6, eta: "24-33 min", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=900&q=80" },
  { id: "19", name: "Mediterraneo", tags: "Mediterranean, Bowls", rating: 4.7, eta: "23-32 min", image: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?auto=format&fit=crop&w=900&q=80" },
  { id: "20", name: "Dessert Lab", tags: "Desserts, Bakery", rating: 4.8, eta: "16-25 min", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80" },
];

const BottomNav = () => (
  <View style={styles.bottomNav}>
    <Pressable style={styles.navItem}>
      <Ionicons name="home-outline" size={20} color={colors.success} />
      <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
    </Pressable>
    <Pressable style={styles.navItem} onPress={() => router.push("/orders")}>
      <Ionicons name="receipt-outline" size={20} color={colors.subtle} />
      <Text style={styles.navText}>Orders</Text>
    </Pressable>
    <Pressable style={styles.navItem} onPress={() => router.push("/profile")}>
      <Ionicons name="person-outline" size={20} color={colors.subtle} />
      <Text style={styles.navText}>Profile</Text>
    </Pressable>
  </View>
);

export default function HomeScreen() {
  const deliveryAddress = useFoodStore((state) => state.deliveryAddress);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.shell}>
        <View style={styles.hero}>
          <View>
            <Text style={styles.deliverLabel}>Deliver to</Text>
            <Text style={styles.address}>{deliveryAddress}</Text>
          </View>
          <Text style={styles.guest}>Hi,{"\n"}Guest</Text>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput placeholder="Search for restaurants or cuisines" placeholderTextColor="#9CA3AF" style={styles.searchInput} />
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 120 }}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
          {RESTAURANTS.map((restaurant) => (
            <Pressable
              key={restaurant.id}
              style={styles.restaurantCard}
              onPress={() =>
                router.push({
                  pathname: "/menu",
                  params: {
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                    tags: restaurant.tags,
                    rating: String(restaurant.rating),
                    eta: restaurant.eta,
                    image: restaurant.image,
                  },
                })
              }
            >
              <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
              <View style={styles.restaurantBody}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantTags}>{restaurant.tags}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.meta}><MaterialCommunityIcons name="star" size={15} color="#EAB308" /> {restaurant.rating}</Text>
                  <Text style={styles.meta}><Ionicons name="time-outline" size={14} color="#6B7280" /> {restaurant.eta}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  shell: { flex: 1, margin: 0, borderRadius: 0, backgroundColor: colors.surface, overflow: "hidden" },
  hero: { backgroundColor: colors.brand, paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.md },
  deliverLabel: { color: "rgba(255,255,255,0.85)", fontSize: type.bodySm },
  address: { color: colors.white, fontSize: ms(18), fontWeight: "800", marginTop: spacing.xs },
  guest: { position: "absolute", right: spacing.md, top: spacing.sm, color: colors.white, fontWeight: "700", textAlign: "right", fontSize: type.body },
  searchBox: { marginTop: spacing.md, backgroundColor: colors.white, borderRadius: radius.pill, flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.md, borderWidth: 1, borderColor: "rgba(0,0,0,0.04)" },
  searchInput: { flex: 1, paddingVertical: ms(10), paddingHorizontal: spacing.sm, fontSize: type.body, color: colors.text },
  content: { flex: 1 },
  sectionTitle: { fontSize: type.h2, fontWeight: "900", color: colors.text, marginHorizontal: spacing.md, marginTop: spacing.lg, marginBottom: spacing.md, letterSpacing: ms(-0.2) },
  restaurantCard: { backgroundColor: colors.card, borderRadius: radius.lg, marginHorizontal: spacing.md, marginBottom: spacing.md, overflow: "hidden", borderWidth: 1, borderColor: colors.border, ...shadow.card },
  restaurantImage: { width: "100%", height: ms(150) },
  restaurantBody: { padding: spacing.md },
  restaurantName: { fontSize: type.h3, fontWeight: "900", color: colors.text, letterSpacing: ms(-0.2) },
  restaurantTags: { color: colors.muted, fontSize: type.bodySm, marginTop: spacing.xs },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.sm },
  meta: { color: colors.subtle, fontSize: type.bodySm, fontWeight: "600" },
  bottomNav: { position: "absolute", left: 0, right: 0, bottom: 0, height: ms(72), backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  navItem: { alignItems: "center", gap: 2, paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, borderRadius: radius.md },
  navText: { color: colors.subtle, fontSize: type.caption, fontWeight: "700" },
  navTextActive: { color: colors.success },
});
