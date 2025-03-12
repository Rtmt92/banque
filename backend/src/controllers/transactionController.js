import db from "../config/db.js";

export const getAllTransactions = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT t.id, t.compte_source_id, cs.utilisateur_id AS utilisateur_source, 
                   t.compte_dest_id, cd.utilisateur_id AS utilisateur_dest, 
                   t.montant, t.type_transaction, t.date_transaction, t.statut 
            FROM Transaction t
            LEFT JOIN Compte cs ON t.compte_source_id = cs.id
            LEFT JOIN Compte cd ON t.compte_dest_id = cd.id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const getTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`
            SELECT t.id, t.compte_source_id, cs.utilisateur_id AS utilisateur_source, 
                   t.compte_dest_id, cd.utilisateur_id AS utilisateur_dest, 
                   t.montant, t.type_transaction, t.date_transaction, t.statut 
            FROM Transaction t
            LEFT JOIN Compte cs ON t.compte_source_id = cs.id
            LEFT JOIN Compte cd ON t.compte_dest_id = cd.id
            WHERE t.id = ?
        `, [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Transaction non trouvée" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const createTransaction = async (req, res) => {
    const { compte_source_id, compte_dest_id, montant, type_transaction } = req.body;
    try {
        if (!compte_source_id || !compte_dest_id || !montant || !type_transaction) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        const [result] = await db.query(
            "INSERT INTO Transaction (compte_source_id, compte_dest_id, montant, type_transaction, statut) VALUES (?, ?, ?, ?, 'en attente')",
            [compte_source_id, compte_dest_id, montant, type_transaction]
        );
        res.status(201).json({ id: result.insertId, compte_source_id, compte_dest_id, montant, type_transaction, statut: "en attente" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const updateTransactionStatus = async (req, res) => {
    const { id } = req.params;
    const { statut } = req.body;
    try {
        if (!["en attente", "validée", "annulée"].includes(statut)) {
            return res.status(400).json({ message: "Statut invalide" });
        }
        await db.query("UPDATE Transaction SET statut = ? WHERE id = ?", [statut, id]);
        res.json({ message: "Transaction mise à jour avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};

export const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM Transaction WHERE id = ?", [id]);
        res.json({ message: "Transaction supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};
