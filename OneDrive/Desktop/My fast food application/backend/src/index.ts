import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import { connectDatabase } from "./config/database";
import { setupRoutes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import { setupSocketIO } from "./sockets";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      process.env.MOBILE_APP_URL || "",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      process.env.MOBILE_APP_URL || "",
    ],
    credentials: true,
  }),
);

// Body Parser Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Request Logger
app.use(requestLogger);

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Setup Routes
setupRoutes(app);

// Setup Socket.IO
setupSocketIO(io);

// Error Handler (must be last)
app.use(errorHandler);

// Connect to Database and Start Server
const PORT = process.env.PORT || 5000;

connectDatabase().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  });
});

export { app, io };
