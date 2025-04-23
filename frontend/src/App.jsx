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
import CryptoInfo from "./pages/CryptoInfo";
import Virement from "./pages/Virement";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes sans sidebar */}
        <Route path="/" element={<><Header /><Login /></>} />
        <Route path="/register" element={<><Header /><Register /></>} />
        <Route path="/home" element={<><Header /><Home /></>} />
        <Route path="/wallet" element={<><Header /><Wallet /></>} />
        <Route path="/rib" element={<><Header /><RibPage /></>} />
        <Route path="/crypto/:id" element={<><Header /><CryptoInfo /></>} />
        <Route path="/virement/:compteId" element={<Virement />} />




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
