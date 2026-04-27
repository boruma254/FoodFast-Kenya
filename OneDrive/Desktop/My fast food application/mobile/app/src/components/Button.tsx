import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import { COLORS } from "@config/constants";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  loading = false,
  icon,
  ...props
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case "secondary":
        return COLORS.secondary;
      case "danger":
        return COLORS.danger;
      case "outline":
        return "transparent";
      default:
        return COLORS.primary;
    }
  };

  const getHeight = () => {
    switch (size) {
      case "small":
        return 36;
      case "large":
        return 56;
      default:
        return 48;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "small":
        return 13;
      case "large":
        return 16;
      default:
        return 14;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          height: getHeight(),
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: variant === "outline" ? COLORS.primary : "transparent",
        },
      ]}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? COLORS.primary : "#fff"}
          size="small"
        />
      ) : (
        <>
          {icon && icon}
          <Text
            style={[
              styles.text,
              {
                fontSize: getFontSize(),
                color: variant === "outline" ? COLORS.primary : "#fff",
              },
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  text: {
    fontWeight: "600",
    marginLeft: 8,
  },
});
