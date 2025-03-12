import express from "express";
import { getAllComptes, getCompteById, createCompte, updateCompte, deleteCompte } from "../controllers/compteController.js";

const router = express.Router();

router.get("/", getAllComptes);  
router.get("/:id", getCompteById);  
router.post("/", createCompte);  
router.put("/:id", updateCompte);  
router.delete("/:id", deleteCompte);  

export default router;
