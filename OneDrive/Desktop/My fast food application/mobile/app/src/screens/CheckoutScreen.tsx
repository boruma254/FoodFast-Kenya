import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Text,
} from "react-native";
import { useOrderStore } from "@store/orderStore";
import { useLocation, useReverseGeocoding } from "@hooks/useLocation";
import { InputField } from "@components/InputField";
import { Button } from "@components/Button";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { ErrorDisplay } from "@components/ErrorDisplay";
import { formatCurrency } from "@utils/helpers";
import { COLORS, DELIVERY_FEE } from "@config/constants";

export const CheckoutScreen = ({ navigation }: any) => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const createOrder = useOrderStore((state) => state.createOrder);
  const isLoading = useOrderStore((state) => state.isLoading);
  const error = useOrderStore((state) => state.error);

  const handleGetCurrentLocation = async () => {
    try {
      setIsGettingLocation(true);
      const loc = await useLocation();
      setLocation(loc);

      // Optional: Get address from coordinates
      const address = await useReverseGeocoding(loc.latitude, loc.longitude);
      setDeliveryAddress(address);
    } catch (error: any) {
      Alert.alert(
        "Error",
        "Could not get your location. Please enter address manually.",
      );
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleCheckout = async () => {
    // Validation
    if (!deliveryAddress.trim()) {
      Alert.alert("Error", "Please enter delivery address");
      return;
    }

    if (!phone.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    try {
      const order = await createOrder(
        deliveryAddress,
        phone,
        location?.latitude,
        location?.longitude,
        notes,
      );

      // Navigate to payment
      navigation.navigate("Payment", {
        orderId: order._id,
        amount: order.total,
      });
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const subtotal = 5000; // This should come from cart
  const deliveryFee = DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Delivery Details</Text>

        {error && <ErrorDisplay message={error} />}

        <InputField
          label="Delivery Address *"
          placeholder="Enter your delivery address"
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
          multiline
          editable={!isLoading && !isGettingLocation}
        />

        <Button
          title={
            isGettingLocation ? "Getting Location..." : "Use Current Location"
          }
          variant="outline"
          onPress={handleGetCurrentLocation}
          loading={isGettingLocation}
          style={styles.locationButton}
        />

        <InputField
          label="Phone Number *"
          placeholder="0700000000"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          editable={!isLoading}
        />

        <InputField
          label="Delivery Instructions (Optional)"
          placeholder="Gate code, apartment number, etc."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          editable={!isLoading}
        />

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

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
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>

          <Text style={styles.paymentNote}>
            💳 You'll pay with M-Pesa on the next screen
          </Text>
        </View>

        <Button
          title="Continue to Payment"
          onPress={handleCheckout}
          loading={isLoading}
          size="large"
          style={styles.proceedButton}
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
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 20,
  },
  locationButton: {
    marginBottom: 16,
  },
  summary: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
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
  paymentNote: {
    fontSize: 12,
    color: "#666",
    marginTop: 12,
    fontStyle: "italic",
  },
  proceedButton: {
    marginBottom: 40,
  },
});
