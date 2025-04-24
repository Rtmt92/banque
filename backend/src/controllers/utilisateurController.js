import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Utilisateur");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM Utilisateur WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const createUser = async (req, res) => {
    const { nom, email, mot_de_passe } = req.body;
    try {
        const [result] = await db.query("INSERT INTO Utilisateur (nom, email, mot_de_passe) VALUES (?, ?, ?)", 
                                        [nom, email, mot_de_passe]);
        res.status(201).json({ id: result.insertId, nom, email });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nom, email } = req.body;
    try {
        await db.query("UPDATE Utilisateur SET nom = ?, email = ? WHERE id = ?", [nom, email, id]);
        res.json({ message: "Utilisateur mis à jour avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM Utilisateur WHERE id = ?", [id]);
        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};


export const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { nouveau_mot_de_passe } = req.body;

  if (!nouveau_mot_de_passe) {
    return res.status(400).json({ message: "Le mot de passe est requis." });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nouveau_mot_de_passe, salt);

    await db.query("UPDATE Utilisateur SET mot_de_passe = ? WHERE id = ?", [hashedPassword, id]);

    res.json({ message: "Mot de passe mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};
