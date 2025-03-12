import db from "../config/db.js";

export const getAllPortefeuilles = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.id, p.utilisateur_id, u.nom AS utilisateur, p.cryptomonnaie_id, c.nom AS cryptomonnaie, p.quantité 
            FROM PortefeuilleCrypto p
            JOIN Utilisateur u ON p.utilisateur_id = u.id
            JOIN Cryptomonnaie c ON p.cryptomonnaie_id = c.id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const getPortefeuilleById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`
            SELECT p.id, p.utilisateur_id, u.nom AS utilisateur, p.cryptomonnaie_id, c.nom AS cryptomonnaie, p.quantité 
            FROM PortefeuilleCrypto p
            JOIN Utilisateur u ON p.utilisateur_id = u.id
            JOIN Cryptomonnaie c ON p.cryptomonnaie_id = c.id
            WHERE p.id = ?
        `, [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Portefeuille non trouvé" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const addCryptoToPortefeuille = async (req, res) => {
    const { utilisateur_id, cryptomonnaie_id, quantité } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO PortefeuilleCrypto (utilisateur_id, cryptomonnaie_id, quantité) VALUES (?, ?, ?)", 
            [utilisateur_id, cryptomonnaie_id, quantité]
        );
        res.status(201).json({ id: result.insertId, utilisateur_id, cryptomonnaie_id, quantité });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const updatePortefeuille = async (req, res) => {
    const { id } = req.params;
    const { quantité } = req.body;
    try {
        await db.query("UPDATE PortefeuilleCrypto SET quantité = ? WHERE id = ?", [quantité, id]);
        res.json({ message: "Portefeuille mis à jour avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const deletePortefeuille = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM PortefeuilleCrypto WHERE id = ?", [id]);
        res.json({ message: "Portefeuille supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};
