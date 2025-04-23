import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        mot_de_passe: motDePasse,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-container full-height">
        <img src={logo} alt="logo" className="auth-logo" />
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
          <button type="submit">Me connecter</button>
          <p className="auth-link">
            <Link to="/register">Première connexion ? Inscription</Link>
          </p>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
