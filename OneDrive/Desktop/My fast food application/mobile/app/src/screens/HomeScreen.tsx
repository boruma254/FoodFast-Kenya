import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useProductStore } from "@store/productStore";
import { ProductCard } from "@components/ProductCard";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { EmptyState } from "@components/EmptyState";
import { COLORS, CATEGORIES } from "@config/constants";

export const HomeScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);

  const products = useProductStore((state) => state.products);
  const featuredProducts = useProductStore((state) => state.featuredProducts);
  const isLoading = useProductStore((state) => state.isLoading);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchFeaturedProducts = useProductStore(
    (state) => state.fetchFeaturedProducts,
  );
  const searchProducts = useProductStore((state) => state.searchProducts);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchProducts(searchQuery).then((results) => {
        setDisplayProducts(results);
      });
    } else {
      setDisplayProducts(products);
    }
  }, [searchQuery, products]);

  const handleAddToCart = (productId: string) => {
    navigation.navigate("ProductDetails", { productId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.locationSection}>
          <Text style={styles.locationIcon}>📍</Text>
          <View>
            <Text style={styles.locationLabel}>Deliver to</Text>
            <Text style={styles.locationAddress}>123 Main St, New York</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Text style={styles.notificationBell}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for restaurants or cuisines"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>

          {/* Popular Restaurants */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Restaurants</Text>
            {isLoading ? (
              <LoadingSpinner />
            ) : displayProducts.length > 0 ? (
              displayProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onPress={() =>
                    navigation.navigate("ProductDetails", {
                      productId: product._id,
                    })
                  }
                  onAddToCart={() => handleAddToCart(product._id)}
                />
              ))
            ) : (
              <EmptyState
                icon="🍽️"
                title={
                  searchQuery ? "No results found" : "No restaurants available"
                }
                description={
                  searchQuery
                    ? "Try a different search term"
                    : "Check back later"
                }
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 8,
    color: "#fff",
  },
  locationLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },
  locationAddress: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  notificationBell: {
    fontSize: 24,
    color: "#fff",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 12,
    marginBottom: 20,
    marginTop: 16,
    borderWidth: 0,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: COLORS.dark,
    fontSize: 14,
    marginLeft: 8,
  },
  searchIcon: {
    fontSize: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },
  categoriesList: {
    marginBottom: 12,
  },
  categoryChip: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
