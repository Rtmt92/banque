import express from "express";
import { getAllCryptos, getCryptoById, createCrypto, updateCrypto, deleteCrypto } from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/", getAllCryptos);  
router.get("/:id", getCryptoById);  
router.post("/", createCrypto); 
router.put("/:id", updateCrypto);  
router.delete("/:id", deleteCrypto);  

export default router;
