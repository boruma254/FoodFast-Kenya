// API Types
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "customer" | "admin" | "rider";
  address?: string;
  profileImage?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  availability: boolean;
  preparationTime: number;
  vendorName: string;
  featured: boolean;
  rating?: number;
  reviews?: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentStatus: "unpaid" | "pending" | "paid" | "failed";
  orderStatus:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready_for_pickup"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  deliveryAddress: string;
  latitude?: number;
  longitude?: number;
  customerPhone: string;
  notes?: string;
  mpesaTransactionId?: string;
  estimatedDeliveryTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  _id: string;
  userId: string;
  label: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  instructions?: string;
  isDefault: boolean;
}

export interface Notification {
  _id: string;
  userId: string;
  orderId?: string;
  title: string;
  message: string;
  type: "order" | "payment" | "promotion" | "system";
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  statusCode: number;
}
