import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@config/constants";

interface ErrorDisplayProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  onDismiss,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      {onDismiss && (
        <Text style={styles.dismissText} onPress={onDismiss}>
          Dismiss
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffe0e0",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
    padding: 12,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 20,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: COLORS.danger,
    fontWeight: "500",
    marginBottom: 8,
  },
  dismissText: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: "600",
  },
});
