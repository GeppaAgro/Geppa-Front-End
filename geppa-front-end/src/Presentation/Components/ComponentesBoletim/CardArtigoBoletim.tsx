import "./StyleCardBoletim.css"
import {Container} from "react-bootstrap";
import{Artigo} from "../../../Domain/TypesConteudos/Conteudos/TypeArtigo.ts";
import {Link} from "react-router-dom";
import {validaData} from "../Utils/ValidacaoDeData.ts";

const CardArtigoBoletim: React.FC<{ artigo: Artigo }> = ({artigo}) =>{

    return (
        <>
            <Container className="card-boletim p-5 mt-1 mb-3 d-flex flex-column justify-content-start p-3">
                <p className="card-boletim-titulo fs-5 fw-bold">
                    {artigo.titulo.toUpperCase()}
                </p>
                <div className="card-boletim-informacoes fw-bold fs-6 ">
                    { artigo.dataPublicacao && validaData (artigo.dataPublicacao.toString()) &&(
                        <p>
                            Data de publicação: {new Date(artigo.dataPublicacao).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                        </p>
                        )}
                     <p>
                         Autores: {artigo.autores.map((autor) => autor.nome).join(', ')}
                     </p>
                </div>
                <p className="card-boletim-descricao mt-2 mt-lg-0 fs-6 fw-medium">
                    {artigo.descricao}
                </p>
                <div
                    className="card-boletim-footer d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div
                        className="tags-boletim d-flex flex-wrap justify-content-start justify-content-md-end mb-2 mb-md-0 gap-3">
                        {
                            artigo.tags.map(tag => (
                                <span className="card-boletim-tags p-3 fs-6 fw-semibold " key={tag.id}> {tag.nome} </span>
                            ))
                        }
                    </div>
                    {
                        artigo.link !== null && (
                            <div className="card-boletim-btn link-boletim mt-3 mt-md-0 p-3">
                                <Link to={artigo.link} className="fs-6 fw-bold" target={"_blank"}>
                                    Ir para o artigo
                                </Link>
                            </div>
                        )
                    }
                </div>
            </Container>
        </>
    )
}

export default CardArtigoBoletim