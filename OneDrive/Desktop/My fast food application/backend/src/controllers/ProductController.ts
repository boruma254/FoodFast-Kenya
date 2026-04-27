import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/ProductService";
import { sendSuccess, sendError } from "../utils/responseHandler";

export class ProductController {
  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, limit = "20", skip = "0" } = req.query;

      const result = await ProductService.getProducts(
        category as string | undefined,
        parseInt(limit as string),
        parseInt(skip as string),
      );

      return sendSuccess(res, 200, "Products retrieved", result);
    } catch (error) {
      next(error);
    }
  }

  static async getFeaturedProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { limit = "10" } = req.query;

      const products = await ProductService.getFeaturedProducts(
        parseInt(limit as string),
      );

      return sendSuccess(res, 200, "Featured products retrieved", { products });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;

      const product = await ProductService.getProductById(productId);

      return sendSuccess(res, 200, "Product retrieved", { product });
    } catch (error) {
      next(error);
    }
  }

  static async searchProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { q, limit = "20" } = req.query;

      if (!q) {
        return sendError(res, 400, "Search query is required");
      }

      const products = await ProductService.searchProducts(
        q as string,
        parseInt(limit as string),
      );

      return sendSuccess(res, 200, "Products found", { products });
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await ProductService.getCategories();
      return sendSuccess(res, 200, "Categories retrieved", { categories });
    } catch (error) {
      next(error);
    }
  }
}
