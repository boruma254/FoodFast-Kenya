import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { authMiddleware } from "../middlewares/auth";

const orderRouter = Router();

orderRouter.use(authMiddleware);

orderRouter.post("/", OrderController.createOrder);
orderRouter.get("/stats", OrderController.getOrderStats);
orderRouter.get("/", OrderController.getUserOrders);
orderRouter.get("/:orderId", OrderController.getOrder);
orderRouter.put("/:orderId/cancel", OrderController.cancelOrder);

export default orderRouter;
