import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "../styles/historique.css";

const Historique = () => {
  const { compteId } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      if (!token) return console.error("Aucun token");

      try {
        const res = await axios.get(
          `http://localhost:5000/api/transactions/compte/${compteId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTransactions(res.data);
      } catch (err) {
        console.error("Erreur récupération transactions :", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [compteId]);

  return (
    <div className="historique-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Retour</button>
      <h2 className="historique-heading">Historique du compte #{compteId}</h2>

      {loading ? (
        <p className="historique-empty">Chargement…</p>
      ) : transactions.length === 0 ? (
        <p className="historique-empty">Aucune transaction pour ce compte.</p>
      ) : (
        <div className="cards-container">
          {transactions.map((tx, i) => {
            const isSent = tx.compte_source_id === Number(compteId);
            const icon = isSent ? "📤" : "📥";
            const color = isSent ? "#dc3545" : "#28a745";
            const montant = Number(tx.montant);

            return (
              <div key={i} className="tx-card" style={{ borderLeftColor: color }}>
                <div className="tx-header">
                  <span className="tx-icon">{icon}</span>
                  <span className="tx-date">
                    {new Date(tx.date_transaction).toLocaleDateString()}
                  </span>
                </div>
                <div className="tx-body">
                  <p className="tx-amount" style={{ color }}>
                    {isSent
                      ? `- ${montant.toFixed(2)} €`
                      : `+ ${montant.toFixed(2)} €`}
                  </p>
                  <p className="tx-desc">
                    {isSent
                      ? `Envoyé au compte ${tx.compte_dest_id}`
                      : `Reçu du compte ${tx.compte_source_id}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Historique;
