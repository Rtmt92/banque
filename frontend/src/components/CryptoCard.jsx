import { useNavigate } from "react-router-dom";

const CryptoCard = ({ name, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/crypto/${name}`);
  };

  // Génère une variation aléatoire entre -5% et +5%
  const variation = (Math.random() * 10 - 5).toFixed(2);
  const isUp = variation > 0;
  const arrow = isUp ? "⬆️" : variation < 0 ? "⬇️" : "⏸️";
  const variationColor = isUp ? "green" : variation < 0 ? "red" : "gray";

  return (
    <div className="crypto-card" onClick={handleClick}>
      <span>{name}</span>
      <span style={{ color: variationColor }}>
        {arrow} {variation}%
      </span>
      <span>Prix : {Number(price).toFixed(2)} $</span>
    </div>
  );
};

export default CryptoCard;
