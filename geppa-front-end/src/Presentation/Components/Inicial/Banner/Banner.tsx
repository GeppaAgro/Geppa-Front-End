import {Col, Container, Image, Row} from "react-bootstrap";
import Logo from "../../../../Data/Images/Logos/Logo.png";
import "./banner.css";
import {Link} from "react-router-dom";

export const Banner = () => {
    return (
        <>
            <Container className="banner-home mt-3 mb-3">
                <Row className="p-4 align-items-center text-center justify-content-center">
                    <Col xs={5} lg={2} className="ps-lg-4">
                        <Image src={Logo} className="banner-home__container-img mt-2 h-50" fluid/>
                    </Col>
                    <Col lg={4}>
                        <h2 className="banner-home__container-titulo fs-4 mt-2 mt-lg-0">Grupo de Estudo e Pesquisa em
                            Produção
                            Animal</h2>
                        <div className="d-grid gap-3 justify-content-center mt-3">
                            <Link className="banner-home__container-link" to={"/boletins"}>Boletins</Link>
                            <Link className="banner-home__container-link link__maisgeppa " to={"#"}>Mais GEPPA</Link>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <p className=" m-0 pe-lg-5 banner-home__container-text fs-5 mt-3 mt-lg-0">
                            O boletim informativo GEPPA é uma publicação semanal sobre notícias, eventos, tecnologias e
                            estatísticas de preços relacionados ao agronegócio animal. Todo material é produzido e
                            elaborado por Alunos e Professores integrantes deste grupo de pesquisa atuante desde 2010.
                            Este grupo de Pesquisa é coordenado pelo Prof. Dr. Roberto de Andrade Bordin.
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
