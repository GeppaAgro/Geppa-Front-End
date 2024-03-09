import "./Footer.css"
import {NavLink} from "react-router-dom";
import {Col, Form, Image, Row} from "react-bootstrap";
import LogoHorizontal from "../../../Data/Images/Logos/LogoHorizontalCompleto.png";
import LogoCps from "../../../Data/Images/Logos/CPS_logo.png";
import LogoFatec from "../../../Data/Images/Logos/FatecLogo.png";
import LogoGovernoSaoPaulo from "../../../Data/Images/Logos/SPgovLogo.png";
import LogoPodAgro from "../../../Data/Images/Logos/PodagroLogo.png";


export default function Footer() {
    return (
        <>
            <footer className="py-1 footer">

                <div className="d-flex align-items-center gap-3 flex-column py-4 flex-sm-row">
                    <div className=" d-sm-flex justify-content-sm-start text-center">
                        <Image src={LogoHorizontal} className="footer-img" fluid/>
                    </div>
                </div>
                <Row>
                    <Col xs={6} md={2} className="mb-3">
                        <NavLink to="/boletins">
                            <h5>Boletim</h5>
                        </NavLink>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0">Artigos</NavLink>
                            </li>
                            <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 ">Cursos</NavLink>
                            </li>
                            <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 ">Eventos</NavLink>
                            </li>
                            <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 ">Noticias</NavLink>
                            </li>
                            <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 ">Vídeos</NavLink>
                            </li>
                        </ul>
                    </Col>

                    <Col xs={6} md={2} className="mb-3">
                        <NavLink to="/indicadores">
                            <h5>Indicadores</h5>
                        </NavLink>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 ">Dashboards</NavLink>
                            </li>
                            <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 ">Tabelas</NavLink>
                            </li>
                        </ul>
                    </Col>

                    <Col xs={6} md={2} className="mb-3">
                        <NavLink to="/">
                            <h5>PodAgro</h5>
                        </NavLink>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 ">Podcast</NavLink>
                            </li>
                            <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 ">Instagram</NavLink>
                            </li>
                            <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 ">Youtube</NavLink>
                            </li>
                        </ul>
                    </Col>

                    <Col md={5} className="offset-md-1 mb-3">
                        <Form>
                            <h5 className="text-center titulo-inscricao-newslleter">Inscreva-se para receber nossos
                                boletins informativos por e-mail.</h5>
                            <div className="d-flex row flex-sm-row gap-2 footer-input-newslleter">
                                <input id="/" type="email" className="form-control "
                                       placeholder="Insira seu E-mail"/>
                                <div className="d-flex flex-column justify-content-center flex-sm-row gap-2 footer-buttons">
                                    <NavLink to="/sobre"
                                             className="btn border-3 fw-semibold"> Saiba
                                        Mais </NavLink>
                                    <button className="btn text-white fw-semibold"
                                            type="submit">Cadastrar
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <div>
                    <Row className="d-flex align-items-center justify-content-center">
                        <Col xs={6} sm={3} className="d-flex align-items-center justify-content-center">
                            <Image src={LogoFatec} className="footer-logos-img"/>
                        </Col>
                        <Col xs={6} sm={3} className="d-flex align-items-center justify-content-center">
                            <Image src={LogoCps} className="footer-logos-img"/>
                        </Col>
                        <Col xs={6} sm={3} className="d-flex align-items-center justify-content-center">
                            <Image src={LogoGovernoSaoPaulo} className="footer-logos-img"/>
                        </Col>
                        <Col xs={6} sm={3} className="d-flex align-items-center justify-content-center">
                            <Image src={LogoPodAgro} className="footer-logos-img"/>
                        </Col>
                    </Row>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>© 2024 GEPPA, Todos os direitos reservados. Desenvolvido por: <a target="_blank" href="https://www.linkedin.com/in/lucas-henrique-lh/">Lucas Henrique</a>, <a target="_blank" href="https://www.linkedin.com/in/devluanrodrigues/">Luan Rodrigues</a>, <a target="_blank" href="https://github.com/FellipeGodoi">Fellipe Godoi</a>.
                    </p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><a className="link-dark" href="#">
                            <i className="ri-instagram-line"></i>
                        </a></li>
                        <li className="ms-3"><a className="link-dark" href="#">
                            <i className="ri-linkedin-fill"></i>
                        </a></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}