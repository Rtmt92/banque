import express from "express";
import { getAllTransactions, getTransactionById, createTransaction, updateTransactionStatus, deleteTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", getAllTransactions);  
router.get("/:id", getTransactionById); 
router.post("/", createTransaction);
router.put("/:id", updateTransactionStatus);  
router.delete("/:id", deleteTransaction);

export default router;
