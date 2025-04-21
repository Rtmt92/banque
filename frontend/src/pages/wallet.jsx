import WalletCard from "../components/WalletCard";
import CryptoCard from "../components/CryptoCard";
import "../styles/wallet.css";

const WalletPage = () => {
  return (
    <div className="wallet-container">
      <WalletCard crypto="ETH" quantity={50} buyPrice={20} currentPrice={20} />
      <div className="wallet-buttons">
        <button>Acheter</button>
        <button>Vendre</button>
      </div>

      <WalletCard crypto="ETH" quantity={50} buyPrice={20} currentPrice={20} />
      <div className="wallet-buttons">
        <button>Acheter</button>
        <button>Vendre</button>
      </div>

      <CryptoCard name="BTC" variation="+2,05%" price={20} />
      <CryptoCard name="BTC" variation="+2,05%" price={20} />
      <CryptoCard name="BTC" variation="+2,05%" price={20} />
    </div>
  );
};

export default WalletPage;
