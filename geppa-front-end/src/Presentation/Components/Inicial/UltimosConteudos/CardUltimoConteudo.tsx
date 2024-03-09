import "./StyleUltimosConteudos.css"
import {Container} from "react-bootstrap";

const CardUltimoConteudo: React.FC<{ descricao: string, dataPublicacao: Date }> = ({descricao, dataPublicacao}) => {


    return (
        <Container className="card-ultimos-conteudos align-items-center d-flex gap-4 p-2">
            <div className="d-flex align-items-center">
                <p className="m-0">
                    {dataPublicacao.toLocaleDateString('pt-BR', {month: 'numeric', year: 'numeric'})}
                </p>
            </div>
            <p className={'m-0'}>
                {descricao}
            </p>
        </Container>
    )
}

export default CardUltimoConteudo