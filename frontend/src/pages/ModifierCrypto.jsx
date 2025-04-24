import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/modifierCrypto.css";

const ModifierCrypto = () => {
  const { compteId } = useParams();
  const navigate = useNavigate();

  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [operation, setOperation] = useState("achat");
  const [montant, setMontant] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cryptos");
        setCryptos(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des cryptos", err);
      }
    };
    fetchCryptos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Token non trouvé");
  
    const payload = {
      compte_id: parseInt(compteId),
      cryptomonnaie_id: parseInt(selectedCrypto),
      type_operation: operation,
      montant: parseFloat(montant),
    };
  
    console.log("Payload envoyé au backend :", payload);
  
    try {
      await axios.post(
        "http://localhost:5000/api/crypto/operation",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(" Opération réussie");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error(" Erreur Axios :", err.response?.data || err.message);
      setMessage(" Erreur lors de l'opération");
    }
  };
  

  return (
    <div className="modifier-crypto-container">
      <h2>Gérer le compte crypto #{compteId}</h2>

      <form className="crypto-form" onSubmit={handleSubmit}>
        <label>Choisir une cryptomonnaie :</label>
        <select value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)} required>
          <option value="">-- Sélectionner --</option>
          {cryptos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom} ({c.symbole}) - {Number(c.cours_actuel).toFixed(2)} €
            </option>
          ))}
        </select>

        <label>Type d'opération :</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)} required>
          <option value="achat">Achat</option>
          <option value="vente">Vente</option>
        </select>

        <label>Montant :</label>
        <input
          type="number"
          step="0.01"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
        />

        <div className="btn-row">
          <button type="submit" className="btn-submit">Valider</button>
          <button type="button" className="btn-cancel" onClick={() => navigate("/dashboard")}>
            Annuler
          </button>
        </div>

        {message && <p className="operation-message">{message}</p>}
      </form>
    </div>
  );
};

export default ModifierCrypto;
