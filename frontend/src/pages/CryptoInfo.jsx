import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/cryptoInfo.css"; // style associé

const CryptoInfo = () => {
  const { id } = useParams();

  const [cryptoData] = useState({
    name: id.toUpperCase(),
    symbol: id,
    lastUpdated: new Date().toLocaleString(),
  });

  const handleBuy = () => {
    alert(`Achat de ${cryptoData.name} en cours...`);
  };

  return (
    <div className="crypto-info-container">
      <div className="crypto-card-info">
        <h1>{cryptoData.name}</h1>
        <p className="symbol">Symbole : <span>{cryptoData.symbol}</span></p>
        <p className="date">Dernière mise à jour : <span>{cryptoData.lastUpdated}</span></p>

        <button className="buy-button" onClick={handleBuy}>
          Acheter {cryptoData.symbol.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default CryptoInfo;
