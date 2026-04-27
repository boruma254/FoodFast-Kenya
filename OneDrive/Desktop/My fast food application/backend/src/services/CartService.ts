import Cart, { ICart } from "../models/Cart";
import Product from "../models/Product";
import { createError } from "../utils/errors";

export class CartService {
  static async getCart(userId: string) {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
      await cart.save();
    }
    return cart;
  }

  static async addToCart(
    userId: string,
    productId: string,
    quantity: number = 1,
  ) {
    const product = await Product.findById(productId);
    if (!product) {
      throw createError(404, "Product not found");
    }

    if (!product.availability) {
      throw createError(400, "Product is not available");
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: product._id,
        productName: product.name,
        quantity,
        price: product.price,
        image: product.image,
      });
    }

    this.calculateCartTotal(cart);
    await cart.save();

    return cart;
  }

  static async updateCartItem(
    userId: string,
    productId: string,
    quantity: number,
  ) {
    if (quantity <= 0) {
      return this.removeFromCart(userId, productId);
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw createError(404, "Cart not found");
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (!item) {
      throw createError(404, "Item not in cart");
    }

    item.quantity = quantity;
    this.calculateCartTotal(cart);
    await cart.save();

    return cart;
  }

  static async removeFromCart(userId: string, productId: string) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw createError(404, "Cart not found");
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );
    this.calculateCartTotal(cart);
    await cart.save();

    return cart;
  }

  static async clearCart(userId: string) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw createError(404, "Cart not found");
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    return cart;
  }

  private static calculateCartTotal(cart: ICart) {
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }
}
