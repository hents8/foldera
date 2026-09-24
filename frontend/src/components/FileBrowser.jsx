import { useState, useEffect } from "react";
import {
  ChevronLeft,
  Trash2,
  CheckSquare,
  Grid,
  List
} from "lucide-react";
import "../styles/FileBrowser.css";

const extensionIconMap = {
  folder: "folder-invoices",
  docx: "microsoft-word-2019",
  doc: "microsoft-word-2019",
  pdf: "pdf-2",
  txt: "text",
  xlsx: "microsoft-excel-2019",
  xls: "microsoft-excel-2019",
  pptx: "microsoft-powerpoint-2019",
  ppt: "microsoft-powerpoint-2019",
  mp3: "audio",
  wav: "audio",
  mp4: "video-file",
  mov: "video-file",
  avi: "video-file",
  mkv: "video-file",
  png: "image-file",
  jpg: "image-file",
  jpeg: "image-file",
  gif: "image-file",
  bmp: "image-file",
  svg: "image-file",
  zip: "zip",
  rar: "zip",
  json: "json",
  csv: "csv",
  html: "html-filetype",
  js: "javascript",
  jsx: "javascript",
  py: "python",
  default: "document"
};

export default function FileBrowser() {
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [selected, setSelected] = useState([]);
  const [viewMode, setViewMode] = useState("icons");

  useEffect(() => {
    fetch(`http://localhost:5000/api/tree?path=${encodeURIComponent(currentPath)}`)
      .then(res => res.json())
      .then(data => {
        setFiles(data);
        setSelected([]);
      })
      .catch(err => console.error("Erreur chargement fichiers:", err));
  }, [currentPath]);

  const openItem = (item) => {
    if (item.type === "directory") {
      setCurrentPath(prev => (prev ? `${prev}/${item.name}` : item.name));
    } else {
      window.open(`http://localhost:5000/uploads/${encodeURIComponent(item.path)}`, "_blank");
    }
  };

  const goToParent = () => {
    if (!currentPath) return;
    const parts = currentPath.split("/").filter(Boolean);
    parts.pop();
    setCurrentPath(parts.join("/"));
  };

  const toggleSelect = (path) => {
    setSelected(prev => prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]);
  };

  const toggleSelectAll = () => {
    if (selected.length === files.length) setSelected([]);
    else setSelected(files.map(f => f.path));
  };
const getIcon = (item) => {
  const ext = item.type === "directory"
    ? "folder"
    : item.name.split(".").pop().toLowerCase();

  const iconMap = {
    folder: "https://img.icons8.com/color/96/folder-invoices--v1.png",
    pdf: "https://img.icons8.com/color/96/pdf.png",
    docx: "https://img.icons8.com/color/96/microsoft-word-2019.png",
    xlsx: "https://img.icons8.com/color/96/microsoft-excel-2019.png",
    pptx: "https://img.icons8.com/color/96/microsoft-powerpoint-2019.png",
    txt: "https://img.icons8.com/color/96/txt.png",
    png: "https://img.icons8.com/color/96/image.png",
    jpg: "https://img.icons8.com/color/96/image.png",
    jpeg: "https://img.icons8.com/color/96/image.png",
    mp3: "https://img.icons8.com/color/96/audio-file.png",
    mp4: "https://img.icons8.com/color/96/video-file.png",
    default: "https://img.icons8.com/color/96/file.png"
  };

  const url = iconMap[ext] || iconMap.default;
  return <img src={url} alt={ext} className="icon" />;
};


  const onDragStart = (e, path) => {
    e.dataTransfer.setData("text/plain", path);
  };

  const onDrop = (e, targetDir) => {
    e.preventDefault();
    const draggedPath = e.dataTransfer.getData("text");
    alert(`Déplacer ${draggedPath} vers ${targetDir || "/"}`);
  };

  const onDragOver = (e) => e.preventDefault();

  return (
  <div className="file-browser-wrapper">
    {/* 🔹 Barre d’action principale */}
    <div className="file-browser-header">
      {/* Gauche : navigation et chemin */}
      <div className="header-left">
        <button onClick={goToParent} title="Dossier parent" className="nav-btn">
          <ChevronLeft size={20} />
        </button>

        <span className="current-path">
          {currentPath ? `/${currentPath}` : "Ce PC"}
        </span>
      </div>

      {/* Droite : actions */}
      <div className="header-right">
        <button
          onClick={() => setViewMode(viewMode === "icons" ? "list" : "icons")}
          className="action-btn"
          title={viewMode === "icons" ? "Vue liste" : "Vue icônes"}
        >
          {viewMode === "icons" ? <List size={18} /> : <Grid size={18} />}
        </button>

        <button
          onClick={toggleSelectAll}
          className="action-btn"
          title="Sélectionner / désélectionner tout"
        >
          <CheckSquare size={18} />
          <span className="action-label">
            {selected.length === files.length
              ? "Tout désélectionner"
              : "Tout sélectionner"}
          </span>
        </button>

        <button
          onClick={() => alert(`Suppression de ${selected.length} élément(s)`)}
          disabled={selected.length === 0}
          className={`action-btn delete-btn ${
            selected.length ? "active" : "disabled"
          }`}
          title="Supprimer les fichiers sélectionnés"
        >
          <Trash2 size={18} />
          <span className="action-label">Supprimer</span>
        </button>
      </div>
    </div>

    {/* 🔹 Contenu principal */}
    <div
      className="file-browser-content"
      onDrop={(e) => onDrop(e, currentPath)}
      onDragOver={onDragOver}
    >
      {viewMode === "icons" ? (
        <div className="file-grid">
          {files.map((item) => (
            <div
              key={item.path}
              className={`file-item ${
                selected.includes(item.path) ? "selected" : ""
              }`}
              draggable
              onDragStart={(e) => onDragStart(e, item.path)}
              onClick={() => toggleSelect(item.path)}
              onDoubleClick={() => openItem(item)}
            >
              <div className="file-icon">{getIcon(item)}</div>
              <div className="file-name">{item.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <table className="file-table">
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {files.map((item) => (
              <tr
                key={item.path}
                className={selected.includes(item.path) ? "selected-row" : ""}
                draggable
                onDragStart={(e) => onDragStart(e, item.path)}
                onClick={() => toggleSelect(item.path)}
                onDoubleClick={() => openItem(item)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(item.path)}
                    readOnly
                  />
                </td>
                <td className="file-row-name">
                  {getIcon(item)} <span>{item.name}</span>
                </td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

}
