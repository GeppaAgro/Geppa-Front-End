import "./StyleCardBoletim.css"
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Evento} from "../../../Domain/TypesConteudos/TypeEvento.ts";

const CardEventoBoletim: React.FC<{ evento: Evento }> = ({evento}) =>{
    return  (
        <Container className="card-boletim p-5 mt-1 mb-3 d-flex flex-column justify-content-start p-3">
            <p className="card-boletim-titulo fs-5 fw-bold">
                {evento.titulo.toUpperCase()}
            </p>
            <div className="card-boletim-informacoes fw-bold fs-6">
                <div className="d-flex flex-column flex-sm-row gap-3 gap-sm-5">

                    <p>
                        Inicio do evento:  {new Date(evento.dataHoraInicio).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </p>
                    {
                        evento.local !== null && (
                            <p>
                                Local: {evento.local}
                            </p>
                        )
                    }
                </div>
                <div className="d-flex flex-column flex-sm-row gap-3 gap-sm-5">
                    <p>
                        Termino do evento: {new Date(evento.dataHoraFim).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </p>
                        {
                            evento.preco === 0 ? (
                                <p>Entrada Gratuita</p>
                            ) : (
                                <p>Preço: R$ {evento.preco.toFixed(2)}</p>
                            )
                        }
                </div>
            </div>
            <p className="card-boletim-descricao mt-2 mt-lg-0 fs-6 fw-medium">
                {evento.descricao}
            </p>
            <div
                className="card-boletim-footer d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div
                    className="tags-boletim d-flex flex-wrap justify-content-start justify-content-md-end mb-2 mb-md-0 gap-3">
                    {
                        evento.tags.map(tag => (
                            <span className="card-boletim-tags p-3 fs-6 fw-semibold" key={tag.id}> {tag.nome} </span>
                        ))
                    }
                </div>
                {
                    evento.link !== null && (
                        <div className="link-boletim mt-3 mt-md-0 card-boletim-btn p-3 ">
                            <Link to={evento.link} className="fs-6 fw-bold " target={"_blank"}>
                                Ir para o Eventos
                            </Link>
                        </div>
                    )
                }
            </div>
        </Container>
    )
}

export default CardEventoBoletim
