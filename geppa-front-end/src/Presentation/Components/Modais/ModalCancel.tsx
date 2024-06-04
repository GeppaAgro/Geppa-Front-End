import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";

interface ModalComponentProps {
    show: boolean;
    handleClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
                                                           show,
                                                           handleClose,
                                                           onConfirm,
                                                           title,
                                                           message,
                                                       }) => {
    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Apagar alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComponent;