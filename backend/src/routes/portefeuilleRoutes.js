import express from "express";
import { getAllPortefeuilles, getPortefeuilleById, addCryptoToPortefeuille, updatePortefeuille, deletePortefeuille, getUserPortefeuille } from "../controllers/portefeuilleController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllPortefeuilles); 
router.get("/:id", getPortefeuilleById);  
router.post("/", addCryptoToPortefeuille);  
router.put("/:id", updatePortefeuille);  
router.delete("/:id", deletePortefeuille);  
router.get("/portefeuilles/:userId", getUserPortefeuille);  // Récupérer les cryptos de l'utilisateur


export default router;
