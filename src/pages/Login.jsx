import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, SOCKET_URL, APP_NAME } from "../config";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //console.log(API_URL);
    try {
      const response = await axios.post(
        API_URL + "/login",
        { user, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        //console.log("Response:", response);
        //console.log("Cookies:", document.cookie);
        const { instances } = response.data;
        // Salva como String (LocalStorage só aceita string)
        localStorage.setItem("user_instances", JSON.stringify(instances));
        // Opcional: Salva a primeira ou a selecionada como "ativa"
        localStorage.setItem("selected_instance", instances[0]);

        navigate("/chats");
      }
    } catch (error) {
      //console.error("Erro no login:", error);
      setError(error.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h3 className="login-title">Bem-vindo ao EasyChat</h3>
        <div className="login-form">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="login-inputs-row">
              <label className="input-label">Usuario</label>
              <input
                className="user-input"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Digite seu usuario"
                required
              />
            </div>
            <div className="login-inputs-row">
              <label className="input-label">Senha</label>
              <input
                className="pwd-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>
            <div className="login-buttons">
              <button className="login-button" type="submit">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
