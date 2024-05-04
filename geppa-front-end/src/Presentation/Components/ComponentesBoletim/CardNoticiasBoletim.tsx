import "./StyleCardBoletim.css"
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Noticia} from "../../../Domain/TypesConteudos/Conteudos/TypeNoticia.ts";
import {validaData} from "../Utils/ValidacaoDeData.ts";

const CardNoticiaBoletim: React.FC <{noticia : Noticia}> = ({noticia}) => {
    return(
        <Container className="card-boletim p-5 mt-1 mb-3 d-flex flex-column justify-content-start p-3">
            <p className="card-boletim-titulo fs-5 fw-bold">
                {noticia.titulo.toUpperCase()}
            </p>
            <div className="card-boletim-informacoes fw-bold fs-6">
                {
                    noticia.dataPublicacao && validaData(noticia.dataPublicacao.toString()) &&(
                        <p>
                            Data de publicação:  {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                        </p>
                    )
                }
            </div>
            <p className="card-boletim-descricao mt-2 mt-lg-0 fs-6 fw-medium">
                {noticia.descricao}
            </p>
            <div
                className="card-boletim-footer d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div
                    className="tags-boletim d-flex flex-wrap justify-content-start justify-content-md-end mb-2 mb-md-0 gap-3">
                    {
                        noticia.tags.map(tag => (
                            <span className="card-boletim-tags p-3 fs-6 fw-semibold " key={tag.id}> {tag.nome} </span>
                        ))
                    }
                </div>
                {
                    noticia.link !== null && (
                        <div className="link-boletim mt-3 mt-md-0 card-boletim-btn p-3 ">
                            <Link to={noticia.link} className="fs-6 fw-bold ">
                                Visitar Noticia
                            </Link>
                        </div>
                    )
                }
            </div>
        </Container>
    )
}

export default CardNoticiaBoletim