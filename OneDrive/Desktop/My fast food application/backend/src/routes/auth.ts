import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/auth";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/profile", authMiddleware, AuthController.getProfile);
authRouter.put("/profile", authMiddleware, AuthController.updateProfile);

export default authRouter;
