import jwt from "jsonwebtoken";
import { env } from "../config/environment";

export interface TokenPayload {
  userId: string;
  role: string;
}

export const generateAccessToken = (userId: string, role: string): string => {
  return jwt.sign(
    { userId, role },
    env.JWT_SECRET as string,
    { expiresIn: env.JWT_EXPIRY } as any,
  );
};

export const generateRefreshToken = (userId: string, role: string): string => {
  return jwt.sign(
    { userId, role },
    env.JWT_REFRESH_SECRET as string,
    { expiresIn: env.JWT_REFRESH_EXPIRY } as any,
  );
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};
