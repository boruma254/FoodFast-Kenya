import { Response, NextFunction, Request } from "express";
import { MpesaService } from "../services/MpesaService";
import { sendSuccess, sendError } from "../utils/responseHandler";
import { AuthRequest } from "../middlewares/auth";
import { env } from "../config/environment";

export class PaymentController {
  static async initiateSTKPush(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const { phoneNumber, amount, orderId } = req.body;

      if (!phoneNumber || !amount || !orderId) {
        return sendError(
          res,
          400,
          "Phone number, amount, and order ID are required",
        );
      }

      const result = await MpesaService.initiateSTKPush(
        phoneNumber,
        amount,
        orderId,
        req.userId,
      );

      return sendSuccess(res, 200, "STK Push initiated", result);
    } catch (error) {
      next(error);
    }
  }

  static async queryTransactionStatus(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const { checkoutRequestId } = req.query;

      if (!checkoutRequestId) {
        return sendError(res, 400, "Checkout request ID is required");
      }

      const result = await MpesaService.queryTransactionStatus(
        checkoutRequestId as string,
      );

      return sendSuccess(res, 200, "Transaction status retrieved", result);
    } catch (error) {
      next(error);
    }
  }

  static async handleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const callbackData = req.body;

      // Verify signature (implement in production)
      const signature = req.headers["x-daraja-signature"] as string;
      // const isValid = MpesaService.verifyCallbackSignature(JSON.stringify(callbackData), signature);

      const payment = await MpesaService.handleCallback(callbackData);

      // Acknowledge receipt
      return sendSuccess(res, 200, "Callback received", { payment });
    } catch (error) {
      next(error);
    }
  }
}
