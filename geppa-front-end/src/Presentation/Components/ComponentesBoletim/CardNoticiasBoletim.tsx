import "./StyleCardBoletim.css"
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Noticia} from "../../../Domain/TypesConteudos/TypeNoticia.ts";

const CardNoticiaBoletim: React.FC <{noticia : Noticia}> = ({noticia}) => {
    return(
        <Container className="card-boletim p-5 mt-3 mb-3 d-flex flex-column justify-content-start p-3">
            <p className="card-boletim-titulo fs-3 fw-bold">
                {noticia.titulo.toUpperCase()}
            </p>
            <div className="card-boletim-informacoes fw-semibold fs-5">
                <p>
                    Data de publicação: {new Date(noticia.dataPublicacao).toLocaleDateString()}
                </p>
            </div>
            <p className="card-boletim-descricao mt-2 mt-lg-0 fs-5 fw-medium">
                {noticia.descricao}
            </p>
            <div
                className="card-boletim-footer d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div
                    className="tags-boletim d-flex flex-wrap justify-content-start justify-content-md-end mb-2 mb-md-0">
                    {
                        noticia.tags.map(tag => (
                            <span className="card-boletim-tags p-3 fs-6 fw-semibold me-3" key={tag.id}> {tag.nome} </span>
                        ))
                    }
                </div>
                <div className="link-boletim mt-3 mt-md-0">
                    <Link to={noticia.link} className="card-boletim-btn p-3 fs-5 fw-bold ">
                        Visitar Noticia
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default CardNoticiaBoletim