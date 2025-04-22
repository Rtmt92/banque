import { useEffect, useState } from "react";
import axios from "axios";
import WalletCard from "../components/WalletCard";
import CryptoCard from "../components/CryptoCard";
import "../styles/wallet.css";

const WalletPage = () => {
  const [cryptos, setCryptos] = useState([]);  // Liste de toutes les cryptos
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [userCryptos, setUserCryptos] = useState([]);  // Cryptos possédées par l'utilisateur
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;  // Décode le token pour récupérer l'ID de l'utilisateur

  // Récupérer les cryptos disponibles
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cryptos");
        setCryptos(res.data);
        setFilteredCryptos(res.data); // Afficher toutes les cryptos par défaut
      } catch (err) {
        console.error("Erreur lors de la récupération des cryptos :", err);
      }
    };

    fetchCryptos();
  }, []);

  // Récupérer les cryptos possédées par l'utilisateur
  useEffect(() => {
    if (userId) {
      const fetchUserCryptos = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/portefeuilles/${userId}`);
          setUserCryptos(res.data);  // Les cryptos de l'utilisateur
        } catch (err) {
          console.error("Erreur lors de la récupération des cryptos de l'utilisateur :", err);
        }
      };      

      fetchUserCryptos();
    }
  }, [userId]);

  // Filtrer les cryptomonnaies selon la recherche
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filtrer les cryptos en fonction de la recherche (nom ou symbole)
    const filtered = cryptos.filter(
      (crypto) =>
        crypto.nom.toLowerCase().includes(query.toLowerCase()) ||
        crypto.symbole.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCryptos(filtered);
  };

  return (
    <div className="wallet-container">
      {/* Affichage des cryptos possédées par l'utilisateur */}
      {userCryptos.length > 0 && (
        <div className="user-cryptos">
          <h2>Vos cryptomonnaies :</h2>
          <div className="wallet-cards">
            {userCryptos.map((userCrypto) => (
              <WalletCard
                key={userCrypto.id}
                name={userCrypto.cryptomonnaie}
                quantity={userCrypto.quantité}
              />
            ))}
          </div>
        </div>
      )}

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une cryptomonnaie..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Affichage des cartes de cryptomonnaies disponibles */}
      <div className="wallet-cards">
        {/* Afficher les 3 premières cryptomonnaies filtrées */}
        {filteredCryptos.slice(0, 3).map((crypto) => (
          <CryptoCard
            key={crypto.id}
            id={crypto.id}
            name={crypto.nom}
            price={crypto.cours_actuel} // Utiliser le cours actuel
          />
        ))}
      </div>

      {/* Sections de portefeuille */}
      <div className="wallet-buttons">
        <button>Acheter</button>
        <button>Vendre</button>
      </div>
    </div>
  );
};

export default WalletPage;
