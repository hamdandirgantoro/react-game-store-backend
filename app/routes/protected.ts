import express, { Request, Response } from "express";
import { authenticateJWT } from "../middlewares/auth";

const router = express.Router();

// Protected route
router.get("/protected", authenticateJWT, (req: Request, res: Response) => {
  const user = req.body.user;
  res.json({ message: "protected route.", user });
});

export default router;
