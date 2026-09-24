import { useEffect, useState } from "react";

export default function FileExplorer() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tree")
      .then(res => res.json())
      .then(setFiles)
      .catch(console.error);
  }, []);

  const renderTree = (parentPath) => {
    const children = files.filter(f => f.parent === parentPath);
    if (children.length === 0) return null;

    return (
      <ul style={{ marginLeft: "20px" }}>
        {children.map(f => (
          <li key={f.path}>
            {f.type === "folder" ? (
              <>
                📁 {f.name}
                {renderTree(f.path)}
              </>
            ) : (
              <>📄 {f.name}</>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const root = files.find(f => f.parent === "C:\\Partage" || f.parent === "/home/user/partage");

  return (
    <div>
      <h2>Explorateur de fichiers</h2>
      {root ? renderTree(root.parent) : <p>Chargement...</p>}
    </div>
  );
}
