import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Order } from "@types/index";
import {
  formatCurrency,
  getOrderStatusLabel,
  getTimeAgo,
} from "@utils/helpers";
import { COLORS } from "@config/constants";

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return COLORS.warning;
      case "confirmed":
        return COLORS.primary;
      case "preparing":
        return COLORS.primary;
      case "ready_for_pickup":
        return COLORS.warning;
      case "out_for_delivery":
        return "#3498db";
      case "delivered":
        return COLORS.success;
      case "cancelled":
        return COLORS.danger;
      default:
        return "#999";
    }
  };

  return (
    <View
      style={[
        styles.container,
        { borderLeftColor: getStatusColor(order.orderStatus) },
      ]}
      onLongPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.orderId}>
          Order #{order._id.slice(-6).toUpperCase()}
        </Text>
        <Text style={styles.date}>{getTimeAgo(order.createdAt)}</Text>
      </View>

      <View style={styles.status}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(order.orderStatus) },
          ]}
        >
          <Text style={styles.statusText}>
            {getOrderStatusLabel(order.orderStatus)}
          </Text>
        </View>
        <View
          style={[
            styles.paymentBadge,
            {
              backgroundColor:
                order.paymentStatus === "paid"
                  ? COLORS.success
                  : COLORS.warning,
            },
          ]}
        >
          <Text style={styles.paymentText}>
            {order.paymentStatus === "paid" ? "✓ Paid" : "⏳ Pending"}
          </Text>
        </View>
      </View>

      <Text style={styles.itemCount}>
        {order.items.length} item{order.items.length > 1 ? "s" : ""}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalAmount}>{formatCurrency(order.total)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  status: {
    flexDirection: "row",
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  paymentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  paymentText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  itemCount: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 12,
    color: "#999",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
