import db from "../config/db.js";

export const getAllComptes = async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT c.*, u.nom AS nom_utilisateur
        FROM Compte c
        JOIN Utilisateur u ON c.utilisateur_id = u.id
      `);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
  };
  
export const getCompteById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM Compte WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Compte non trouvé" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};



export const getComptesByUtilisateur = async (req, res) => {
    const { utilisateurId } = req.params;
  
    try {
      const [rows] = await db.query("SELECT * FROM Compte WHERE utilisateur_id = ?", [utilisateurId]);
      if (rows.length === 0) return res.status(404).json({ message: "Aucun compte trouvé" });
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
  };
  
  

export const createCompte = async (req, res) => {
    const { utilisateur_id, type_compte, solde } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO Compte (utilisateur_id, type_compte, solde) VALUES (?, ?, ?)", 
            [utilisateur_id, type_compte, solde]
        );
        res.status(201).json({ id: result.insertId, utilisateur_id, type_compte, solde });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const updateCompte = async (req, res) => {
    const { id } = req.params;
    const { type_compte, solde } = req.body;
    try {
        await db.query("UPDATE Compte SET type_compte = ?, solde = ? WHERE id = ?", [type_compte, solde, id]);
        res.json({ message: "Compte mis à jour avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const deleteCompte = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM Compte WHERE id = ?", [id]);
        res.json({ message: "Compte supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};
