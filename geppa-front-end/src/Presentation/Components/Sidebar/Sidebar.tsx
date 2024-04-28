import React from 'react';
import {NavLink} from 'react-router-dom';
import {Image} from "react-bootstrap";
import LogoHorizontalBranca from "../../../Data/Images/Logos/LogoHorizontalBranca.png";
import './sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark">
                <li className="nav-item sidebar-brand d-flex mb-2">
                    <NavLink to="/admin" className="nav-link">
                        <div className="sidebar-brand-icon">
                            <Image src={LogoHorizontalBranca} alt="GEPPA Logo" fluid className={"px-3"}/>
                        </div>
                    </NavLink>
                </li>
                <div className={"ps-3"}>
                    <li className="nav-item">
                        <NavLink to="/admin" className="nav-link" aria-label="Inicial">
                            <i className="ri-home-fill pe-2"></i>
                            <span>Inicial</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/boletins" className="nav-link" aria-label="Boletins">
                            <i className="ri-article-fill pe-2"></i>
                            <span>Boletins</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/criar-boletins" className="nav-link" aria-label="Criar Boletins">
                            <i className="ri-file-add-fill pe-2"></i>
                            <span>Criar Boletins</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/tags" className="nav-link" aria-label="Tags">
                            <i className="ri-bookmark-fill pe-2"></i>
                            <span>Tags</span>
                        </NavLink>
                    </li>
                </div>

                <hr className="sidebar-divider mt-auto mx-3"/>
                <li className="nav-item ps-3">
                    <NavLink to="/login" className="nav-link" aria-label="Sair">
                        <i className="ri-logout-box-line pe-2"></i>
                        <span>Sair</span>
                    </NavLink>
                </li>
            </ul>
        </>
    );
};

export default Sidebar;
