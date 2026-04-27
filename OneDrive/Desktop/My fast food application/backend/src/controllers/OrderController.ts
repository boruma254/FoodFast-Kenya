import { Response, NextFunction } from "express";
import { OrderService } from "../services/OrderService";
import { sendSuccess, sendError } from "../utils/responseHandler";
import { AuthRequest } from "../middlewares/auth";

export class OrderController {
  static async createOrder(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const { deliveryAddress, customerPhone, latitude, longitude, notes } =
        req.body;

      if (!deliveryAddress || !customerPhone) {
        return sendError(res, 400, "Delivery address and phone are required");
      }

      const order = await OrderService.createOrder(req.userId, {
        deliveryAddress,
        customerPhone,
        latitude,
        longitude,
        notes,
      });

      return sendSuccess(res, 201, "Order created successfully", { order });
    } catch (error) {
      next(error);
    }
  }

  static async getOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const { orderId } = req.params;

      const order = await OrderService.getOrder(orderId, req.userId);
      return sendSuccess(res, 200, "Order retrieved", { order });
    } catch (error) {
      next(error);
    }
  }

  static async getUserOrders(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const { limit = "10", skip = "0" } = req.query;

      const result = await OrderService.getUserOrders(
        req.userId,
        parseInt(limit as string),
        parseInt(skip as string),
      );

      return sendSuccess(res, 200, "Orders retrieved", result);
    } catch (error) {
      next(error);
    }
  }

  static async getOrderStats(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const stats = await OrderService.getOrderStats(req.userId);
      return sendSuccess(res, 200, "Stats retrieved", stats);
    } catch (error) {
      next(error);
    }
  }

  static async cancelOrder(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const { orderId } = req.params;

      const order = await OrderService.cancelOrder(orderId, req.userId);
      return sendSuccess(res, 200, "Order cancelled", { order });
    } catch (error) {
      next(error);
    }
  }
}
