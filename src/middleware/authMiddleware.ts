import { NextFunction, Request, Response } from "express";
import { TokenPayload, verifyToken } from "../services/authService";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

const EXCLUDED_ROUTES = [/^\/api\/auth\//, /^\/webhook\//];

export const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (EXCLUDED_ROUTES.some((route) => route.test(req.path))) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN format

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
