import "./StyleUltimosConteudos.css"
import {Container} from "react-bootstrap";

const CardUltimoConteudo: React.FC<{ descricao: string, dataPublicacao: string }> = ({descricao, dataPublicacao}) => {

    const convertStringToDate = (dateStr: string): Date => {
        const [datePart, timePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);

        return new Date(year, month - 1, day, hours, minutes, seconds);
    }

    const dateObject = convertStringToDate(dataPublicacao);

    return (
        <Container className="card-ultimos-conteudos align-items-center d-flex gap-4 p-2">
            <div className="d-flex align-items-center">
                <p className="m-0">
                    {
                        dateObject.toLocaleDateString('pt-BR', { month: 'numeric', year: 'numeric' })
                    }
                </p>
            </div>
            <p className={'m-0'}>
                {descricao}
            </p>
        </Container>
    )
}

export default CardUltimoConteudo