import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CartItem } from "@types/index";
import { formatCurrency } from "@utils/helpers";
import { COLORS } from "@config/constants";

interface CartItemComponentProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartItemComponent: React.FC<CartItemComponentProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const itemTotal = item.price * item.quantity;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name}>{item.productName}</Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
        <Text style={styles.total}>Total: {formatCurrency(itemTotal)}</Text>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.quantityControls}>
          <TouchableOpacity style={styles.quantityButton} onPress={onDecrease}>
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity style={styles.quantityButton} onPress={onIncrease}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.light,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
    marginBottom: 4,
  },
  total: {
    fontSize: 12,
    color: "#666",
  },
  rightContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.light,
    borderRadius: 6,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  quantity: {
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 6,
    color: COLORS.dark,
  },
  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  removeText: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: "500",
  },
});
