import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function connectWithRetry() {
  let connected = false;
  let connection;

  while (!connected) {
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });

      console.log("✅ Connecté à la base de données MySQL");
      connected = true;
    } catch (err) {
      console.error("❌ Connexion à MySQL échouée. Nouvelle tentative dans 3 secondes...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  return connection;
}

const db = await connectWithRetry();
export default db;
