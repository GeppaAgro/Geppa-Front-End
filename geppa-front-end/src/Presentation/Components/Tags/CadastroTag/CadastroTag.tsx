import React, {useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import cores from "../../Utils/Cores.tsx";

interface AddTagButtonProps {
    // onSave: () => void;
    buttonText: string;
    iconClass: string;
    editMode?: boolean;
    useIcon?: boolean;
}

const CadastroTag: React.FC<AddTagButtonProps> = ({buttonText, iconClass, useIcon = true, editMode = false}) => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Button variant="success"
                    style={{backgroundColor: cores.verdeOliva}}
                    className={"mb-3 border-0"}
                    onClick={() => setShowModal(true)}>
                {buttonText}
                {useIcon && <i className={`ps-1 ${iconClass}`}></i>}
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Editar Tag' : 'Nova Tag'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nome da Tag</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome da Tag"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary">
                        {/*// onClick={onSave}>*/}
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CadastroTag;