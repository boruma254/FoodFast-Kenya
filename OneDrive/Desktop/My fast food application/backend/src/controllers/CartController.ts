import { Response, NextFunction } from "express";
import { CartService } from "../services/CartService";
import { sendSuccess, sendError } from "../utils/responseHandler";
import { AuthRequest } from "../middlewares/auth";

export class CartController {
  static async getCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const cart = await CartService.getCart(req.userId);
      return sendSuccess(res, 200, "Cart retrieved", { cart });
    } catch (error) {
      next(error);
    }
  }

  static async addToCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const { productId, quantity = 1 } = req.body;

      if (!productId) {
        return sendError(res, 400, "Product ID is required");
      }

      const cart = await CartService.addToCart(req.userId, productId, quantity);
      return sendSuccess(res, 200, "Item added to cart", { cart });
    } catch (error) {
      next(error);
    }
  }

  static async updateCartItem(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const { productId } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity < 0) {
        return sendError(res, 400, "Valid quantity is required");
      }

      const cart = await CartService.updateCartItem(
        req.userId,
        productId,
        quantity,
      );
      return sendSuccess(res, 200, "Cart item updated", { cart });
    } catch (error) {
      next(error);
    }
  }

  static async removeFromCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const { productId } = req.params;

      const cart = await CartService.removeFromCart(req.userId, productId);
      return sendSuccess(res, 200, "Item removed from cart", { cart });
    } catch (error) {
      next(error);
    }
  }

  static async clearCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const cart = await CartService.clearCart(req.userId);
      return sendSuccess(res, 200, "Cart cleared", { cart });
    } catch (error) {
      next(error);
    }
  }
}
