import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import db from "./config/db.js"; 
import utilisateurRoutes from "./routes/utilisateurRoutes.js";
import compteRoutes from "./routes/compteRoutes.js";

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

export default app;
