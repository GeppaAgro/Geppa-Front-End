import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import "../../Pages/AdminUser/AdminCriarBoletim/PaginaCriacaoBoletim.css"

interface ConfirmModalProps {
    show: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    onResult?: (newsLetter: boolean) => void;
    onSendByEmailChange?: (checked: boolean) => void;

}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, title, message, onConfirm, onCancel, onResult }) => {
    const handleConfirm = () => {
        onConfirm();
        if (onResult) {
            onResult(true);
        }
    };

    const handleCancel = () => {
        onCancel();
        if (onResult) {
            onResult(false);
        }
    };

    return (
        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancelar
                </Button>
                <Button className="btn-modal" onClick={handleConfirm}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
