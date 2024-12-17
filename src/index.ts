import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import { authenticateToken } from "./middlewares/authMiddleware";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.disable("x-powered-by");
// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use(router);
// Protected route example
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${(req as any).user.email}` });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
