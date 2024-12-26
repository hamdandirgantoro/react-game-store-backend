import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

/**
 * Check if jwt is valid and not expired
 *
 * @param {Request} req - client Request
 * @param {Response} res - response
 * @param {NextFunction} next - express next function
 * @returns {void}
 */
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Extract from user's bearer token
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Access denied. No token provided." });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: "Invalid or expired token." });
    return;
  }

  req.body.user = decoded;
  next();
};
