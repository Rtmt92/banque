import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/cryptoInfo.css"; 

const CryptoInfo = () => {
  const { id } = useParams();
  
  const [cryptoData, setCryptoData] = useState({
    name: "",
    symbol: "",
    price: 0,
  });
  const [quantity, setQuantity] = useState(1);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const fetchCrypto = async () => {
      setIsLoading(true); 
      try {
        if (id) {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/cryptos/${id}`);
          if (res.data) {
            setCryptoData({
              name: res.data.nom,
              symbol: res.data.symbole,
              price: res.data.cours_actuel,
            });
          }
        } else {
          setError("L'ID de la cryptomonnaie est manquant.");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des données de la crypto :", err);
        setError("Erreur lors de la récupération des données de la cryptomonnaie.");
      } finally {
        setIsLoading(false); 
      }
    };
  
    fetchCrypto();
  }, [id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardDetails.cardNumber || !cardDetails.expirationDate || !cardDetails.cvv) {
      setError("Veuillez remplir tous les champs de la carte bancaire.");
      return;
    }

    const totalAmount = cryptoData.price * quantity;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté pour effectuer un achat.");
      return;
    }

    const userId = JSON.parse(atob(token.split('.')[1])).userId; 

    try {
      setIsLoading(true); 

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/portefeuilles`,
        {
          utilisateur_id: userId,
          cryptomonnaie_id: id, 
          quantité: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(`Achat réussi ! Vous avez acheté ${quantity} ${cryptoData.name} pour ${totalAmount} €.`);
    } catch (err) {
      console.error("Erreur lors de l'achat :", err);
      setError("Erreur lors de l'achat. Veuillez réessayer.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="crypto-info-container">
      <div className="crypto-card-info">
        <h1>{cryptoData.name}</h1>
        <p className="symbol">Symbole : <span>{cryptoData.symbol}</span></p>
        <p className="price">Prix actuel : <span>{cryptoData.price} €</span></p>

        {isLoading ? (
          <p>Chargement...</p> 
        ) : (
          <form onSubmit={handleSubmit} className="buy-form">
            <div className="form-group">
              <label>Quantité :</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Numéro de carte :</label>
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                maxLength="16"
              />
            </div>

            <div className="form-group">
              <label>Date d'expiration :</label>
              <input
                type="month"
                value={cardDetails.expirationDate}
                onChange={(e) => setCardDetails({ ...cardDetails, expirationDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>CVV :</label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                maxLength="3"
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="buy-button" disabled={isLoading}>
              {isLoading ? "Traitement..." : "Confirmer l'achat"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CryptoInfo;
