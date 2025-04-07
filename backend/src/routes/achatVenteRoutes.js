import express from "express";
import { getAllAchatsVentes, getAchatVenteById, createAchatVente, updateAchatVente, deleteAchatVente } from "../controllers/achatVenteController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllAchatsVentes);  
router.get("/:id", verifyToken, getAchatVenteById);  
router.post("/", verifyToken, createAchatVente); 
router.put("/:id", verifyToken, updateAchatVente);  
router.delete("/:id", verifyToken, deleteAchatVente); 

export default router;
