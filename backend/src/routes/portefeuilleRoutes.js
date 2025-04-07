import express from "express";
import { getAllPortefeuilles, getPortefeuilleById, addCryptoToPortefeuille, updatePortefeuille, deletePortefeuille } from "../controllers/portefeuilleController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllPortefeuilles); 
router.get("/:id", verifyToken, getPortefeuilleById);  
router.post("/", verifyToken, addCryptoToPortefeuille);  
router.put("/:id", verifyToken, updatePortefeuille);  
router.delete("/:id", verifyToken, deletePortefeuille);  

export default router;
