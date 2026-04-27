import { create } from "zustand";

export type MenuCategory = "Burgers" | "Pizza" | "Wings";

export type MenuItem = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  category: MenuCategory;
  price: number;
  prepTime: string;
  description: string;
  image: string;
};

export type CartItem = MenuItem & {
  quantity: number;
};

export type OrderStatus = "Preparing" | "On the Way" | "Delivered";

export type Order = {
  id: string;
  restaurantName: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  status: OrderStatus;
  createdAt: string;
  deliveryAddress: string;
};

export const SAMPLE_MENU: MenuItem[] = [
  {
    id: "1",
    restaurantId: "1",
    restaurantName: "Burger Palace",
    name: "Classic Burger",
    category: "Burgers",
    price: 12.99,
    prepTime: "20-30 min",
    description: "Beef patty, lettuce, tomato, cheese, special sauce",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "2",
    restaurantId: "1",
    restaurantName: "Burger Palace",
    name: "Bacon Cheeseburger",
    category: "Burgers",
    price: 15.99,
    prepTime: "20-30 min",
    description: "Double beef, crispy bacon, cheddar cheese",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "3",
    restaurantId: "1",
    restaurantName: "Burger Palace",
    name: "Veggie Burger",
    category: "Burgers",
    price: 11.99,
    prepTime: "18-25 min",
    description: "Plant-based patty, avocado, sprouts",
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "4",
    restaurantId: "1",
    restaurantName: "Burger Palace",
    name: "Chicken Wings",
    category: "Wings",
    price: 9.99,
    prepTime: "18-25 min",
    description: "6 pieces with buffalo or BBQ sauce",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80",
  },
];

export const RESTAURANT_MENUS: Record<string, MenuItem[]> = {
  "1": [
    { id: "1-1", restaurantId: "1", restaurantName: "Burger Palace", name: "Classic Burger", category: "Burgers", price: 12.99, prepTime: "20-30 min", description: "Beef patty, lettuce, tomato, cheese, special sauce", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80" },
    { id: "1-2", restaurantId: "1", restaurantName: "Burger Palace", name: "Bacon Cheeseburger", category: "Burgers", price: 15.99, prepTime: "20-30 min", description: "Double beef, crispy bacon, cheddar cheese", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80" },
    { id: "1-3", restaurantId: "1", restaurantName: "Burger Palace", name: "Veggie Supreme", category: "Burgers", price: 15.99, prepTime: "18-25 min", description: "Plant-based patty, avocado and signature sauce", image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=700&q=80" },
  ],
  "2": [
    { id: "2-1", restaurantId: "2", restaurantName: "Pizza Express", name: "Margherita Pizza", category: "Pizza", price: 13.99, prepTime: "24-34 min", description: "Fresh mozzarella, tomato sauce, basil", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80" },
    { id: "2-2", restaurantId: "2", restaurantName: "Pizza Express", name: "Pepperoni Pizza", category: "Pizza", price: 16.49, prepTime: "25-35 min", description: "Pepperoni, mozzarella, oregano", image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?auto=format&fit=crop&w=700&q=80" },
    { id: "2-3", restaurantId: "2", restaurantName: "Pizza Express", name: "BBQ Chicken Pizza", category: "Pizza", price: 17.25, prepTime: "28-38 min", description: "Chicken, BBQ sauce, onion, cheese", image: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=700&q=80" },
  ],
  "3": [
    { id: "3-1", restaurantId: "3", restaurantName: "Sushi House", name: "Salmon Nigiri", category: "Wings", price: 14.5, prepTime: "20-28 min", description: "Fresh salmon over seasoned sushi rice", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80" },
    { id: "3-2", restaurantId: "3", restaurantName: "Sushi House", name: "California Roll", category: "Wings", price: 12.99, prepTime: "18-25 min", description: "Crab, avocado, cucumber, sesame", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=700&q=80" },
    { id: "3-3", restaurantId: "3", restaurantName: "Sushi House", name: "Tempura Shrimp Roll", category: "Wings", price: 15.49, prepTime: "22-30 min", description: "Crispy shrimp roll with house mayo", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=700&q=80" },
  ],
};

type FoodStoreState = {
  cart: CartItem[];
  orders: Order[];
  deliveryAddress: string;
  addToCart: (item: MenuItem) => void;
  decreaseCartItem: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setDeliveryAddress: (address: string) => void;
  checkoutCart: () => Order | null;
  advanceOrderStatus: (orderId: string) => void;
};

const DELIVERY_FEE = 2.99;
const TAX_RATE = 0.08;

const getSubtotal = (items: CartItem[]) =>
  Number(items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));

const nextStatus = (status: OrderStatus): OrderStatus => {
  if (status === "Preparing") return "On the Way";
  if (status === "On the Way") return "Delivered";
  return "Delivered";
};

export const useFoodStore = create<FoodStoreState>((set, get) => ({
  cart: [],
  orders: [],
  deliveryAddress: "123 Main St, New York",
  setDeliveryAddress: (address) => set({ deliveryAddress: address }),
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  decreaseCartItem: (itemId) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
  clearCart: () => set({ cart: [] }),
  checkoutCart: () => {
    const { cart, orders, deliveryAddress } = get();
    if (cart.length === 0) return null;

    const subtotal = getSubtotal(cart);
    const tax = Number((subtotal * TAX_RATE).toFixed(2));
    const total = Number((subtotal + DELIVERY_FEE + tax).toFixed(2));

    const order: Order = {
      id: `ORD${Date.now().toString().slice(-6)}`,
      restaurantName: cart[0]?.restaurantName ?? "Restaurant",
      items: cart,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      tax,
      total,
      status: "Preparing",
      createdAt: new Date().toLocaleTimeString(),
      deliveryAddress,
    };

    set({ orders: [order, ...orders], cart: [] });
    return order;
  },
  advanceOrderStatus: (orderId) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status: nextStatus(order.status) } : order
      ),
    })),
}));
