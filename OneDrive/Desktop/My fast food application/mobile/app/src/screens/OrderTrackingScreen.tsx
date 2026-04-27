import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useOrderStore } from "@store/orderStore";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { Button } from "@components/Button";
import {
  formatCurrency,
  getOrderStatusLabel,
  getPaymentStatusLabel,
} from "@utils/helpers";
import { COLORS } from "@config/constants";

export const OrderTrackingScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };

  const currentOrder = useOrderStore((state) => state.currentOrder);
  const isLoading = useOrderStore((state) => state.isLoading);
  const fetchOrder = useOrderStore((state) => state.fetchOrder);

  useEffect(() => {
    fetchOrder(orderId);
    const interval = setInterval(() => {
      fetchOrder(orderId);
    }, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [orderId]);

  if (isLoading && !currentOrder) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (!currentOrder) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Order not found</Text>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: COLORS.warning,
      confirmed: COLORS.primary,
      preparing: COLORS.primary,
      ready_for_pickup: COLORS.warning,
      out_for_delivery: "#3498db",
      delivered: COLORS.success,
      cancelled: COLORS.danger,
    };
    return colors[status] || "#999";
  };

  const statuses = [
    { status: "pending", label: "Order Received" },
    { status: "confirmed", label: "Confirmed" },
    { status: "preparing", label: "Preparing" },
    { status: "out_for_delivery", label: "On the Way" },
    { status: "delivered", label: "Delivered" },
  ];

  const currentStatusIndex = statuses.findIndex(
    (s) => s.status === currentOrder.orderStatus,
  );
  const progress = ((currentStatusIndex + 1) / statuses.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Number */}
        <View style={styles.header}>
          <Text style={styles.orderNumber}>
            Order #{currentOrder._id.slice(-6).toUpperCase()}
          </Text>
          <Text style={styles.orderDate}>
            Placed {new Date(currentOrder.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {/* Status Timeline */}
        <View style={styles.timeline}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />

          {statuses.map((item, index) => (
            <View key={item.status} style={styles.statusItem}>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      index <= currentStatusIndex
                        ? getStatusColor(item.status)
                        : "#ddd",
                  },
                ]}
              />
              <Text
                style={[
                  styles.statusLabel,
                  { color: index <= currentStatusIndex ? COLORS.dark : "#999" },
                ]}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Current Status */}
        <View style={styles.currentStatus}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(currentOrder.orderStatus) },
            ]}
          >
            <Text style={styles.statusBadgeText}>
              {getOrderStatusLabel(currentOrder.orderStatus)}
            </Text>
          </View>
          <Text style={styles.statusMessage}>
            {currentOrder.orderStatus === "preparing"
              ? "👨‍🍳 Your food is being prepared with care"
              : currentOrder.orderStatus === "out_for_delivery"
                ? "🚴 Your order is on its way"
                : currentOrder.orderStatus === "delivered"
                  ? "✓ Order delivered successfully"
                  : "Order is being processed"}
          </Text>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>

          {currentOrder.items.map((item) => (
            <View key={item.productId} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.productName}</Text>
              <Text style={styles.itemQty}>x{item.quantity}</Text>
              <Text style={styles.itemPrice}>
                {formatCurrency(item.price * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Pricing */}
        <View style={styles.pricing}>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Subtotal</Text>
            <Text style={styles.pricingValue}>
              {formatCurrency(currentOrder.subtotal)}
            </Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Delivery Fee</Text>
            <Text style={styles.pricingValue}>
              {formatCurrency(currentOrder.deliveryFee)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Total</Text>
            <Text style={styles.pricingValue}>
              {formatCurrency(currentOrder.total)}
            </Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.addressText}>{currentOrder.deliveryAddress}</Text>
        </View>

        {/* Payment Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Status</Text>
          <View
            style={[
              styles.paymentStatus,
              {
                backgroundColor:
                  currentOrder.paymentStatus === "paid" ? "#e8f5e9" : "#fff3e0",
              },
            ]}
          >
            <Text
              style={[
                styles.paymentStatusText,
                {
                  color:
                    currentOrder.paymentStatus === "paid"
                      ? COLORS.success
                      : COLORS.warning,
                },
              ]}
            >
              {getPaymentStatusLabel(currentOrder.paymentStatus)}
            </Text>
          </View>
        </View>

        {currentOrder.orderStatus !== "delivered" &&
          currentOrder.orderStatus !== "cancelled" && (
            <Button
              title="Contact Support"
              variant="secondary"
              onPress={() => console.log("Contact support")}
              style={styles.supportButton}
            />
          )}

        {currentOrder.orderStatus === "delivered" && (
          <Button
            title="Place Another Order"
            onPress={() => navigation.navigate("Home")}
            style={styles.anotherOrderButton}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  orderDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  timeline: {
    marginBottom: 24,
    position: "relative",
  },
  progressBar: {
    position: "absolute",
    height: 4,
    backgroundColor: COLORS.primary,
    left: 20,
    right: 0,
    top: 18,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
  statusLabel: {
    marginLeft: 12,
    fontSize: 12,
    fontWeight: "500",
  },
  currentStatus: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  statusBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  statusMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemName: {
    fontSize: 14,
    color: COLORS.dark,
    flex: 1,
  },
  itemQty: {
    fontSize: 12,
    color: "#999",
    marginHorizontal: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  pricing: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  pricingLabel: {
    fontSize: 12,
    color: "#999",
  },
  pricingValue: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.dark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  paymentStatus: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  paymentStatusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  supportButton: {
    marginBottom: 12,
  },
  anotherOrderButton: {
    marginBottom: 40,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    textAlign: "center",
  },
});
