import express from "express";
import {   getAllPortefeuilles, getPortefeuilleById, addCryptoToPortefeuille, updatePortefeuille, deletePortefeuille, } from "../controllers/portefeuilleController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllPortefeuilles); 
router.get("/:id", getPortefeuilleById);  
router.post("/", addCryptoToPortefeuille);  
router.put("/:id", updatePortefeuille);  
router.delete("/:id", deletePortefeuille);  



export default router;
