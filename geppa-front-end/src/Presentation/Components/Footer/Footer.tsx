import "./StyleFooter.css"
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import LogoHorizontal from "../../../Data/Images/Logos/LogoHorizontalCompleto.png";

export default function Footer() {
    return(
        <>
            <footer className="py-1 footer">

                <div className="d-flex align-items-center flex-column pt-3 flex-sm-row mb-2">
                    <div className="">
                            <Image src={LogoHorizontal} className="footer-img w-50" fluid/>
                    </div>
                    <div className="">
                        <p className="footer-describe mb-sm-5">
                            Lorem ipsum dolor sit amet consectetur. Id mi amet faucibus magna mattis purus ultrices at tortor...
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 col-md-2 mb-3">
                        <Link to="/boletins">
                            <h5>Boletim</h5>
                        </Link>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">Artigos</Link>
                            </li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 ">Cursos</Link>
                            </li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 ">Eventos</Link>
                            </li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 ">Noticias</Link>
                            </li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 ">Vídeos</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <Link to="/indicadores">
                            <h5>Indicadores</h5>
                        </Link>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 ">Dashboards</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 ">Tabelas</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <Link to="/">
                            <h5>PodAgro</h5>
                        </Link>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 ">Podcast</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 ">Instagram</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 ">Youtube</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-5 offset-md-1 mb-3">
                        <form>
                            <h5>Inscreva-se para receber nossos boletins informativos por e-mail.</h5>
                            <div className="d-flex row flex-sm-row w-100 gap-2">
                                <input id="/" type="text" className="form-control border-3"
                                       placeholder="Exemplo@exemplo.com"/>
                                <div className="d-flex flex-column justify-content-center flex-sm-row gap-2">
                                    <Link to="/" className="btn border-3 fw-semibold footer-button-saibamais"> Saiba
                                        Mais </Link>
                                    <button className="btn text-white fw-semibold footer-button-cadastrar"
                                            type="button">Cadastrar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                        <p>© 2022 Company, Inc. All rights reserved.</p>
                        <ul className="list-unstyled d-flex">
                            <li className="ms-3"><a className="link-dark" href="#">
                                <i className="ri-twitter-x-line"></i>
                            </a></li>
                            <li className="ms-3"><a className="link-dark" href="#">
                                <i className="ri-instagram-line"></i>
                            </a></li>
                            <li className="ms-3"><a className="link-dark" href="#">
                                <i className="ri-facebook-fill"></i>
                            </a></li>
                        </ul>
                    </div>
            </footer>
        </>
)
}