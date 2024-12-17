import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/user";
import { User } from "../types/User";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password }: User = req.body;

  // Check if user already exists
  if (findUserByEmail(email)) {
    res.status(400).json({ message: "User already exists" });
    return; // Ensure function terminates here after sending the response
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user
  createUser({ email, password: hashedPassword });

  // Send success response
  res.status(201).json({ message: "User registered successfully" });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: User = req.body;
    const user = findUserByEmail(email);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return; // Ensure the function exits here
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return; // Ensure the function exits here
    }

    // Generate JWT
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
