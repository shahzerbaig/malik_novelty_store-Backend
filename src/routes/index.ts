import express, { Request, Response } from "express";
import { RootFunction } from "../controllers/root";
// import { productController } from "../controllers/productController";
// import { saleController } from "../controllers/saleController";
// import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const respose = RootFunction();
  res.send({ message: respose });
});

export default router;
