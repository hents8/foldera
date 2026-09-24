import React, { useState } from "react";
import axios from "../services/api";

const FolderSync = () => {
  const [folderPath, setFolderPath] = useState("");
  const [message, setMessage] = useState("");
  const [accessUrl, setAccessUrl] = useState("");

  const handleSync = async () => {
    if (!folderPath.trim()) {
      alert("Veuillez entrer le chemin du dossier à synchroniser.");
      return;
    }

    try {
      const res = await axios.post("/api/sync", { folderPath });
      setMessage(res.data.message);
      setAccessUrl(res.data.accessibleAt);
    } catch (err) {
      setMessage("❌ Erreur de synchronisation");
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-[500px] mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-3">📂 Synchroniser un dossier local</h2>
      <input
        type="text"
        placeholder="Ex: D:/MesFichiers/Documents"
        value={folderPath}
        onChange={(e) => setFolderPath(e.target.value)}
        className="border p-2 w-full rounded mb-3"
      />
      <button
        onClick={handleSync}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🔁 Synchroniser
      </button>

      {message && (
        <div className="mt-4 text-center">
          <p>{message}</p>
          {accessUrl && (
            <a href={accessUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Ouvrir le dossier synchronisé
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default FolderSync;
