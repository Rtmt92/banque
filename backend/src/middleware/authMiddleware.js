import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "super_secret"; 

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization"); 

    
    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
    }

    try {
        
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (err) {
        res.status(403).json({ message: "Token invalide." });
    }
};
