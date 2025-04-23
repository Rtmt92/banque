import "../styles/home.css";
import transaction from "../assets/transaction.png";
import history from "../assets/history.png";
import rib from "../assets/rib.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [comptes, setComptes] = useState([]);
  const [transactions, setTransactions] = useState({});
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const fetchCompte = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.error("Aucun token trouvé");

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const res = await axios.get(`http://localhost:5000/api/comptes/utilisateur/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const comptesData = res.data;
        setComptes(comptesData);

        // Fetch transactions for each account
        const txMap = {};
        await Promise.all(
          comptesData.map(async (compte) => {
            const txRes = await axios.get(`http://localhost:5000/api/transactions/compte/${compte.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            txMap[compte.id] = txRes.data;
          })
        );
        setTransactions(txMap);
      } catch (err) {
        console.error("Erreur lors de la récupération des comptes ou transactions :", err.response?.data || err.message);
        setComptes([]);
      }
    };

    const fetchCrypto = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cryptos/1");
        setCrypto(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération de la crypto :", err);
      }
    };

    fetchCompte();
    fetchCrypto();
  }, []);

  return (
    <div className="home">
      <div className="crypto-section">
        <h2>La crypto du jour :</h2>
        {crypto ? (
          <h1>
            {crypto.nom} ({crypto.symbole}) <span className="percentage">🔥</span>
          </h1>
        ) : (
          <h1>Chargement...</h1>
        )}
      </div>

      <div className="chart-container">
        <p style={{ color: "green", fontSize: "0.9em", textAlign: "center" }}></p>
      </div>

      {comptes.length === 0 ? (
        <h3 style={{ color: "red", textAlign: "center" }}>Aucun compte associé à cet utilisateur.</h3>
      ) : (
        comptes.map((compte, index) => (
          <div key={index} className="account-section">
            <h3 style={{ color: "#004aad" }}>{compte.type_compte}</h3>
            <div className="balance-container">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px 0", fontSize: "1.5rem", borderBottom: "1px solid #ccc" }}>
                      Mon solde
                    </td>
                    <td style={{ textAlign: "right", fontSize: "2rem", fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
                      {`${Number(compte.solde).toFixed(2)} €`}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ padding: "10px 0", fontSize: "1rem" }}>
                      <div className="transaction-history">
                        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Historique des transactions</p>
                        {transactions[compte.id] && transactions[compte.id].length > 0 ? (
                          transactions[compte.id].map((tx, i) => {
                            const isSent = tx.compte_source_id === compte.id;
                            const icon = isSent ? "📤" : "📥";
                            const color = isSent ? "crimson" : "green";
                            const message = isSent
                              ? `Envoyé ${Number(tx.montant).toFixed(2)}€ à compte ${tx.compte_dest_id}`
                              : `Reçu ${Number(tx.montant).toFixed(2)}€ de compte ${tx.compte_source_id}`;
                            return (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginBottom: "6px",
                                  alignItems: "center",
                                  fontSize: "0.95rem",
                                  color,
                                }}
                              >
                                <span>{icon} {message}</span>
                                <span style={{ fontSize: "0.8rem", color: "#555" }}>
                                  {new Date(tx.date_transaction).toLocaleDateString()}
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <p style={{ color: "#999", fontStyle: "italic" }}>Aucune transaction</p>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="actions-section">
              <div className="action-item" onClick={() => navigate(`/virement/${compte.id}`)}  style={{ cursor: "pointer" }}>
                <img src={transaction} alt="Effectuer un virement" />
                <p>Effectuer un virement</p>
              </div>
              <div className="action-item" onClick={() => navigate(`/historique/${compte.id}`)} style={{ cursor: "pointer" }}>
                <img src={history} alt="Historique" />
                <p>L'historique</p>
              </div>
              <div className="action-item" onClick={() => navigate("/rib")} style={{ cursor: "pointer" }}>
                <img src={rib} alt="RIB" />
                <p>Mon RIB</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
