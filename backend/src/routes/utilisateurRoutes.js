import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, updateUserPassword } from "../controllers/utilisateurController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/", verifyToken, createUser);
router.put("/:id", verifyToken, updateUser);
router.put("/motdepasse/:id", updateUserPassword); // Mise à jour du mot de passe
router.delete("/:id", verifyToken, deleteUser);

export default router;
