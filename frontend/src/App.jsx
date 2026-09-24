import { useState } from "react";
import FileBrowser from "./components/FileBrowser";
import './styles/app.css';
import './styles/FileBrowser.css';
import Login from "./components/LoginScreen";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => setIsAuthenticated(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="filebrowser-screen">
      {/* Header */}
      <div className="file-browser-header">
        <h1 className="text-2xl font-bold">🌐 Portail de partage local</h1>
        <button
          onClick={handleLogout}
          className="logout-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Déconnexion
        </button>
      </div>

      {/* Zone principale scrollable */}
      <div className="file-browser-container flex-1 p-4 overflow-auto bg-gray-50">
        <FileBrowser />
      </div>
    </div>
  );
}

export default App;
