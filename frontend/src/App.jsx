import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { isAuthenticated } from "./utils/auth";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes sans sidebar */}
        <Route path="/" element={<><Header /><Login /></>} />
        <Route path="/register" element={<><Header /><Register /></>} />

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
