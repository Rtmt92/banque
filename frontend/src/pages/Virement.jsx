import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/virement.css";

const Virement = () => {
  const { compteId } = useParams();
  const navigate = useNavigate();

  const [compteSource, setCompteSource] = useState(null);
  const [comptes, setComptes] = useState([]);
  const [destinataire, setDestinataire] = useState("");
  const [montant, setMontant] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/comptes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const comptesData = res.data;
        const source = comptesData.find((c) => c.id === parseInt(compteId));
        const autres = comptesData.filter((c) => c.id !== parseInt(compteId));

        setCompteSource(source);
        setComptes(autres);
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
      <h2>Effectuer un virement</h2>

      {compteSource && (
        <div style={{
          padding: "1rem",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          backgroundColor: "#f0f4ff"
        }}>
          <h4 style={{ marginBottom: "0.5rem", color: "#1e3a8a" }}>
            Compte source : <strong>{compteSource.type_compte}</strong>
          </h4>
          <p>Solde disponible : <strong>{parseFloat(compteSource.solde).toFixed(2)} €</strong></p>
        </div>
      )}

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
                {c.nom_utilisateur} — {c.type_compte}
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
