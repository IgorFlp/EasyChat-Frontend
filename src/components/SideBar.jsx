import React from 'react'
import { logout } from '../services/AuthService'
import 'bootstrap-icons/font/bootstrap-icons.css'
const SideBar = () => {
  function handleLogout(){
  logout();
  }
  return (
    <div className="side-bar-menu">
        <label className="logout side-bar-menu-item" onClick={handleLogout}><i className='bi bi-box-arrow-left'></i></label>
    </div>
  )
}

export default SideBar
