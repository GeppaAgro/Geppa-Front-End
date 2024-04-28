import React from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from "react-bootstrap";
import LogoHorizontalBranca from "../../../Data/Images/Logos/LogoHorizontalBranca.png";
import './sidebar.css'; // Importando o arquivo de estilo CSS para a sidebar

const Sidebar: React.FC = () => {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <li className="nav-item sidebar-brand d-flex align-items-center justify-content-center">
        <NavLink to="/admin" className="nav-link">
          <div className="sidebar-brand-icon">
            <Image src={LogoHorizontalBranca} alt="GEPPA Logo" fluid />
          </div>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/admin" className="nav-link">
          <span>Inicial</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/admin/boletins" className="nav-link">
          <span>Boletins</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/admin/criar-boletins" className="nav-link">
          <i className="fas fa-edit"></i>
          <span>Criar Boletins</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/admin/alunos" className="nav-link">
          <i className="fas fa-users"></i>
          <span>Alunos</span>
        </NavLink>
      </li>

    </ul>
  );
};

export default Sidebar;
