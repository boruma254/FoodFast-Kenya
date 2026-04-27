import { Response } from "express";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  statusCode: number;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
): Response => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    data,
    message,
    statusCode,
  });
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
): Response => {
  return sendResponse(res, statusCode, message);
};

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
): Response => {
  return sendResponse(res, statusCode, message, data);
};
