import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser,  updateUserPassword  } from "../controllers/utilisateurController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/", verifyToken, createUser);
router.put("/:id", verifyToken, updateUser);
router.put("/motdepasse/:id", updateUserPassword);
router.delete("/:id", verifyToken, deleteUser);

// Exportation du router par défaut
export default router;  // Assure-toi d'utiliser "export default"
