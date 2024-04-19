import LogoHorizontal from "../../../Data/Images/Logos/LogoHorizontal.png";
import "./header.css";
import {NavLink} from "react-router-dom";
import {Image} from "react-bootstrap";

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white shadow-sm">
                <div className="container-fluid px-5">
                    <div className="d-flex justify-content-between">
                        <NavLink to={"/"} className="nav-img">
                            <Image className="navbar-brand img-fluid " role="button"
                                   src={LogoHorizontal}/>
                        </NavLink>
                        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon botao"/>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarScroll">
                        <ul className="navbar-nav fs-5 navbar-nav-scroll gap-2 align-items-center">
                            <li className="nav-link" aria-current="page">
                                <NavLink className="text-decoration-none nav-link-font" to="/">Inicial</NavLink>
                            </li>
                            <li className="nav-link" aria-current="page">
                                <NavLink className="text-decoration-none nav-link-font"
                                         to="/boletins">Boletins</NavLink>
                            </li>
                            <li className="nav-link" aria-current="page">
                                <NavLink className="text-decoration-none nav-link-font"
                                         to="/conteudos">Conteúdos</NavLink>
                            </li>
                            {
                                //<li className="nav-link" aria-current="page">
                                //                                 <NavLink className="text-decoration-none nav-link-font"
                                //                                          to="/indicadores">Indicadores</NavLink>
                                //                             </li>
                            }
                            {
                                //<li className="nav-link " aria-current="page">
                                //                                 <NavLink className="text-decoration-none nav-link-font"
                                //                                          to="/sobre">Sobre</NavLink>
                                //                             </li>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;