import { Express } from "express";
import authRouter from "./auth";
import productRouter from "./products";
import cartRouter from "./cart";
import orderRouter from "./orders";
import paymentRouter from "./payments";

export const setupRoutes = (app: Express) => {
  app.use("/api/auth", authRouter);
  app.use("/api/products", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/payments", paymentRouter);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
      statusCode: 404,
    });
  });
};
