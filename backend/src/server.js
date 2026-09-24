import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { connectDB } from "./config/db.js";
import syncRoutes from "./routes/syncRoutes.js";
import { scanAndSyncFolder } from "./utils/scanFolder.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // ou http://localhost:3000
}));

app.use(express.json());

// 📁 Dossier fixe à partager
const folderPath = "C:/Partage";

// 🧩 Vérification de l'existence du dossier
if (!fs.existsSync(folderPath)) {
  console.error(`❌ Le dossier ${folderPath} n'existe pas. Créez-le ou modifiez le chemin.`);
  process.exit(1);
}

// 🌐 Connexion MongoDB
connectDB().catch(err => {
  console.error("❌ Impossible de se connecter à MongoDB :", err.message);
  process.exit(1);
});

connectDB().then(async () => {
  console.log("✅ MongoDB connecté");
  console.log("📦 Synchronisation du dossier C:/Partage...");
  await scanAndSyncFolder();
  console.log("✅ Synchronisation terminée !");
}).catch((err) => {
  console.error("❌ Erreur MongoDB :", err.message);
  process.exit(1);
});


// 🧭 Routes API existantes
app.use("/api", syncRoutes);


// 📂 Fichiers statiques (téléchargement direct)
app.use("/uploads", express.static(folderPath));

// 🚀 Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  console.log(`📁 Dossier partagé : ${folderPath}`);
});

