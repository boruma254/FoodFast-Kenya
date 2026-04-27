import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController";
import { authMiddleware } from "../middlewares/auth";

const paymentRouter = Router();

paymentRouter.post(
  "/initiate-stk",
  authMiddleware,
  PaymentController.initiateSTKPush,
);
paymentRouter.get(
  "/query-status",
  authMiddleware,
  PaymentController.queryTransactionStatus,
);
paymentRouter.post("/callback", PaymentController.handleCallback);

export default paymentRouter;
