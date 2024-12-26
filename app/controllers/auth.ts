import { Request, Response } from "express";
import { myDataSource } from "../config/database";
import { User } from "../models/user";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

/**
 * Register the user data into database.
 *
 * @param req - client Request
 * @param res - Response
 */
const register = async (req: Request, res: Response) => {
  try {
    const data = req.body as User;
    data.password = (await hashPassword(data.password)) as string;
    const user = await myDataSource.getRepository(User).create(data);
    const results = await myDataSource.getRepository(User).save(user);
    res.status(200).json({
      firstName: results.firstName,
      lastName: results.lastName,
      fullName: `${results.firstName} ${results.lastName}`,
      email: results.email,
    });
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ message: "This email is already taken." });
    } else {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 * Login the user if the email and password matched with the corresponding data in the database.
 *
 * @param req - client Request
 * @param res - Response
 */
const login = async (req: Request, res: Response) => {
  const data = req.body as User;
  const user = await myDataSource
    .getRepository(User)
    .findOneOrFail({ where: { email: data.email } });

  if (
    data.email === user.email &&
    (await verifyPassword(data.password, user.password))
  ) {
    const token = generateToken({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    res.json({
      message: "Login successful.",
      token,
    });
  } else {
    res.status(401).json({ message: "Invalid credentials." });
  }
};

export { register, login };
