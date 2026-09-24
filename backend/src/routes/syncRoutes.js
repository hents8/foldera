import express from "express";
import fs from "fs";
import path from "path";
import FileItem from "../models/FileModel.js"; // ✅ Corrigé : extension .js

const router = express.Router();
const BASE_DIR = "C:/Partage";

/**
 * 🔁 Fonction récursive pour parcourir tous les fichiers du dossier
 * et les insérer dans MongoDB si absents.
 */
const scanAndSyncFolder = async (dirPath = BASE_DIR) => {
  const items = fs.readdirSync(dirPath);

  for (const name of items) {
    const fullPath = path.join(dirPath, name);
    const stats = fs.statSync(fullPath);
    const relativePath = path.relative(BASE_DIR, fullPath).replace(/\\/g, "/");

    const existing = await FileItem.findOne({ path: relativePath });

    // 🗂️ Si non existant → on l’ajoute
    if (!existing) {
      await FileItem.create({
        name,
        path: relativePath,
        type: stats.isDirectory() ? "directory" : "file",
        size: stats.isDirectory() ? null : Math.round(stats.size / 1024),
        modified: stats.mtime,
      });
      console.log("🆕 Ajouté :", relativePath);
    }

    // 🔁 Si c’est un dossier → on scanne récursivement
    if (stats.isDirectory()) {
      await scanAndSyncFolder(fullPath);
    }
  }
};

/**
 * 🔄 Route pour lancer une synchronisation complète manuellement
 */
router.get("/sync", async (req, res) => {
  try {
    await scanAndSyncFolder();
    res.json({ message: "Synchronisation complète réussie ✅" });
  } catch (err) {
    console.error("❌ Erreur de synchronisation :", err);
    res.status(500).json({ error: "Erreur pendant la synchronisation" });
  }
});

/**
 * 🌳 Route pour afficher la structure du dossier
 */
router.get("/tree", async (req, res) => {
  try {
    const safePath = path
      .normalize(req.query.path || "")
      .replace(/^(\.\.(\/|\\|$))+/, "");

    const dirPath = path.join(BASE_DIR, safePath);

    if (!dirPath.startsWith(path.resolve(BASE_DIR))) {
      return res.status(403).json({ error: "Accès non autorisé" });
    }

    if (!fs.existsSync(dirPath)) {
      return res.status(404).json({ error: "Dossier introuvable" });
    }

    const items = fs.readdirSync(dirPath).map((name) => {
      const fullPath = path.join(dirPath, name);
      const stats = fs.statSync(fullPath);

      return {
        name,
        path: path.relative(BASE_DIR, fullPath).replace(/\\/g, "/"),
        type: stats.isDirectory() ? "directory" : "file",
        size: stats.isDirectory() ? null : Math.round(stats.size / 1024),
        modified: stats.mtime.toLocaleString(),
      };
    });

    res.json(items);
  } catch (err) {
    console.error("Erreur lecture dossier:", err);
    res.status(500).json({ error: "Erreur lecture dossier" });
  }
});

export default router;
