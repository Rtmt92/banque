import { useNavigate } from "react-router-dom";

const CryptoCard = ({ name, price, logo_url }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/crypto/${name}`);
  };

  const variation = (Math.random() * 10 - 5).toFixed(2);
  const isUp = variation > 0;
  const arrow = isUp ? "⬆️" : variation < 0 ? "⬇️" : "⏸️";
  const variationColor = isUp ? "green" : variation < 0 ? "red" : "gray";

  return (
    <div className="crypto-card" onClick={handleClick}>
      {logo_url && (
        <img
          src={logo_url}
          alt={`${name} logo`}
          className="crypto-logo"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}

      <span className="crypto-name">{name}</span>

      <span className="crypto-price" style={{ color: variationColor }}>
        {arrow} {variation}%
      </span>

      <span>Prix : {Number(price).toFixed(2)} $</span>
    </div>
  );
};

export default CryptoCard;
