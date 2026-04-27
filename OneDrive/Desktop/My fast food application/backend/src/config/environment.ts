import dotenv from "dotenv";

dotenv.config();

export const env = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGODB_URI:
    process.env.MONGODB_ATLAS_URI ||
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/fooddelivery_kenya",

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "dev_secret_key",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "dev_refresh_key",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1h",
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "7d",

  // M-Pesa
  MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY || "",
  MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET || "",
  MPESA_SHORTCODE: process.env.MPESA_SHORTCODE || "",
  MPESA_PASSKEY: process.env.MPESA_PASSKEY || "",
  MPESA_INITIATOR_USERNAME: process.env.MPESA_INITIATOR_USERNAME || "",
  MPESA_INITIATOR_PASSWORD: process.env.MPESA_INITIATOR_PASSWORD || "",
  MPESA_ENVIRONMENT: process.env.MPESA_ENVIRONMENT || "sandbox",

  // Google Maps
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "",

  // URLs
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  MOBILE_APP_URL: process.env.MOBILE_APP_URL || "",

  // Rate Limiting
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW || "15"),
  RATE_LIMIT_MAX_REQUESTS: parseInt(
    process.env.RATE_LIMIT_MAX_REQUESTS || "100",
  ),

  // Payment
  PAYMENT_CALLBACK_SECRET:
    process.env.PAYMENT_CALLBACK_SECRET || "dev_callback_secret",
};
