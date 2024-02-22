import "./StyleAreaInscricao.css"
import {Container} from "react-bootstrap";

export default function AreaInscricao ()  {
    return(
        <>
            <Container className="area-inscricao mt-3 mb-3 d-flex flex-column justify-content-center p-3 align-items-center">
                <h2 className="area-inscricao-text text-center mt-2 mt-lg-0 fw-bold col-6">
                    Inscreva-se para receber nossos
                    boletins informativos por e-mail.
                </h2>

                    <input type="email"
                           id="email"
                           name="email"
                           placeholder="Exemplo@email.com"
                           className="area-inscricao-email mt-3 col-6 p-3 fs-4 fw-semibold"/>
                <div
                    className="area-inscricao-botoes d-md-flex flex-md-row flex-column justify-content-between align-items-center px-5 mt-3 text-center gap-5">
                    <button className="area-inscricao-saiba-mais me-0 mb-2 mb-md-0 fs-5  fw-semibold px-4 py-2">
                        Saiba mais
                    </button>
                    <button className="area-inscricao-cadastrar fs-5 fw-semibold px-4 py-2">
                        Cadastrar
                    </button>
                </div>
            </Container>
        </>
    )
}