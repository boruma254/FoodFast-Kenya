import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCartStore } from "@store/cartStore";
import { CartItemComponent } from "@components/CartItemComponent";
import { Button } from "@components/Button";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { EmptyState } from "@components/EmptyState";
import { formatCurrency } from "@utils/helpers";
import { COLORS, DELIVERY_FEE } from "@config/constants";

export const CartScreen = ({ navigation }: any) => {
  const cart = useCartStore((state) => state.cart);
  const isLoading = useCartStore((state) => state.isLoading);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrease = async (productId: string) => {
    const item = cart?.items.find((i) => i.productId === productId);
    if (item) {
      await updateCartItem(productId, item.quantity + 1);
    }
  };

  const handleDecrease = async (productId: string) => {
    const item = cart?.items.find((i) => i.productId === productId);
    if (item && item.quantity > 1) {
      await updateCartItem(productId, item.quantity - 1);
    }
  };

  const handleRemove = async (productId: string) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Remove",
        onPress: async () => {
          await removeFromCart(productId);
        },
        style: "destructive",
      },
    ]);
  };

  const subtotal = cart?.total || 0;
  const deliveryFee = DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            description="Add some delicious meals to get started!"
          />
          <Button
            title="Start Shopping"
            onPress={() => navigation.navigate("Home")}
            style={styles.shopButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Clear Cart", "Remove all items?", [
              { text: "Cancel" },
              {
                text: "Clear",
                onPress: clearCart,
                style: "destructive",
              },
            ])
          }
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cart.items.map((item) => (
          <CartItemComponent
            key={item.productId}
            item={item}
            onIncrease={() => handleIncrease(item.productId)}
            onDecrease={() => handleDecrease(item.productId)}
            onRemove={() => handleRemove(item.productId)}
          />
        ))}

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(deliveryFee)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>

        <Button
          title="Proceed to Checkout"
          onPress={() => navigation.navigate("Checkout")}
          size="large"
          style={styles.checkoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  clearText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  summary: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  checkoutButton: {
    marginBottom: 40,
  },
  shopButton: {
    marginTop: 20,
  },
});
