import "./StyleBoletimBanner.css"
import LogoBranco from '../../../Data/Images/Logos/LogoBranco.png'
import {Container, Image} from "react-bootstrap";
export default function BoletimBanner() {
    return (
        <div className="bannerBoletim p3">
            <Container className="d-flex flex-column justify-content-between flex-sm-row align-items-center py-3">
                <div className="texto-banner-boletim col-8 ps-md-5">
                    <p className="fs-5 ">Boletim Informativo</p>
                    <p className="fs-4 ps-md-5 fw-bold ">
                        GRUPO DE ESTUDO E PESQUISA EM PRODUÇÃO ANIMAL
                    </p>
                    <p className="fs-5 ps-md-5">
                        Faculdade de Tecnologia Mogi das Cruzes
                    </p>
                </div>
                <div className="imagem-banner-boletim col-2">
                    <Image src={LogoBranco}
                           alt="Logo-geppa-branco"
                           className="logo-banner-boletim"
                           fluid/>
                </div>
            </Container>
        </div>


    )
}