import express from "express";
import { getAllTransactions, getTransactionById, createTransaction, updateTransactionStatus, deleteTransaction, getTransactionsByCompteId, effectuerVirement  } from "../controllers/transactionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllTransactions);  
router.get("/:id", verifyToken, getTransactionById); 
router.get("/compte/:compteId", verifyToken, getTransactionsByCompteId);
router.post("/", verifyToken, createTransaction);
router.post("/virement", verifyToken, effectuerVirement);
router.put("/:id", verifyToken, updateTransactionStatus);  
router.delete("/:id", verifyToken, deleteTransaction);

export default router;
