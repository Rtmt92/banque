import { useNavigate } from "react-router-dom";

const CryptoCard = ({ name, variation, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/crypto/${name}`);
  };

  return (
    <div className="crypto-card" onClick={handleClick}>
      <span>{name}</span>
      <span>{variation}</span>
      <span>Prix: {price}$</span>
    </div>
  );
};

export default CryptoCard;
