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
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const fetchCompte = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Aucun token trouvé");
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const res = await axios.get(`http://localhost:5000/api/comptes/utilisateur/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        

        setComptes(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération du compte :", err.response?.data || err.message);
        setComptes([]); // en cas d'erreur, reset les comptes
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
            <h3>{compte.type_compte}</h3>
            <div className="balance-container">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "10px 0",
                        fontSize: "1.5rem",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      Mon solde
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      {`${compte.solde} €`}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ padding: "10px 0", fontSize: "1rem" }}>
                      <div className="transaction-history">
                        <p>Historique des transactions</p>
                        <p>Restaurant</p>
                        <p style={{ textAlign: "right" }}>208€</p>
                        <p>Restaurant</p>
                        <p style={{ textAlign: "right" }}>208€</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="actions-section">
              <div
                className="action-item"
                onClick={() => navigate("/virement")}
                style={{ cursor: "pointer" }}
              >
                <img src={transaction} alt="Effectuer un virement" />
                <p>Effectuer un virement</p>
              </div>
              <div
                className="action-item"
                onClick={() => navigate("/historique")}
                style={{ cursor: "pointer" }}
              >
                <img src={history} alt="Historique" />
                <p>L'historique</p>
              </div>
              <div
                className="action-item"
                onClick={() => navigate("/rib")}
                style={{ cursor: "pointer" }}
              >
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
