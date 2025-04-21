import jsPDF from "jspdf";

const RibPage = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("RELEVE D'IDENTITE BANCAIRE (RIB)", 20, 20);
    doc.setFontSize(12);
    doc.text("Nom : Jean Dupont", 20, 40);
    doc.text("IBAN : FR76 3000 4000 5000 6000 7000 189", 20, 50);
    doc.text("BIC : BNPAFRPP", 20, 60);
    doc.text("Banque : Banque ITIR", 20, 70);
    doc.save("rib.pdf");
  };

  return (
    <div style={{ textAlign: "center", padding: "40px", fontFamily: "Arial" }}>
      <h2>Mon RIB</h2>
      <p>Vous pouvez générer votre RIB au format PDF ci-dessous :</p>
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
    </div>
  );
};

export default RibPage;
