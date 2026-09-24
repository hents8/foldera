import axios from "axios";

// Mets ici l’IP du PC serveur sur ton réseau local
export default axios.create({
  baseURL: "http://localhost:5000", // ou http://192.168.X.X:5000
});
