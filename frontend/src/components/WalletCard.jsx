const WalletCard = ({ crypto, quantity, buyPrice, currentPrice }) => {
    return (
      <div className="wallet-card">
        <div className="wallet-header">
          <strong>{crypto}</strong>
          <span>{quantity}</span>
        </div>
        <div className="wallet-body">
          <p>Prix d'achat <span>{buyPrice}$</span></p>
          <p>Prix actuel <span>{currentPrice}$</span></p>
        </div>
      </div>
    );
  };
  
  export default WalletCard;
  