import "./StyleAreaInscricao.css"
import {Container} from "react-bootstrap";
import InscricaoNewslleter from "../../InscricaoNewslleter.tsx";

export default function AreaInscricao() {
    return (
        <>
            <Container
                className="area-inscricao mt-3 mb-3 d-flex flex-column justify-content-center p-3 align-items-center">
                <InscricaoNewslleter/>
            </Container>
        </>
    )
}