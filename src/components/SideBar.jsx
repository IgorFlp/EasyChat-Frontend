import React from "react";
import { logout } from "../services/AuthService";
import "bootstrap-icons/font/bootstrap-icons.css";
const SideBar = ({ onShowContactMenu }) => {
  function handleLogout() {
    logout();
  }
  function showContactList() {
    onShowContactMenu();
  }
  return (
    <div className="side-bar-menu">
      <div className="side-bar-menu-itens">
        <label className="logout side-bar-menu-item" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left"></i>
        </label>
        <label
          className="contacts side-bar-menu-item"
          onClick={showContactList}
        >
          <i className="bi bi-people-fill"></i>
        </label>
      </div>
      <div className="side-bar-menu-footer"></div>
    </div>
  );
};

export default SideBar;
