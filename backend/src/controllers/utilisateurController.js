import db from "../config/db.js";

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
