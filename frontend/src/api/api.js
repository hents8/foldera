import axios from "axios";

const api = axios.create({
  baseURL: "http://172.17.4.102:5000/api", // ← change avec ton IP LAN
});

export default api;
