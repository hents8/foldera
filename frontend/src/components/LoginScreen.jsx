// src/components/Login.jsx
import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "test" && password === "test") {
      onLogin();
    } else {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Effet de fond en verre */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/10"></div>

      {/* Carte de connexion */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 w-96 text-white"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back 👋</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="test"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-300 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold text-white transition"
        >
          Se connecter
        </button>

        <p className="text-center text-sm text-gray-200 mt-4">
          Utilisez <strong>test / test</strong> pour accéder
        </p>
      </form>
    </div>
  );
}
