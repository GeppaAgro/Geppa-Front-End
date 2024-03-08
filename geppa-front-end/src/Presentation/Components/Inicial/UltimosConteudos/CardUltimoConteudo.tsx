import "./StyleUltimosConteudos.css"
import {Container} from "react-bootstrap";

const CardUltimoConteudo: React.FC <{descricao: string, dataPublicacao: Date}> = ({descricao, dataPublicacao}) => {


    return (
        <Container className="card-ultimos-conteudos d-flex justify-content-between ">
            <div className="d-flex align-items-center">
                    <p className="me-4 text-start">
                        {dataPublicacao.toLocaleDateString('pt-BR', { month: 'numeric', year: 'numeric' })}
                    </p>
            </div>
                    <p>
                        {descricao}
                    </p>
        </Container>
    )
}

export default CardUltimoConteudo