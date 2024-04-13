import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import geppaLogo from "../../../../Data/Images/Logos/LogoHorizontalCompleto.png";
import {useNavigate, useParams} from "react-router-dom";
import cores from "../../../Components/Utils/Cores.tsx";
import {useState} from "react";

const PaginaUnsubscribeNewsletter = () => {
    const {email} = useParams<{ email: string }>()
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    function handleUnsubscribe() {
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
            navigate('/');
        }, 4000);
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col lg={{span: 6, offset: 3}} className="text-center">
                        <Card>
                            <div className="text-center pt-4 pb-2">
                                <img src={geppaLogo} alt="Imagem da geppa"
                                     style={{width: '100%', maxWidth: '250px', height: 'auto'}}/>
                            </div>
                            <Card.Body>
                                <h4>Cancelar Inscrição</h4>
                                <p>Tem certeza de que deseja cancelar sua inscrição em nossa newsletter?</p>
                                <p>Seu endereço de e-mail: {email}</p>
                                <Button onClick={handleUnsubscribe}
                                        style={{backgroundColor: cores.verdeOliva, border: 0}}>Confirmar
                                    Cancelamento</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton={false}>
                    <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você foi removido com sucesso da nossa newsletter!</Modal.Body>
            </Modal>
        </>
    );
};

export default PaginaUnsubscribeNewsletter;