import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRouter = Router();

productRouter.get("/", ProductController.getProducts);
productRouter.get("/featured", ProductController.getFeaturedProducts);
productRouter.get("/search", ProductController.searchProducts);
productRouter.get("/categories", ProductController.getCategories);
productRouter.get("/:productId", ProductController.getProductById);

export default productRouter;
