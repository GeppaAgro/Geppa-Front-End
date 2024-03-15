import "./StyleAreaInscricao.css"
import {Container} from "react-bootstrap";

export default function AreaInscricao ()  {
    return(
        <>
            <Container className="area-inscricao mt-3 mb-3 d-flex flex-column justify-content-center p-3 align-items-center">
                <h4 className="area-inscricao-text text-center mt-2 mt-lg-0 fw-bold col-12 col-md-8">
                    Inscreva-se para receber nossos
                    boletins informativos por e-mail.
                </h4>
                    <input type="email"
                           id="email"
                           name="email"
                           placeholder="Exemplo@email.com"
                           className="area-inscricao-email mt-3 col-lg-6 col-8 p-2 px-3 fs-6 fw-semibold"/>
                <div className="area-inscricao-botoes  d-flex flex-column flex-md-row gap-2 my-2  ">
                    <button className="area-inscricao-saiba-mais-btn me-0 mb-md-0 fs-6  fw-semibold px-4 py-2">
                        Saiba mais
                    </button>
                    <button className="area-inscricao-cadastrar-btn fs-6 fw-semibold px-4 py-2">
                        Cadastrar
                    </button>
                </div>
            </Container>
        </>
    )
}