import express from "express";
import { handleCryptoOperation } from "../controllers/cryptoOperationController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/operation", verifyToken, handleCryptoOperation);

export default router;
