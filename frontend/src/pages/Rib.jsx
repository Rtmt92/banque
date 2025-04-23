import { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import jsPDF from "jspdf";

const RibPage = () => {
  const [nom, setNom] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Aucun token trouvé");
        setIsLoading(false);
        return;
      }

      let userId;
      try {
        const decoded = jwtDecode(token);
        userId = decoded.id;
      } catch (err) {
        console.error("Impossible de décoder le token :", err);
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/utilisateurs/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNom(res.data.nom);
      } catch (err) {
        console.error("Erreur lors du chargement du nom :", err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserName();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("RELEVE D'IDENTITE BANCAIRE (RIB)", 20, 20);
    doc.setFontSize(12);
    doc.text(`Nom : ${nom}`, 20, 40);
    doc.text("IBAN : FR76 3000 4000 5000 6000 7000 189", 20, 50);
    doc.text("BIC : BNPAFRPP", 20, 60);
    doc.text("Banque : Banque ITIR", 20, 70);
    doc.save("rib.pdf");
  };

  return (
    <div style={{ textAlign: "center", padding: "40px", fontFamily: "Arial" }}>
      <h2>Mon RIB</h2>
      <p>Vous pouvez générer votre RIB au format PDF ci-dessous&nbsp;:</p>

      {isLoading ? (
        <p>Chargement des informations...</p>
      ) : (
        <button
          onClick={generatePDF}
          style={{
            backgroundColor: "#005fa3",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Télécharger mon RIB
        </button>
      )}
    </div>
  );
};

export default RibPage;
