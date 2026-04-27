import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { Button } from "@components/Button";
import { InputField } from "@components/InputField";
import { ProductService } from "@services/ProductService";
import { useCartStore } from "@store/cartStore";
import { formatCurrency } from "@utils/helpers";
import { COLORS } from "@config/constants";
import { Product } from "@types/index";

export const ProductDetailsScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { productId } = route.params as { productId: string };

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);
  const cartLoading = useCartStore((state) => state.isLoading);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error("Error loading product:", error);
      Alert.alert("Error", "Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(productId, quantity);
      Alert.alert("Success", "Item added to cart!", [
        { text: "Continue Shopping", onPress: () => navigation.goBack() },
        {
          text: "View Cart",
          onPress: () => navigation.navigate("Cart"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.image} />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          {/* Title and Vendor */}
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.vendor}>{product.vendorName}</Text>

          {/* Rating and Preparation Time */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Rating</Text>
              <Text style={styles.infoValue}>⭐ {product.rating || 0}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Prep Time</Text>
              <Text style={styles.infoValue}>{product.preparationTime}m</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text
                style={[
                  styles.infoValue,
                  {
                    color: product.availability
                      ? COLORS.success
                      : COLORS.danger,
                  },
                ]}
              >
                {product.availability ? "Available" : "Out of Stock"}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantityDisplay}>{quantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Price and Add to Cart */}
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabel}>Total Price</Text>
              <Text style={styles.totalPrice}>
                {formatCurrency(product.price * quantity)}
              </Text>
            </View>

            <Button
              title="Add to Cart"
              onPress={handleAddToCart}
              loading={cartLoading}
              disabled={!product.availability}
              style={styles.addButton}
            />
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
  image: {
    width: "100%",
    height: 250,
    backgroundColor: COLORS.light,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.dark,
    fontWeight: "300",
  },
  content: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 4,
  },
  vendor: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  categoryBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.light,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  quantityDisplay: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    flex: 1,
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 40,
  },
  priceLabel: {
    fontSize: 12,
    color: "#999",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 4,
  },
  addButton: {
    flex: 0.4,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    textAlign: "center",
  },
});
