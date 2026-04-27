import Order, { OrderStatus, PaymentStatus } from "../models/Order";
import Cart from "../models/Cart";
import { createError } from "../utils/errors";
import mongoose from "mongoose";

interface CreateOrderData {
  deliveryAddress: string;
  customerPhone: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
}

const DELIVERY_FEE = 200; // 200 KES

export class OrderService {
  static async createOrder(userId: string, orderData: CreateOrderData) {
    // Get user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      throw createError(400, "Cart is empty");
    }

    const subtotal = cart.total;
    const deliveryFee = DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    // Create order
    const order = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      items: cart.items,
      subtotal,
      deliveryFee,
      total,
      paymentStatus: PaymentStatus.UNPAID,
      orderStatus: OrderStatus.PENDING,
      deliveryAddress: orderData.deliveryAddress,
      latitude: orderData.latitude,
      longitude: orderData.longitude,
      customerPhone: orderData.customerPhone,
      notes: orderData.notes,
    });

    await order.save();

    // Clear cart
    cart.items = [];
    cart.total = 0;
    await cart.save();

    return order;
  }

  static async getOrder(orderId: string, userId: string) {
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      throw createError(404, "Order not found");
    }
    return order;
  }

  static async getUserOrders(userId: string, limit = 10, skip = 0) {
    const orders = await Order.find({ userId })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments({ userId });

    return {
      orders,
      total,
      hasMore: skip + limit < total,
    };
  }

  static async updateOrderStatus(orderId: string, orderStatus: OrderStatus) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true },
    );
    if (!order) {
      throw createError(404, "Order not found");
    }
    return order;
  }

  static async updatePaymentStatus(
    orderId: string,
    paymentStatus: PaymentStatus,
  ) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true },
    );
    if (!order) {
      throw createError(404, "Order not found");
    }
    return order;
  }

  static async cancelOrder(orderId: string, userId: string) {
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      throw createError(404, "Order not found");
    }

    if (
      order.orderStatus === OrderStatus.DELIVERED ||
      order.orderStatus === OrderStatus.CANCELLED
    ) {
      throw createError(400, "Cannot cancel this order");
    }

    order.orderStatus = OrderStatus.CANCELLED;
    await order.save();

    return order;
  }

  static async getOrderStats(userId: string) {
    const totalOrders = await Order.countDocuments({ userId });
    const completedOrders = await Order.countDocuments({
      userId,
      orderStatus: OrderStatus.DELIVERED,
    });
    const cancelledOrders = await Order.countDocuments({
      userId,
      orderStatus: OrderStatus.CANCELLED,
    });

    return {
      totalOrders,
      completedOrders,
      cancelledOrders,
      pendingOrders: totalOrders - completedOrders - cancelledOrders,
    };
  }
}
