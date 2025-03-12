import express from "express";
import { getAllAchatsVentes, getAchatVenteById, createAchatVente, updateAchatVente, deleteAchatVente } from "../controllers/achatVenteController.js";

const router = express.Router();

router.get("/", getAllAchatsVentes);  
router.get("/:id", getAchatVenteById);  
router.post("/", createAchatVente); 
router.put("/:id", updateAchatVente);  
router.delete("/:id", deleteAchatVente); 

export default router;
