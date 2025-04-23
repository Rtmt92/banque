import db from "../config/db.js";

export const handleCryptoOperation = async (req, res) => {
  const { compte_id, cryptomonnaie_id, type_operation, montant } = req.body;

  if (!["achat", "vente"].includes(type_operation)) {
    return res.status(400).json({ message: "Type d'opération invalide" });
  }

  try {
    const [[compte]] = await db.query("SELECT * FROM Compte WHERE id = ?", [compte_id]);
    console.log("➡️ Compte récupéré :", compte);
    if (!compte || compte.type_compte !== "crypto") {
      return res.status(400).json({ message: "Compte crypto introuvable ou invalide" });
    }

    const [[crypto]] = await db.query("SELECT * FROM Cryptomonnaie WHERE id = ?", [cryptomonnaie_id]);
    if (!crypto) return res.status(404).json({ message: "Cryptomonnaie introuvable" });

    const valeurTotale = parseFloat(crypto.cours_actuel) * parseFloat(montant);

    if (type_operation === "achat") {
      if (compte.solde < valeurTotale) {
        return res.status(400).json({ message: "Solde insuffisant pour l'achat" });
      }

      await db.query("UPDATE Compte SET solde = solde - ? WHERE id = ?", [valeurTotale, compte_id]);

      const [[existing]] = await db.query(
        "SELECT * FROM PortefeuilleCrypto WHERE compte_id = ? AND cryptomonnaie_id = ?",
        [compte_id, cryptomonnaie_id]
      );

      if (existing) {
        await db.query(
          "UPDATE PortefeuilleCrypto SET quantité = quantité + ? WHERE compte_id = ? AND cryptomonnaie_id = ?",
          [montant, compte_id, cryptomonnaie_id]
        );
      } else {
        await db.query(
          "INSERT INTO PortefeuilleCrypto (compte_id, cryptomonnaie_id, quantité) VALUES (?, ?, ?)",
          [compte_id, cryptomonnaie_id, montant]
        );
      }
    }

    if (type_operation === "vente") {
      const [[portefeuille]] = await db.query(
        "SELECT * FROM PortefeuilleCrypto WHERE compte_id = ? AND cryptomonnaie_id = ?",
        [compte_id, cryptomonnaie_id]
      );

      if (!portefeuille || parseFloat(portefeuille.quantité) < parseFloat(montant)) {
        return res.status(400).json({ message: "Quantité insuffisante pour la vente" });
      }

      await db.query("UPDATE Compte SET solde = solde + ? WHERE id = ?", [valeurTotale, compte_id]);

      await db.query(
        "UPDATE PortefeuilleCrypto SET quantité = quantité - ? WHERE compte_id = ? AND cryptomonnaie_id = ?",
        [montant, compte_id, cryptomonnaie_id]
      );
    }

    await db.query(
        `INSERT INTO AchatVente (compte_id, cryptomonnaie_id, montant, type_operation)
         VALUES (?, ?, ?, ?)`,
        [compte_id, cryptomonnaie_id, montant, type_operation]
      );
      

    return res.json({ message: `✅ ${type_operation} réussie`, valeurTotale });
  } catch (err) {
    console.error("Erreur opération crypto :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};
