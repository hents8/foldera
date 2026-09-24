import React from "react";

export default function FilePreview({ file }) {
  const isImage = file.name.match(/\.(jpg|jpeg|png|gif)$/i);

  return (
    <div className="card">
      <h2>Prévisualisation</h2>
      {isImage ? (
        <img src={file.url} alt={file.name} width="200" />
      ) : (
        <p>Aucune prévisualisation disponible</p>
      )}
    </div>
  );
}
