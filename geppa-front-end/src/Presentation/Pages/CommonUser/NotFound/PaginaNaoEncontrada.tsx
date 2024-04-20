import {Container} from "react-bootstrap";

const PaginaNaoEncontrada: React.FC = () => {
    return (
        <Container className="text-center p-5">
            <h1>404 - Not Found</h1>
            <p>Desculpe, a página que você está procurando não existe</p>
        </Container>
    );
};

export default PaginaNaoEncontrada;