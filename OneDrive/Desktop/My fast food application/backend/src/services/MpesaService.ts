import axios from "axios";
import { env } from "../config/environment";
import Payment, { IPayment } from "../models/Payment";
import Order, { PaymentStatus } from "../models/Order";
import { createError } from "../utils/errors";

export class MpesaService {
  private static readonly SANDBOX_URL = "https://sandbox.safaricom.co.ke";
  private static readonly PRODUCTION_URL = "https://api.safaricom.co.ke";

  private static getBaseUrl() {
    return env.MPESA_ENVIRONMENT === "production"
      ? this.PRODUCTION_URL
      : this.SANDBOX_URL;
  }

  /**
   * Get M-Pesa access token
   */
  static async getAccessToken(): Promise<string> {
    try {
      const auth = Buffer.from(
        `${env.MPESA_CONSUMER_KEY}:${env.MPESA_CONSUMER_SECRET}`,
      ).toString("base64");

      const response = await axios.get(
        `${this.getBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        },
      );

      return response.data.access_token;
    } catch (error) {
      console.error("Error getting M-Pesa token:", error);
      throw createError(500, "Failed to get payment authorization");
    }
  }

  /**
   * Initiate M-Pesa STK Push
   */
  static async initiateSTKPush(
    phoneNumber: string,
    amount: number,
    orderId: string,
    userId: string,
  ) {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = new Date()
        .toISOString()
        .replace(/[^0-9]/g, "")
        .slice(0, -3);

      // Format phone number to international format
      const formattedPhone = phoneNumber.startsWith("+")
        ? phoneNumber
        : `+254${phoneNumber.substring(1)}`;

      const password = Buffer.from(
        `${env.MPESA_SHORTCODE}${env.MPESA_PASSKEY}${timestamp}`,
      ).toString("base64");

      const payload = {
        BusinessShortCode: env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amount),
        PartyA: formattedPhone,
        PartyB: env.MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: `${env.FRONTEND_URL}/api/payments/callback`,
        AccountReference: `ORDER-${orderId}`,
        TransactionDesc: `Food Delivery Order ${orderId}`,
      };

      const response = await axios.post(
        `${this.getBaseUrl()}/mpesa/stkpush/v1/processrequest`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      // Save payment record
      const payment = new Payment({
        orderId,
        userId,
        amount,
        paymentMethod: "mpesa",
        paymentStatus: PaymentStatus.PENDING,
        mpesaPhone: formattedPhone,
        mpesaCheckoutRequestId: response.data.CheckoutRequestID,
      });

      await payment.save();

      return {
        checkoutRequestId: response.data.CheckoutRequestID,
        responseCode: response.data.ResponseCode,
        responseDescription: response.data.ResponseDescription,
        customerMessage: response.data.CustomerMessage,
      };
    } catch (error: any) {
      console.error("Error initiating STK Push:", error);
      throw createError(
        500,
        error.response?.data?.errorMessage || "Failed to initiate payment",
      );
    }
  }

  /**
   * Query M-Pesa transaction status
   */
  static async queryTransactionStatus(checkoutRequestId: string) {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = new Date()
        .toISOString()
        .replace(/[^0-9]/g, "")
        .slice(0, -3);

      const password = Buffer.from(
        `${env.MPESA_SHORTCODE}${env.MPESA_PASSKEY}${timestamp}`,
      ).toString("base64");

      const payload = {
        BusinessShortCode: env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      };

      const response = await axios.post(
        `${this.getBaseUrl()}/mpesa/stkpushquery/v1/query`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error querying transaction:", error);
      throw createError(500, "Failed to query transaction status");
    }
  }

  /**
   * Handle M-Pesa callback
   */
  static async handleCallback(callbackData: any) {
    try {
      const result = callbackData.Body?.stkCallback;

      if (!result) {
        throw createError(400, "Invalid callback data");
      }

      const checkoutRequestId = result.CheckoutRequestID;
      const resultCode = result.ResultCode;
      const transactionId = result.CallbackMetadata?.Item?.find(
        (item: any) => item.Name === "MpesaReceiptNumber",
      )?.Value;

      // Update payment record
      const payment = await Payment.findOne({
        mpesaCheckoutRequestId: checkoutRequestId,
      });

      if (!payment) {
        throw createError(404, "Payment record not found");
      }

      if (resultCode === 0) {
        // Payment successful
        payment.paymentStatus = PaymentStatus.PAID;
        payment.mpesaTransactionId = transactionId;
        payment.resultCode = resultCode;
        payment.resultDesc = "Success";

        // Update order payment status
        await Order.findByIdAndUpdate(payment.orderId, {
          paymentStatus: PaymentStatus.PAID,
          mpesaTransactionId: transactionId,
          orderStatus: "confirmed",
        });
      } else {
        // Payment failed
        payment.paymentStatus = PaymentStatus.FAILED;
        payment.resultCode = resultCode;
        payment.resultDesc = result.ResultDesc || "Payment failed";

        // Update order payment status
        await Order.findByIdAndUpdate(payment.orderId, {
          paymentStatus: PaymentStatus.FAILED,
        });
      }

      await payment.save();
      return payment;
    } catch (error) {
      console.error("Error handling callback:", error);
      throw error;
    }
  }

  /**
   * Verify callback signature
   */
  static verifyCallbackSignature(
    callbackData: string,
    signature: string,
  ): boolean {
    // In production, implement actual signature verification
    // This is a placeholder for security implementation
    return true;
  }
}
