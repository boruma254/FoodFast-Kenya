import { apiClient } from "./apiClient";
import { ApiResponse } from "@types/index";

export const PaymentService = {
  async initiateSTKPush(phoneNumber: string, amount: number, orderId: string) {
    const response = await apiClient.post<ApiResponse<any>>(
      "/payments/initiate-stk",
      {
        phoneNumber,
        amount,
        orderId,
      },
    );
    return response.data!;
  },

  async queryTransactionStatus(checkoutRequestId: string) {
    const response = await apiClient.get<ApiResponse<any>>(
      "/payments/query-status",
      {
        params: { checkoutRequestId },
      },
    );
    return response.data!;
  },
};
