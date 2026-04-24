import { create } from "zustand";

export type MenuCategory = "Burgers" | "Pizza" | "Chicken" | "Drinks";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  prepTime: string;
};

export type CartItem = MenuItem & {
  quantity: number;
};

export type OrderStatus =
  | "Placed"
  | "Accepted"
  | "Preparing"
  | "On the way"
  | "Delivered";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryAddress: string;
  specialInstructions: string;
};

export type ChatTarget = "Staff" | "Chef" | "Rider";

export type ChatMessage = {
  id: string;
  orderId: string;
  sender: "Customer" | ChatTarget;
  target: ChatTarget;
  text: string;
  time: string;
};

const STATUS_FLOW: OrderStatus[] = [
  "Placed",
  "Accepted",
  "Preparing",
  "On the way",
  "Delivered",
];

export const SAMPLE_MENU: MenuItem[] = [
  {
    id: "1",
    name: "Classic Beef Burger",
    category: "Burgers",
    price: 550,
    prepTime: "20 min",
  },
  {
    id: "2",
    name: "Spicy Chicken Burger",
    category: "Burgers",
    price: 620,
    prepTime: "22 min",
  },
  {
    id: "3",
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 1200,
    prepTime: "30 min",
  },
  {
    id: "4",
    name: "BBQ Chicken Pizza",
    category: "Pizza",
    price: 1350,
    prepTime: "32 min",
  },
  {
    id: "5",
    name: "Crispy Wings (8 pcs)",
    category: "Chicken",
    price: 780,
    prepTime: "18 min",
  },
  {
    id: "6",
    name: "Loaded Fries + Chicken",
    category: "Chicken",
    price: 890,
    prepTime: "20 min",
  },
  { id: "7", name: "Passion Juice", category: "Drinks", price: 250, prepTime: "5 min" },
  {
    id: "8",
    name: "Vanilla Milkshake",
    category: "Drinks",
    price: 350,
    prepTime: "7 min",
  },
];

type FoodStoreState = {
  cart: CartItem[];
  orders: Order[];
  deliveryAddress: string;
  mealInstructions: string;
  chatMessagesByOrder: Record<string, ChatMessage[]>;
  setDeliveryAddress: (address: string) => void;
  setMealInstructions: (instructions: string) => void;
  addToCart: (item: MenuItem) => void;
  decreaseCartItem: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  checkoutCart: () => void;
  advanceOrderStatus: (orderId: string) => void;
  clearDeliveredOrders: () => void;
  sendChatMessage: (orderId: string, target: ChatTarget, text: string) => void;
};

const getTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const useFoodStore = create<FoodStoreState>((set) => ({
  cart: [],
  orders: [],
  deliveryAddress: "",
  mealInstructions: "",
  chatMessagesByOrder: {},
  setDeliveryAddress: (address) => set({ deliveryAddress: address }),
  setMealInstructions: (instructions) => set({ mealInstructions: instructions }),
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
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
  checkoutCart: () =>
    set((state) => {
      if (state.cart.length === 0) return state;
      const hasActiveOrder = state.orders.some(
        (order) => order.status !== "Delivered"
      );
      if (hasActiveOrder) return state;

      const newOrder: Order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        items: state.cart,
        total: getTotal(state.cart),
        status: "Placed",
        createdAt: new Date().toLocaleTimeString(),
        deliveryAddress: state.deliveryAddress,
        specialInstructions: state.mealInstructions.trim(),
      };

      return {
        cart: [],
        mealInstructions: "",
        orders: [newOrder, ...state.orders],
      };
    }),
  advanceOrderStatus: (orderId) =>
    set((state) => ({
      orders: state.orders.map((order) => {
        if (order.id !== orderId) return order;
        const currentIdx = STATUS_FLOW.indexOf(order.status);
        if (currentIdx === STATUS_FLOW.length - 1) return order;
        return { ...order, status: STATUS_FLOW[currentIdx + 1] };
      }),
    })),
  clearDeliveredOrders: () =>
    set((state) => ({
      orders: state.orders.filter((order) => order.status !== "Delivered"),
    })),
  sendChatMessage: (orderId, target, text) =>
    set((state) => {
      const cleanedText = text.trim();
      if (!cleanedText) return state;

      const customerMessage: ChatMessage = {
        id: `chat-${Date.now()}`,
        orderId,
        sender: "Customer",
        target,
        text: cleanedText,
        time: new Date().toLocaleTimeString(),
      };

      const autoReply: ChatMessage = {
        id: `chat-${Date.now()}-reply`,
        orderId,
        sender: target,
        target,
        text:
          target === "Chef"
            ? "Chef here. We received your cooking instructions and will prepare it as requested."
            : target === "Rider"
              ? "Rider here. I will update you once I pick up your order."
              : "Support here. Thanks for reaching out, we are assisting you now.",
        time: new Date().toLocaleTimeString(),
      };

      const existingThread = state.chatMessagesByOrder[orderId] ?? [];

      return {
        chatMessagesByOrder: {
          ...state.chatMessagesByOrder,
          [orderId]: [...existingThread, customerMessage, autoReply],
        },
      };
    }),
}));

export const ORDER_STEPS = STATUS_FLOW;
