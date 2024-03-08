import "./StyleUltimosConteudos.css"
import CardUltimoConteudo from "./CardUltimoConteudo.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {TypeConteudoGenerico} from "./TypeConteudoGenerico.ts";
const UltimosConteudos: React.FC<{tipo: string, conteudoGenerico: TypeConteudoGenerico[]}> = ({tipo, conteudoGenerico}) => {


    return (
        <>
            <Container>
                <Row className="d-flex justify-content-between align-bottom">
                    <Col>
                        <h3>{tipo}</h3>
                    </Col>
                    <Col className="text-end">
                        <p className="text-decoration-underline align-content-end ">
                            Ir para mais {tipo}
                        </p>
                    </Col>
                </Row>
                <Row>
                    {conteudoGenerico.map((conteudo, index) => (
                        <Col key={conteudo.id} className={`col-md-6 mb-4 ${index % 2 === 0 ? "mb-4" : ""}`}>
                            <CardUltimoConteudo
                                descricao={conteudo.descricao}
                                dataPublicacao={new Date(conteudo.dataCadastro)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default UltimosConteudos
