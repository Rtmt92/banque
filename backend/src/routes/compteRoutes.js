import express from "express";
import { getAllComptes, getCompteById, createCompte, updateCompte, deleteCompte } from "../controllers/compteController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllComptes);  
router.get("/:id", getCompteById);  
router.post("/", createCompte);  
router.put("/:id", updateCompte);  
router.delete("/:id", deleteCompte);  

export default router;


// router.get("/", verifyToken, getAllComptes);  
// router.get("/:id", verifyToken, getCompteById); 
// router.post("/", verifyToken, createCompte);
// router.put("/:id", verifyToken, updateCompte);
// router.delete("/:id", verifyToken, deleteCompte);


