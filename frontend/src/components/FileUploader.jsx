import React, { useState } from "react";
import { uploadFile } from "../services/api";

export default function FileUploader() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Choisis un fichier !");
    try {
      await uploadFile(file);
      alert("Fichier envoyé avec succès !");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’envoi du fichier.");
    }
  };

  return (
    <div className="card">
      <h2>Uploader un fichier</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Envoyer</button>
    </div>
  );
}
