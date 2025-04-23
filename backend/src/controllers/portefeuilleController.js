import db from "../config/db.js";

export const getAllPortefeuilles = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.compte_id, c.utilisateur_id, u.nom AS utilisateur, 
             p.cryptomonnaie_id, cm.nom AS cryptomonnaie, p.quantité
      FROM PortefeuilleCrypto p
      JOIN Compte c ON p.compte_id = c.id
      JOIN Utilisateur u ON c.utilisateur_id = u.id
      JOIN Cryptomonnaie cm ON p.cryptomonnaie_id = cm.id
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
      SELECT p.id, p.compte_id, p.cryptomonnaie_id, c.nom AS cryptomonnaie, p.quantité
      FROM PortefeuilleCrypto p
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
  const { compte_id, cryptomonnaie_id, quantité } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO PortefeuilleCrypto (compte_id, cryptomonnaie_id, quantité) VALUES (?, ?, ?)",
      [compte_id, cryptomonnaie_id, quantité]
    );
    res.status(201).json({ id: result.insertId, compte_id, cryptomonnaie_id, quantité });
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

export const getCryptoByCompteId = async (req, res) => {
  const { compteId } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.compte_id, p.cryptomonnaie_id, c.nom AS cryptomonnaie, p.quantité
      FROM PortefeuilleCrypto p
      JOIN Cryptomonnaie c ON p.cryptomonnaie_id = c.id
      WHERE p.compte_id = ?
    `, [compteId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Aucune cryptomonnaie trouvée pour ce compte" });
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};
