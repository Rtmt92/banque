import React, { useState } from "react";
import { FaHome, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import { logout } from "../utils/auth";
import "./Sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="toggle" onClick={() => setOpen(!open)}>
        <FaBars />
      </div>
      <div className="menu">

        <a href="/dashboard"><FaHome /> {open && <span>Dashboard</span>}</a>
        <a href="/profile"><FaUser /> {open && <span>Profil</span>}</a>
        <div onClick={logout}><FaSignOutAlt /> {open && <span>Déconnexion</span>}</div>
      </div>
    </div>
  );
};

export default Sidebar;
