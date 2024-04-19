// Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Image} from "react-bootstrap";
import LogoHorizontal from "../../../Data/Images/Logos/LogoHorizontal.png";

const Sidebar: React.FC = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
            <ul className="nav nav-pills flex-column mb-auto">
                <NavLink to={"/admin"} className="nav-img">
                    <Image className="navbar-brand img-fluid " role="button"
                           src={LogoHorizontal}/>
                </NavLink>
                <li className="nav-item">
                    <NavLink to="/" className="nav-link active" aria-current="page">
                        Inicial
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/boletins" className="nav-link">
                        Boletins
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/criar-boletins" className="nav-link">
                        Criar Boletins
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/alunos" className="nav-link">
                        Alunos
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
