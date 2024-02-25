import "./StyleCardBoletim.css"
import {Container} from "react-bootstrap";
import {EventoTeste} from "../../Pages/CommonUser/Boletim/TypesForTest.ts";
import {Link} from "react-router-dom";

const CardEventoBoletim: React.FC<{ evento: EventoTeste }> = ({evento}) =>{
    return  (
        <Container className="card-boletim p-5 mt-3 mb-3 d-flex flex-column justify-content-start p-3">
            <p className="card-boletim-titulo fs-3 fw-bold">
                {evento.titulo.toUpperCase()}
            </p>
            <div className="card-boletim-informacoes fw-semibold fs-5">
                <div className="d-flex flex-column flex-sm-row gap-3 gap-sm-5">
                    <p>
                        Inicio do evento: {evento.dataInicio} - {evento.horarioInicio}
                    </p>
                    <p>
                        Local: {evento.local}
                    </p>
                </div>
                <div className="d-flex flex-column flex-sm-row gap-3 gap-sm-5">
                    <p>
                        Termino do evento: {evento.dataFim} - {evento.horarioFim}
                    </p>
                        {
                            evento.valor === 0 ? (
                                <p>Entrada Gratuito</p>
                            ) : (
                                <p>Preço: R$ {evento.valor.toFixed(2)}</p>
                            )
                        }
                </div>
            </div>
            <p className="card-boletim-descricao mt-2 mt-lg-0 fs-5 fw-medium">
                {evento.descricao}
            </p>
            <div
                className="card-boletim-footer d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div
                    className="tags-boletim d-flex flex-wrap justify-content-start justify-content-md-end mb-2 mb-md-0">
                    {
                        evento.tags.map(tag => (
                            <span className="card-boletim-tags p-3 fs-6 fw-semibold me-3" key={tag}> {tag} </span>
                        ))
                    }
                </div>
                <div className="link-boletim mt-3 mt-md-0">
                    <Link to={evento.link} className="card-boletim-btn p-3 fs-5 fw-bold ">
                        Ir para o artigo
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default CardEventoBoletim
