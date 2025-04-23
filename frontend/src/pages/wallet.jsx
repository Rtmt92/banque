import { useEffect, useState } from "react";
import axios from "axios";
import WalletCard from "../components/WalletCard";
import CryptoCard from "../components/CryptoCard";
import "../styles/wallet.css";

const WalletPage = () => {
  const [allCryptos, setAllCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [userHoldings, setUserHoldings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

  // Récupération des cryptos disponibles
  useEffect(() => {
    const fetchAllCryptos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cryptos");
        setAllCryptos(response.data);
        setFilteredCryptos(response.data); // Par défaut, affiche tout
      } catch (error) {
        console.error("Erreur lors de la récupération des cryptos :", error);
      }
    };

    fetchAllCryptos();
  }, []);

  // Récupération du portefeuille utilisateur
  useEffect(() => {
    const fetchUserHoldings = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/portefeuilles/${userId}`);
        setUserHoldings(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du portefeuille utilisateur :", error);
      }
    };

    fetchUserHoldings();
  }, [userId]);

  // Gestion de la recherche
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = allCryptos.filter(
      (crypto) =>
        crypto.nom.toLowerCase().includes(query) ||
        crypto.symbole.toLowerCase().includes(query)
    );

    setFilteredCryptos(filtered);
  };

  return (
    <div className="wallet-container">
      {/* Portefeuille utilisateur */}
      {userHoldings.length > 0 && (
        <section className="user-cryptos">
          <h2>Vos cryptomonnaies</h2>
          <div className="wallet-cards">
            {userHoldings.map((holding) => (
              <WalletCard
                key={holding.id}
                name={holding.cryptomonnaie}
                quantity={holding.quantité}
              />
            ))}
          </div>
        </section>
      )}

      {/* Champ de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une cryptomonnaie..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Cryptos disponibles */}
      <section className="wallet-cards">
        {filteredCryptos.slice(0, 3).map((crypto) => (
          <CryptoCard
            key={crypto.id}
            id={crypto.id}
            name={crypto.nom}
            price={crypto.cours_actuel}
            variation_24h={crypto.variation_24h} // Ajoute ça si dispo
          />
        ))}
      </section>
    </div>
  );
};

export default WalletPage;
