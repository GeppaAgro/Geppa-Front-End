import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import geppaLogo from "../../../../Data/Images/Logos/LogoHorizontalCompleto.png";
import {useNavigate, useParams} from "react-router-dom";
import cores from "../../../Components/Utils/Cores.tsx";
import {useState} from "react";
import AxiosClient from "../../../../Domain/Services/AxiosClient.ts";

const PaginaUnsubscribeNewsletter = () => {
    const {email} = useParams<{ email: string }>()
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    async function handleUnsubscribe() {
        try {
            await AxiosClient.delete(`/newsletters/cancelar-inscricao/${email}`);

            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
                navigate('/');
            }, 4000);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (error.response.status === 404) {
                setErrorMessage('Não foi possível encontrar sua inscrição em nossa newsletter. ' +
                    'Verifique se o link está correto e tente novamente.');
                setShowErrorModal(true);
                return;
            }
            setErrorMessage('Ocorreu um erro ao cancelar sua inscrição. Tente novamente mais tarde.');
        }
    }

    return (
        <>
            <Container className="my-5">
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

            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} backdrop="static" keyboard={false}
                   centered>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Falha ao cancelar inscrição</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PaginaUnsubscribeNewsletter;