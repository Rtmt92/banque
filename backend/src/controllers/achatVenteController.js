import db from "../config/db.js";

export const getAllAchatsVentes = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT av.id, av.compte_id, cp.type_compte AS compte, av.cryptomonnaie_id, c.nom AS cryptomonnaie, 
                   av.montant, av.type_operation, av.date_operation
            FROM AchatVente av
            JOIN Compte cp ON av.compte_id = cp.id
            JOIN Cryptomonnaie c ON av.cryptomonnaie_id = c.id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const getAchatVenteById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`
            SELECT av.id, av.compte_id, cp.type_compte AS compte, av.cryptomonnaie_id, c.nom AS cryptomonnaie, 
                   av.montant, av.type_operation, av.date_operation
            FROM AchatVente av
            JOIN Compte cp ON av.compte_id = cp.id
            JOIN Cryptomonnaie c ON av.cryptomonnaie_id = c.id
            WHERE av.id = ?
        `, [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Opération non trouvée" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const createAchatVente = async (req, res) => {
    const { compte_id, cryptomonnaie_id, montant, type_operation } = req.body;
    try {
        if (!compte_id || !cryptomonnaie_id || !montant || !type_operation) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        const [result] = await db.query(
            "INSERT INTO AchatVente (compte_id, cryptomonnaie_id, montant, type_operation) VALUES (?, ?, ?, ?)",
            [compte_id, cryptomonnaie_id, montant, type_operation]
        );
        res.status(201).json({ id: result.insertId, compte_id, cryptomonnaie_id, montant, type_operation });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const deleteAchatVente = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM AchatVente WHERE id = ?", [id]);
        res.json({ message: "Opération supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const updateAchatVente = async (req, res) => {
    const { id } = req.params;
    const { montant, type_operation } = req.body;
    try {
        if (!["achat", "vente"].includes(type_operation)) {
            return res.status(400).json({ message: "Type d'opération invalide. Utilisez 'achat' ou 'vente'." });
        }

        await db.query(
            "UPDATE AchatVente SET montant = ?, type_operation = ? WHERE id = ?", 
            [montant, type_operation, id]
        );

        res.json({ message: "Opération mise à jour avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};
