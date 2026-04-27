import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { PaymentService } from "@services/PaymentService";
import { InputField } from "@components/InputField";
import { Button } from "@components/Button";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { ErrorDisplay } from "@components/ErrorDisplay";
import { formatCurrency, formatPhoneNumber } from "@utils/helpers";
import { COLORS } from "@config/constants";

export const PaymentScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { orderId, amount } = route.params as {
    orderId: string;
    amount: number;
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isInitiating, setIsInitiating] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(
    null,
  );
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Poll for payment status every 3 seconds
  useEffect(() => {
    if (!checkoutRequestId) return;

    const interval = setInterval(async () => {
      try {
        setIsQuerying(true);
        const result =
          await PaymentService.queryTransactionStatus(checkoutRequestId);

        // Check if payment was successful
        if (result.Body?.stkCallback?.ResultCode === 0) {
          setPaymentStatus("success");
          Alert.alert(
            "Payment Successful! ✓",
            "Your order has been placed and payment confirmed.",
            [
              {
                text: "View Order",
                onPress: () => navigation.navigate("Orders"),
              },
            ],
          );
          clearInterval(interval);
        } else if (result.Body?.stkCallback?.ResultCode !== 1032) {
          // 1032 = User cancelled, keep polling
          setPaymentStatus("failed");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error querying payment:", err);
      } finally {
        setIsQuerying(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [checkoutRequestId]);

  const handleInitiatePayment = async () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    try {
      setIsInitiating(true);
      setError(null);

      const result = await PaymentService.initiateSTKPush(
        formatPhoneNumber(phoneNumber),
        amount,
        orderId,
      );

      setCheckoutRequestId(result.checkoutRequestId);
      Alert.alert(
        "M-Pesa Prompt Sent",
        "A payment prompt has been sent to your phone. Enter your M-Pesa PIN to complete payment.",
      );
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to initiate payment";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
    } finally {
      setIsInitiating(false);
    }
  };

  const handleRetry = () => {
    setCheckoutRequestId(null);
    setPaymentStatus(null);
    setError(null);
  };

  if (paymentStatus === "success") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <Text style={styles.successEmoji}>✓</Text>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successMessage}>
            Your order has been confirmed.
          </Text>

          <View style={styles.orderDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order Amount</Text>
              <Text style={styles.detailValue}>{formatCurrency(amount)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order ID</Text>
              <Text style={styles.detailValue}>{orderId.slice(-8)}</Text>
            </View>
          </View>

          <Button
            title="Track Your Order"
            onPress={() => navigation.navigate("OrderTracking", { orderId })}
            size="large"
            style={styles.trackButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>M-Pesa Payment</Text>

        {error && <ErrorDisplay message={error} />}

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount to Pay</Text>
          <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        </View>

        <InputField
          label="Phone Number *"
          placeholder="0700000000 or +254700000000"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={!isInitiating && !checkoutRequestId}
        />

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>📱 How it works:</Text>
          <Text style={styles.instructionText}>
            1. Enter your M-Pesa registered phone number
          </Text>
          <Text style={styles.instructionText}>
            2. Tap "Send Payment Request"
          </Text>
          <Text style={styles.instructionText}>
            3. You'll receive an M-Pesa prompt on your phone
          </Text>
          <Text style={styles.instructionText}>
            4. Enter your M-Pesa PIN to complete payment
          </Text>
        </View>

        {checkoutRequestId ? (
          <View style={styles.waitingContainer}>
            <View style={styles.spinner}>
              <LoadingSpinner size="small" />
            </View>
            <Text style={styles.waitingText}>
              Waiting for payment confirmation...
            </Text>
            <Text style={styles.waitingSubtext}>
              Check your phone for the M-Pesa prompt and enter your PIN
            </Text>
            <Button
              title="Cancel & Edit"
              variant="outline"
              onPress={handleRetry}
              style={styles.editButton}
            />
          </View>
        ) : (
          <Button
            title="Send Payment Request"
            onPress={handleInitiatePayment}
            loading={isInitiating}
            size="large"
            style={styles.payButton}
          />
        )}

        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>← Go Back</Text>
        </TouchableOpacity>
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
  amountCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  instructions: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
    lineHeight: 18,
  },
  waitingContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  spinner: {
    marginBottom: 16,
  },
  waitingText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 8,
  },
  waitingSubtext: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
  },
  editButton: {
    marginTop: 12,
  },
  payButton: {
    marginBottom: 24,
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  skipButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "500",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  successEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.success,
    marginBottom: 8,
    textAlign: "center",
  },
  successMessage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  orderDetails: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 32,
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: "#999",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
  },
  trackButton: {
    width: "100%",
  },
});
