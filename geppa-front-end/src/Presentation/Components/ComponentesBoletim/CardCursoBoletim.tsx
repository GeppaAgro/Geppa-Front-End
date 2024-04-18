import "./StyleCardBoletim.css"
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Curso} from "../../../Domain/TypesConteudos/TypeCurso.ts";
import {validaData} from "../Utils/ValidacaoDeData.ts";

const CardCursoBoletim: React.FC <{curso : Curso}> = ({curso}) => {
    return(
        <>
            <Container className="card-boletim p-5 mt-1 mb-3 d-flex flex-column justify-content-start p-3">
                <p className="card-boletim-titulo fs-5 fw-bold">
                    {curso.titulo.toUpperCase()}
                </p>
                <div className="card-boletim-informacoes fw-bold fs-6">
                    <div className="d-flex flex-column flex-sm-row gap-3 gap-sm-5">
                        {
                            curso.duracaoEmHoras !== null && (
                                <p>
                                    Duração em horas: {curso.duracaoEmHoras} horas
                                </p>
                            )
                        }
                        {
                            curso.prazoInscricao && validaData(curso.prazoInscricao.toString()) && (
                                <p>
                                    Prazo para inscrição:  {new Date(curso.prazoInscricao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                </p>
                            )
                        }
                    </div>
                    {
                        curso.preco === 0 ? (
                            <p>Gratuito</p>
                        ) : (
                            <p>Preço: R$ {curso.preco.toFixed(2)}</p>
                        )
                    }
                </div>
                <p className="card-boletim-descricao mt-2 mt-lg-0 fs-6 fw-medium">
                    {curso.descricao}
                </p>
                <div
                    className="card-boletim-footer d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div
                        className="tags-boletim d-flex flex-wrap justify-content-start justify-content-md-end mb-2 mb-md-0 gap-3">
                        {
                            curso.tags.map(tag => (
                                <span className="card-boletim-tags p-3 fs-6 fw-semibold " key={tag.id}> {tag.nome} </span>
                            ))
                        }
                    </div>
                    {
                        curso.link !== null && (
                            <div className="link-boletim mt-3 mt-md-0 card-boletim-btn p-3 ">
                                <Link to={curso.link} className="fs-6 fw-bold ">
                                    Visitar pagina do curso
                                </Link>
                            </div>
                        )
                    }

                </div>
            </Container>
        </>
    )
}
export default CardCursoBoletim