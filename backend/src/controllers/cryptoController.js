import db from "../config/db.js";

export const getAllCryptos = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Cryptomonnaie");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const getCryptoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM Cryptomonnaie WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Cryptomonnaie non trouvée" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const createCrypto = async (req, res) => {
    const { nom, symbole, cours_actuel } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO Cryptomonnaie (nom, symbole, cours_actuel) VALUES (?, ?, ?)", 
            [nom, symbole, cours_actuel]
        );
        res.status(201).json({ id: result.insertId, nom, symbole, cours_actuel });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const updateCrypto = async (req, res) => {
    const { id } = req.params;
    const { nom, symbole, cours_actuel } = req.body;
    try {
        await db.query("UPDATE Cryptomonnaie SET nom = ?, symbole = ?, cours_actuel = ? WHERE id = ?", 
            [nom, symbole, cours_actuel, id]
        );
        res.json({ message: "Cryptomonnaie mise à jour avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const deleteCrypto = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM Cryptomonnaie WHERE id = ?", [id]);
        res.json({ message: "Cryptomonnaie supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

