import "./StyleUltimosConteudos.css"
import CardUltimoConteudo from "./CardUltimoConteudo.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {TypeConteudoGenerico} from "./TypeConteudoGenerico.ts";
import {Link} from "react-router-dom";
import cores from "../../Utils/Cores.tsx";
const UltimosConteudos: React.FC<{tipo: string, conteudoGenerico: TypeConteudoGenerico[]}> = ({tipo, conteudoGenerico}) => {


    return (
        <>
            <Container>
                <Row className="d-flex justify-content-between align-items-center align-bottom">
                    <Col>
                        <h3>{tipo}</h3>
                    </Col>
                    <Col className="text-end">
                        <Link to={`/conteudos/${tipo.toLowerCase()}`} className={"text-decoration-underline align-content-end fw-semibold"}
                              style={{color: cores.marromEscuro}}>
                            Ir para mais {tipo}
                        </Link>
                    </Col>
                </Row>
                <Row>
                    {conteudoGenerico.map((conteudo, index) => (
                        <Col key={conteudo.id} lg={6} xl={6} className={`mb-4 ${index % 2 === 0 ? "mb-lg-0" : ""}`}>
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
