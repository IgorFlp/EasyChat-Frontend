// src/config.js

// Agora a constante API_URL vai pegar o valor do ambiente
// Se não encontrar nada (ex: erro no build), ele usa o localhost como fallback
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:3000/webhook";
// Se tiver outras constantes, faça o mesmo:
export const APP_NAME = import.meta.env.VITE_APP_NAME || "EasyChat";
