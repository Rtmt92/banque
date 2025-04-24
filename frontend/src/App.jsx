import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { isAuthenticated } from "./utils/auth";
import Wallet from "./pages/wallet";
import RibPage from "./pages/Rib";
import ModifierCrypto from "./pages/ModifierCrypto";
import Virement from "./pages/Virement";
import Profile from "./pages/profile";
import Historique from "./pages/historique";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* 🔓 Routes publiques */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Routes protégées */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/wallet"
          element={
            isAuthenticated() ? (
              <Layout>
                <Wallet />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/rib"
          element={
            isAuthenticated() ? (
              <Layout>
                <RibPage />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/virement/:compteId"
          element={
            isAuthenticated() ? (
              <Virement />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated() ? (
              <Layout>
                <Profile />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/historique/:compteId"
          element={
            isAuthenticated() ? (
              <Historique />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/modifier-crypto/:compteId"
          element={
            isAuthenticated() ? (
              <ModifierCrypto />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
