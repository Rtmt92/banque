import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { isAuthenticated } from "./utils/auth";
import Home from "./pages/Home";
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
        {/* Routes sans sidebar */}
        <Route path="/" element={<><Login /></>} />
        <Route path="/register" element={<><Register /></>} />
        <Route path="/home" element={<><Home /></>} />
        <Route path="/wallet" element={<Layout><Wallet /></Layout>} />
        <Route path="/rib" element={<><RibPage /></>} />
        <Route path="/virement/:compteId" element={<Virement />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/historique/:compteId" element={<Historique />} />
        <Route path="/modifier-crypto/:compteId" element={<ModifierCrypto />} />



        {/* Routes protégées */}
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
      </Routes>
    </Router>
  );
};

export default App;
