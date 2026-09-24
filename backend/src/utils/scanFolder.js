import fs from "fs";
import path from "path";
import FileItem from "../models/FileModel.js";

const BASE_DIR = "C:/Partage";

// 🔁 Fonction récursive pour lire tout le dossier
export const scanAndSyncFolder = async (dir = BASE_DIR) => {
  const entries = fs.readdirSync(dir);

  for (const name of entries) {
    const fullPath = path.join(dir, name);
    const stats = fs.statSync(fullPath);
    const relPath = path.relative(BASE_DIR, fullPath).replace(/\\/g, "/");

    // Vérifie si déjà en base
    const existing = await FileItem.findOne({ path: relPath });

    const fileData = {
      name,
      path: relPath,
      type: stats.isDirectory() ? "directory" : "file",
      size: stats.isDirectory() ? null : Math.round(stats.size / 1024),
      modified: stats.mtime.toLocaleString(),
    };

    if (existing) {
      // 🔄 Mise à jour si modifié
      await FileItem.updateOne({ _id: existing._id }, fileData);
    } else {
      // ➕ Nouveau fichier/dossier
      await FileItem.create(fileData);
    }

    // 🧭 Si dossier → on descend dedans
    if (stats.isDirectory()) {
      await scanAndSyncFolder(fullPath);
    }
  }
};
