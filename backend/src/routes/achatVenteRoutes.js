import express from "express";
import { getAllAchatsVentes, getAchatVenteById, createAchatVente, updateAchatVente, deleteAchatVente, getAchatVenteByCompte } from "../controllers/achatVenteController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllAchatsVentes); 
router.get("/compte/:compteId", verifyToken, getAchatVenteByCompte); 
router.get("/:id", verifyToken, getAchatVenteById);  
router.post("/", verifyToken, createAchatVente); 
router.put("/:id", verifyToken, updateAchatVente);  
router.delete("/:id", verifyToken, deleteAchatVente); 

export default router;
