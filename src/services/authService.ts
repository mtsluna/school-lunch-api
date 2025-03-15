import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "./userService";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
// Read token expiry from environment variables with a default of 1 hour
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "1h";

export interface TokenPayload {
  email: string;
  exp?: number; // Expiration time
}

export interface TokenResponse {
  accessToken: string;
  expiresIn: number;
}

export const generateToken = (user: User): TokenResponse => {
  // Calculate expiry time in seconds for client reference
  const expiryInSeconds = getExpirySeconds(ACCESS_TOKEN_EXPIRY);

  // Calculate expiry timestamp
  const expiryTimestamp = Math.floor(Date.now() / 1000) + expiryInSeconds;

  const payload: TokenPayload = {
    email: user.email,
    exp: expiryTimestamp, // Add expiration time to payload
  };

  // Generate access token
  const accessToken = jwt.sign(payload, JWT_SECRET);

  return {
    accessToken,
    expiresIn: expiryInSeconds,
  };
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

// Helper function to convert time string (e.g., '15m', '1h', '7d') to seconds
const getExpirySeconds = (expiryString: string): number => {
  const unit = expiryString.slice(-1);
  const value = parseInt(expiryString.slice(0, -1));

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      return 3600; // Default to 1 hour (3600 seconds)
  }
};
