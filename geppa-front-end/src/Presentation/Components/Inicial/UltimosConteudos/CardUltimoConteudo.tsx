import "./StyleUltimosConteudos.css"
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import cores from "../../Utils/Cores.tsx";

const CardUltimoConteudo: React.FC<{ descricao: string, dataPublicacao: Date, link: string }> = ({
                                                                                                     descricao,
                                                                                                     dataPublicacao,
                                                                                                     link
                                                                                                 }) => {

    return (
        <Container className="card-ultimos-conteudos align-items-center d-flex gap-4 p-2">
            <div className="d-flex align-items-center">
                <p className="m-0">
                    {
                        dataPublicacao.toLocaleDateString('pt-BR', {month: 'numeric', year: 'numeric'})
                    }
                </p>
            </div>
            <Link to={link} target={"_blank"} style={{
                color: cores.marromEscuro,
                textDecoration: 'none'
            }}>
                <p className={'m-0'}>
                    {descricao}
                </p>
            </Link>
        </Container>
    )
}

export default CardUltimoConteudo