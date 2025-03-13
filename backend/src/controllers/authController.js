import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "super_secret"; 


export const register = async (req, res) => {
    const { nom, email, mot_de_passe } = req.body;

    try {

        const [existingUser] = await db.query("SELECT * FROM Utilisateur WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mot_de_passe, salt);

 
        const [result] = await db.query(
            "INSERT INTO Utilisateur (nom, email, mot_de_passe) VALUES (?, ?, ?)", 
            [nom, email, hashedPassword]
        );

        res.status(201).json({ id: result.insertId, nom, email, message: "Utilisateur créé avec succès !" });

    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};


export const login = async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {

        const [user] = await db.query("SELECT * FROM Utilisateur WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        const utilisateur = user[0];

 
        const isMatch = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }


        const token = jwt.sign(
            { id: utilisateur.id, email: utilisateur.email }, 
            SECRET_KEY, 
            { expiresIn: "1h" } 
        );

        res.json({ token, message: "Connexion réussie !" });

    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
};
