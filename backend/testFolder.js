import fs from "fs";

const folderPath = "C:/Partage"; // ton dossier simple

// Vérifie si le dossier existe
console.log("Dossier existe ?", fs.existsSync(folderPath));

// Liste les fichiers et sous-dossiers
try {
  const files = fs.readdirSync(folderPath);
  console.log("Contenu du dossier :", files);
} catch (err) {
  console.error("Erreur lecture dossier :", err.message);
}
