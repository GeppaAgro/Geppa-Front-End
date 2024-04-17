
import { Modal, Button, Form } from 'react-bootstrap';
import {Tag} from "../../../Domain/TypesConteudos/TypeTag.ts";
import {Autor} from "../../../Domain/TypesConteudos/TypeAutor.ts";

interface ModalProps {
    show: boolean;
    onHide: () => void;
    onSave: (
        boletimInformativoEdicao: string,
        titulo: string,
        descricao: string,
        link: string,
        dataCadastro: string,
        dataAtualizacao: string,
        tags: Tag[],
        dataPublicacao: Date,
        autores: Autor[]
    ) => void;
}

const ModalArtigo: React.FC<ModalProps> = ({ show, onHide}) => {

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Fechar
                </Button>
                <Button variant="primary">

                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalArtigo;
