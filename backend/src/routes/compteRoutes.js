import express from "express";
import { getAllComptes, getCompteById, createCompte, updateCompte, deleteCompte, getComptesByUtilisateur } from "../controllers/compteController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllComptes);  
router.get("/:id", verifyToken, getCompteById); 
router.post("/", verifyToken, createCompte);
router.put("/:id", verifyToken, updateCompte);
router.delete("/:id", verifyToken, deleteCompte);


export default router;





