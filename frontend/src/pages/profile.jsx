import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../styles/profile.css";
import { FaPiggyBank, FaWallet, FaBitcoin } from "react-icons/fa";

const Profile = () => {
  const [comptes, setComptes] = useState([]);
  const [passwordForm, setPasswordForm] = useState({ mot_de_passe: "" });
  const [newCompte, setNewCompte] = useState({ type_compte: "courant", solde: 0 });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    const fetchComptes = async () => {
      if (!userId) return;
      try {
        const comptesRes = await axios.get(
          `http://localhost:5000/api/comptes/utilisateur/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComptes(comptesRes.data);
      } catch (err) {
        console.error("Erreur chargement comptes :", err.response?.data || err.message);
      }
    };

    fetchComptes();
  }, [userId, token]);

  const handlePasswordChange = (e) => {
    setPasswordForm({ mot_de_passe: e.target.value });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/utilisateurs/motdepasse/${userId}`,
        { nouveau_mot_de_passe: passwordForm.mot_de_passe },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPasswordForm({ mot_de_passe: "" });
      setShowPasswordForm(false);
    } catch (err) {
      console.error("Erreur mise à jour mot de passe :", err.response?.data || err.message);

    }
  };

  const handleCompteChange = (e) => {
    setNewCompte({ ...newCompte, [e.target.name]: e.target.value });
  };

  const handleAddCompte = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/comptes",
        { utilisateur_id: userId, ...newCompte },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewCompte({ type_compte: "courant", solde: 0 });
      const comptesRes = await axios.get(
        `http://localhost:5000/api/comptes/utilisateur/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComptes(comptesRes.data);
    } catch (err) {
      console.error("Erreur ajout compte :", err);

    }
  };

  const getShadowClass = (solde) => {
    if (solde > 10000) return "shadow-strong";
    if (solde > 1000) return "shadow-medium";
    return "shadow-light";
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mon Profil</h1>

      <div className="button-container">
        <button
          className="profile-button"
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          Modifier le mot de passe
        </button>
      </div>

      {showPasswordForm && (
        <form onSubmit={handlePasswordUpdate} className="profile-form">
          <label className="profile-label">Nouveau mot de passe</label>
          <input
            className="profile-input"
            type="password"
            name="mot_de_passe"
            value={passwordForm.mot_de_passe}
            onChange={handlePasswordChange}
          />
          <button type="submit" className="profile-button">
            Changer le mot de passe
          </button>
        </form>
      )}

      <h2 className="subtitle">Mes Comptes</h2>
      <div className="comptes-container">
        {comptes.map((compte) => {
          const icon =
            compte.type_compte === "courant" ? <FaWallet className="icon" /> :
            compte.type_compte === "epargne" ? <FaPiggyBank className="icon" /> :
            compte.type_compte === "crypto" ? <FaBitcoin className="icon" /> :
            null;

          const shadowClass = getShadowClass(compte.solde);

          return (
            <div key={compte.id} className={`compte-card ${shadowClass}`}>
              {icon}
              <p><strong>Type :</strong> {compte.type_compte}</p>
              <p><strong>Solde :</strong> {compte.solde} €</p>
              <p><strong>Ouvert le :</strong> {new Date(compte.date_ouverture).toLocaleDateString()}</p>
            </div>
          );
        })}
      </div>

      <h3 className="subtitle">Ajouter un Compte</h3>
      <form onSubmit={handleAddCompte} className="profile-form">
        <label className="profile-label">Type de compte</label>
        <select
          name="type_compte"
          value={newCompte.type_compte}
          onChange={handleCompteChange}
          className="profile-input"
        >
          <option value="courant">Courant</option>
          <option value="epargne">Épargne</option>
          <option value="crypto">Crypto</option>
        </select>

        <label className="profile-label">Solde initial (€)</label>
        <input
          className="profile-input"
          type="number"
          name="solde"
          value={newCompte.solde}
          onChange={handleCompteChange}
        />

        <button type="submit" className="profile-button">
          Créer le compte
        </button>
      </form>
    </div>
  );
};

export default Profile;
