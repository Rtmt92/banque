import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import db from "./config/db.js"; 
import utilisateurRoutes from "./routes/utilisateurRoutes.js";
import compteRoutes from "./routes/compteRoutes.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import portefeuilleRoutes from "./routes/portefeuilleRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import achatVenteRoutes from "./routes/achatVenteRoutes.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

// Configuration des middlewares
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
}));


app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

// Route de test
app.get("/", (req, res) => {
    res.send("🚀 API en ligne !");
});


app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/comptes", compteRoutes);
app.use("/api/cryptos", cryptoRoutes);
app.use("/api/portefeuilles", portefeuilleRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/achats-ventes", achatVenteRoutes);
app.use("/api/auth", authRoutes);

export default app;
