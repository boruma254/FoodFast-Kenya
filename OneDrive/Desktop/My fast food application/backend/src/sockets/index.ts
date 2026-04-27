import { Server } from "socket.io";
import { verifyAccessToken } from "../utils/jwt";

export const setupSocketIO = (io: Server) => {
  // Store active connections
  const userConnections: { [key: string]: string } = {}; // userId -> socketId
  const riderConnections: { [key: string]: string } = {}; // riderId -> socketId

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins a room
    socket.on("auth", (token: string) => {
      try {
        const decoded = verifyAccessToken(token);
        const userId = decoded.userId;
        const role = decoded.role;

        userConnections[userId] = socket.id;
        socket.join(`user:${userId}`);
        socket.join(`role:${role}`);

        console.log(`User ${userId} authenticated`);
      } catch (error) {
        console.error("Socket auth failed:", error);
        socket.emit("auth_error", "Authentication failed");
      }
    });

    // Order status update listener
    socket.on("subscribe_order", (orderId: string) => {
      socket.join(`order:${orderId}`);
      console.log(`Subscribed to order: ${orderId}`);
    });

    // Rider location update
    socket.on(
      "rider_location_update",
      (data: {
        riderId: string;
        orderId: string;
        latitude: number;
        longitude: number;
      }) => {
        io.to(`order:${data.orderId}`).emit("rider_location_changed", {
          riderId: data.riderId,
          latitude: data.latitude,
          longitude: data.longitude,
          timestamp: new Date(),
        });
      },
    );

    // Order status changed
    socket.on(
      "order_status_changed",
      (data: { orderId: string; status: string; timestamp: Date }) => {
        io.to(`order:${data.orderId}`).emit("order_status_changed", data);
      },
    );

    // Payment status changed
    socket.on(
      "payment_status_changed",
      (data: { orderId: string; status: string; timestamp: Date }) => {
        io.to(`order:${data.orderId}`).emit("payment_status_changed", data);
      },
    );

    // Send notification
    socket.on(
      "send_notification",
      (data: {
        userId: string;
        title: string;
        message: string;
        type: string;
      }) => {
        io.to(`user:${data.userId}`).emit("new_notification", data);
      },
    );

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Clean up user connection
      Object.keys(userConnections).forEach((userId) => {
        if (userConnections[userId] === socket.id) {
          delete userConnections[userId];
        }
      });
    });
  });

  console.log("Socket.IO initialized");
};
