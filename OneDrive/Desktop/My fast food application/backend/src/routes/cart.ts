import { Router } from "express";
import { CartController } from "../controllers/CartController";
import { authMiddleware } from "../middlewares/auth";

const cartRouter = Router();

cartRouter.use(authMiddleware);

cartRouter.get("/", CartController.getCart);
cartRouter.post("/add", CartController.addToCart);
cartRouter.put("/:productId", CartController.updateCartItem);
cartRouter.delete("/:productId", CartController.removeFromCart);
cartRouter.delete("/", CartController.clearCart);

export default cartRouter;
