import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { asyncWrapper } from "../utils/asyncWrapper";

const router = express.Router();

// User registration
router.post("/register", asyncWrapper(registerUser));

// User login
router.post("/login", asyncWrapper(loginUser));

export default router;
