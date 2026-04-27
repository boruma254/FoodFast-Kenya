import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { sendSuccess, sendError } from "../utils/responseHandler";
import { AuthRequest } from "../middlewares/auth";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, email, phone, password } = req.body;

      if (!fullName || !email || !phone || !password) {
        return sendError(res, 400, "Missing required fields");
      }

      const result = await AuthService.register(
        fullName,
        email,
        phone,
        password,
      );
      return sendSuccess(res, 201, "User registered successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return sendError(res, 400, "Email and password are required");
      }

      const result = await AuthService.login(email, password);
      return sendSuccess(res, 200, "Login successful", result);
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const user = await AuthService.getUser(req.userId);
      return sendSuccess(res, 200, "Profile retrieved", user);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        return sendError(res, 401, "Unauthorized");
      }

      const { fullName, address, profileImage } = req.body;
      const updateData: any = {};

      if (fullName) updateData.fullName = fullName;
      if (address) updateData.address = address;
      if (profileImage) updateData.profileImage = profileImage;

      const user = await AuthService.updateProfile(req.userId, updateData);
      return sendSuccess(res, 200, "Profile updated successfully", user);
    } catch (error) {
      next(error);
    }
  }
}
