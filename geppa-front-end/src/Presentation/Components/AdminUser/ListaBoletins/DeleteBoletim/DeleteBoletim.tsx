import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Boletim} from "../../../../../Data/ApiTypes/TypeBoletim.ts";
import CustomToast from "../../../Utils/CustomToast.tsx";
import AxiosClient from "../../../../../Domain/Services/AxiosClient.ts";

interface DeleteButtonProps {
    boletim: Boletim;
    fetchBoletins: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({boletim, fetchBoletins}) => {
    const [show, setShow] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; isSuccess: boolean } | null>(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 7000);

            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        try {
            const response = await AxiosClient.delete(`/boletins/${boletim.edicao}`);
            console.log(response.data);
            handleClose();
            setToast({
                message: "Boletim excluido com sucesso!",
                isSuccess: true,
            });
            fetchBoletins()
        } catch (error) {
            setToast({
                message: `Ocorreu um erro ao excluir o boletim de edição: ${boletim.edicao}.`,
                isSuccess: false,
            });
            handleClose();
        }
    };

    return (
        <>
            {toast && <CustomToast show={!!toast} message={toast.message} isSuccess={toast.isSuccess}/>}
            <Button variant="" className={'text-danger fw-medium'} onClick={handleShow}>
                Excluir
                <i className="ps-1 ri-delete-bin-line"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Você tem certeza que deseja excluir o boletim de edição "{boletim.edicao}"?
                    <p className="text-danger mb-0 mt-3 ">
                        <strong>Atenção:</strong> A Exclusão deste boletim não excluira os emails enviados pela
                        newsletter!
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteButton;