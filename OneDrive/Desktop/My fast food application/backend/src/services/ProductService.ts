import Product from "../models/Product";
import { createError } from "../utils/errors";

export class ProductService {
  static async getProducts(category?: string, limit = 20, skip = 0) {
    const filter: any = { availability: true };
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ featured: -1, createdAt: -1 });

    const total = await Product.countDocuments(filter);

    return {
      products,
      total,
      hasMore: skip + limit < total,
    };
  }

  static async getFeaturedProducts(limit = 10) {
    return Product.find({ availability: true, featured: true })
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  static async getProductById(productId: string) {
    const product = await Product.findById(productId);
    if (!product) {
      throw createError(404, "Product not found");
    }
    return product;
  }

  static async searchProducts(query: string, limit = 20) {
    return Product.find(
      {
        $text: { $search: query },
        availability: true,
      },
      { score: { $meta: "textScore" } },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(limit);
  }

  static async getCategories() {
    return Product.distinct("category");
  }

  static async createProduct(productData: any) {
    const product = new Product(productData);
    await product.save();
    return product;
  }

  static async updateProduct(productId: string, updateData: any) {
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });
    if (!product) {
      throw createError(404, "Product not found");
    }
    return product;
  }
}
