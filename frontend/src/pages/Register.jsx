import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        nom,
        email,
        mot_de_passe: motDePasse,
      });

      setSuccess("Compte créé avec succès !");
      setNom("");
      setEmail("");
      setMotDePasse("");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <div className="auth-container full-height">
      <div>
        <img src={logo} alt="logo" className="auth-logo" />
        <form className="auth-form" onSubmit={handleRegister}>
          <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
          <button type="submit">S'inscrire</button>
          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}
        </form>

        <p className="auth-link">
        <Link to="/">Déjà inscrit ? Connexion</Link>
            </p>
      </div>
    </div>
  );
};

export default Register;
