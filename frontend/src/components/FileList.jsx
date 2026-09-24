import React, { useEffect, useState } from "react";
import { getFiles } from "../services/api";

export default function FileList({ onSelect }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFiles().then(setFiles).catch(console.error);
  }, []);

  return (
    <div className="card">
      <h2>Liste des fichiers</h2>
      <ul>
        {files.map((f) => (
          <li key={f.name} onClick={() => onSelect(f)}>
            {f.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
