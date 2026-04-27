import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// 375 is the most common iPhone design width; scaling from it works well for Android too.
const BASE_WIDTH = 375;
const scale = SCREEN_WIDTH / BASE_WIDTH;

export const ms = (size: number) => {
  const next = size * scale;
  // Round to nearest pixel for crisp text/layout.
  return PixelRatio.roundToNearestPixel(next);
};

export const colors = {
  bg: "#E5E7EB",
  surface: "#F3F4F6",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#4B5563",
  subtle: "#6B7280",
  border: "#E5E7EB",
  borderStrong: "#D1D5DB",
  brand: "#08A045",
  brandDark: "#047857",
  success: "#16A34A",
  danger: "#EF4444",
  warning: "#EAB308",
  white: "#FFFFFF",
} as const;

export const spacing = {
  xs: ms(6),
  sm: ms(10),
  md: ms(14),
  lg: ms(18),
  xl: ms(24),
  xxl: ms(32),
} as const;

export const radius = {
  sm: ms(10),
  md: ms(14),
  lg: ms(18),
  xl: ms(24),
  pill: 999,
} as const;

export const type = {
  // Headings
  h1: ms(34),
  h2: ms(26),
  h3: ms(20),
  // Body
  body: ms(16),
  bodySm: ms(14),
  caption: ms(12),
} as const;

export const shadow = {
  card: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
} as const;

