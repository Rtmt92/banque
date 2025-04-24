import express from "express";
import { getAllCryptos, getCryptoById, createCrypto, updateCrypto, deleteCrypto } from "../controllers/cryptoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllCryptos);  
router.get("/:id",verifyToken, getCryptoById);  
router.post("/",verifyToken, createCrypto); 
router.put("/:id",verifyToken, updateCrypto);  
router.delete("/:id",verifyToken, deleteCrypto);  


export default router;
