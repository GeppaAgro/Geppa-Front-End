import {Tag} from "../../../../Domain/TypesConteudos/TypeTag.ts";
import React, {useEffect, useState} from "react";
import AxiosClient from "../../../../Data/Services/AxiosClient.ts";
import {Button, Modal} from "react-bootstrap";
import CustomToast from "../../Utils/CustomToast.tsx";
import {AxiosError} from "axios";

interface DeleteButtonProps {
    tag: Tag;
    fetchTags: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({tag, fetchTags}) => {
    const [show, setShow] = useState(false);
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
            await AxiosClient.delete(`/tags/${tag.nome}`);
            handleClose();
            setToast({
                message: "Tag excluída com sucesso!",
                isSuccess: true,
            });
            fetchTags();
        } catch (error) {
            const axiosError = error as AxiosError;
            const mensagem: string = (axiosError.response?.data as any)?.mensagem || '';

            if (mensagem.includes("A tag esta sendo utilizada")) {
                const quantidadeRegex = /Quantidade de conteúdos: (\d+)/;
                const match = mensagem.match(quantidadeRegex);
                const quantidade = match ? match[1] : 'desconhecida';

                setToast({
                    message: `A tag "${tag.nome}" está em uso atualmente em ${quantidade} conteúdos. Remova-a dos conteúdos para poder excluir.`,
                    isSuccess: false,
                });
            } else if (mensagem.includes("Tag não encontrada")) {
                setToast({
                    message: `A tag "${tag.nome}" não foi encontrada. Certifique-se de que ela existe.`,
                    isSuccess: false,
                });
            } else {
                setToast({
                    message: `Ocorreu um erro ao excluir a tag: ${tag.nome}.`,
                    isSuccess: false,
                });
            }
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
                    Você tem certeza que deseja excluir a tag "{tag.nome}"?
                    <p className="text-danger mb-0 mt-3 ">
                        <strong>Atenção:</strong> Antes de excluir uma tag, verifique se ela não está sendo utilizada
                        por nenhum conteúdo.
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