import User, { UserRole } from "../models/User";
import { createError } from "../utils/errors";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export class AuthService {
  static async register(
    fullName: string,
    email: string,
    phone: string,
    password: string,
  ) {
    // Validate phone format
    const phoneRegex = /^\+254\d{9}$|^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      throw createError(
        400,
        "Invalid phone number format. Use +254XXXXXXXXX or 0XXXXXXXXX",
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      throw createError(409, "User with this email or phone already exists");
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      phone,
      password,
      role: UserRole.CUSTOMER,
    });

    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString(), user.role);

    return {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  static async login(email: string, password: string) {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Invalid email or password");
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw createError(401, "Invalid email or password");
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString(), user.role);

    return {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
        profileImage: user.profileImage,
      },
      accessToken,
      refreshToken,
    };
  }

  static async getUser(userId: string) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw createError(404, "User not found");
    }
    return user;
  }

  static async updateProfile(
    userId: string,
    updateData: Partial<{
      fullName: string;
      address: string;
      profileImage: string;
    }>,
  ) {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");
    if (!user) {
      throw createError(404, "User not found");
    }
    return user;
  }
}
