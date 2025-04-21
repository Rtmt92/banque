/*C'est la page dashboard mais je n'ai pas accées au back pour l'instant des que la page sera fini je la mettrais en restricted route*/
import "../styles/home.css";
import transaction from "../assets/transaction.png"; // adapte le chemin selon ton fichier
import history from "../assets/history.png"
import rib from "../assets/rib.png"
import { useNavigate } from "react-router-dom";



const Home = () => {
    const navigate = useNavigate();

  return (
        <div className="home">


        <div className="crypto-section">
            <h2>La crypto du jour :</h2>
            <h1>
            ETH <span className="percentage">+4.2%</span> 🔥
            </h1> 
            <br/>
            <button className="buy-button">Acheter</button>
        </div>

        <div className="chart-container">
            <p style={{ color: 'green', fontSize: '0.9em', textAlign: 'center' }}>

            </p>
        </div>

<h3>Compte B</h3>
<div className="account-section">
    <div className="balance-container">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
                <tr>
                    <td style={{ padding: '10px 0', fontSize: '1.5rem', borderBottom: '1px solid #ccc' }}>Mon solde</td>
                    <td style={{ textAlign: 'right', fontSize: '2rem', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>505€</td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ padding: '10px 0', fontSize: '1rem' }}>
                        <div className="transaction-history">
                            <p>Historique des transactions</p>
                            <p>Restaurant</p>
                            <p style={{ textAlign: 'right' }}> 208€</p>
                            <p>Restaurant</p>
                            <p style={{ textAlign: 'right' }}> 208€</p>

                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

        <div className="actions-section">
            <div className="action-item" onClick={() => navigate("/virement")} style={{ cursor: "pointer" }}>
            <img src={transaction} alt="Effectuer un virement" />
            <p>Effectuer un virement</p>
            </div>
            <div className="action-item" onClick={() => navigate("/historique")} style={{ cursor: "pointer" }}>
            <img src={history} alt="Historique" />
            <p>L'historique</p>
            </div>
            <div className="action-item" onClick={() => navigate("/rib")} style={{ cursor: "pointer" }}>
            <img src={rib} alt="RIB" />
            <p>Mon RIB</p>
            </div>
            </div>
        </div>
    );
    };

export default Home;
