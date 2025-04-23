import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/virement.css";

const Virement = () => {
  const { compteId } = useParams(); // récupère l'id dans l'URL
  const navigate = useNavigate();

  const [montant, setMontant] = useState("");
  const [destinataire, setDestinataire] = useState("");
  const [comptes, setComptes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/comptes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const autresComptes = res.data.filter((c) => c.id !== parseInt(compteId));
        setComptes(autresComptes);
      } catch (err) {
        console.error("Erreur récupération comptes :", err);
      }
    };

    fetchComptes();
  }, [compteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/transactions/virement",
        {
          compte_source_id: compteId,
          compte_dest_id: destinataire,
          montant: parseFloat(montant),
          type_transaction: "virement",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Virement effectué !");
      setMontant("");
      setDestinataire("");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors du virement");
    }
  };

  return (
    <div className="virement-container">
      <h2>Virement depuis le compte #{compteId}</h2>

      <form onSubmit={handleSubmit} className="virement-form">
        <label>Montant (€) :</label>
        <input
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
          min="1"
        />

        <label>Compte destinataire :</label>
        <select
          value={destinataire}
          onChange={(e) => setDestinataire(e.target.value)}
          required
        >
          <option value="">-- Sélectionner un compte --</option>
          {comptes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.type_compte} (solde: {parseFloat(c.solde).toFixed(2)} €)
            </option>
          ))}
        </select>

        <div className="btn-row">
          <button type="submit" className="btn-submit">Envoyer</button>
          <button type="button" className="btn-cancel" onClick={() => navigate("/dashboard")}>
            Annuler
          </button>
        </div>

        {message && <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>}
      </form>
    </div>
  );
};

export default Virement;
