import React, {useEffect, useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import cores from "../../Utils/Cores.tsx";
import CustomToast from "../../Utils/CustomToast.tsx";
import {Tag} from "../../../../Domain/TypesConteudos/TypeTag.ts";
import AxiosClient from "../../../../Domain/Services/AxiosClient.ts";

interface AddTagButtonProps {
    buttonText: string;
    iconClass: string;
    tag?: Tag;
    useIcon?: boolean;
    classNameBtn?: string;
    colorBtn?: string;
    fetchTags: () => void;
    onShow: () => void;
    onHide: () => void;
}

interface ResponseError {
    response: {
        data: {
            errosValidacao?: {
                nome?: string;
            };
            mensagem?: string;
        };
    };
}

interface ErroValidacao {
    nome?: string;
}

const CadastroTag: React.FC<AddTagButtonProps> = ({
                                                      buttonText,
                                                      iconClass,
                                                      useIcon = true,
                                                      tag = null,
                                                      fetchTags,
                                                      classNameBtn,
                                                      colorBtn = cores.verdeOliva,
                                                      onShow,
                                                      onHide
                                                  }) => {
    const [showModal, setShowModal] = useState(false);
    const [tagName, setTagName] = useState('');
    const [toast, setToast] = useState<{ message: string; isSuccess: boolean } | null>(null);
    const [erro, setErro] = useState<ErroValidacao | null>()
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (tag) {
            setIsEditing(true);
            setTagName(tag.nome || '');
        }
    }, [tag]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleCloseModal = () => {
        setShowModal(false)
        onHide()
        setErro(null)
    };

    const handleShowModal = () => {
        setShowModal(true);
        onShow();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const url = isEditing ? `/tags/${tag?.id}` : '/tags';
            await AxiosClient[isEditing ? 'put' : 'post'](url, {nome: tagName});
            handleCloseModal();
            setToast({
                message: `Tag ${isEditing ? 'editada' : 'criada'} com sucesso!`,
                isSuccess: true,
            });
            setTagName('')
            setErro(null)
            fetchTags();
        } catch (error) {
            const responseError = error as ResponseError;

            if (responseError.response?.data?.errosValidacao) {
                const mensagemErroNome: string = responseError.response.data.errosValidacao.nome ?? '';
                if (mensagemErroNome.includes("tag eh obrigatorio")) {
                    setErro({nome: "O nome da tag é obrigatório."});
                }
                if (mensagemErroNome.includes("nome da tag deve conter entre 3 e 30 caracteres")) {
                    setErro({nome: "O nome da tag deve conter entre 3 e 30 caracteres."});
                }
            } else if (responseError.response?.data?.mensagem ?? ''.includes("Registro já cadastrado")) {
                setErro({nome: `Já existe uma tag com o nome '${tagName}'.`});
            } else {
                setToast({
                    message: `Erro ao criar a tag: ${tagName}.`,
                    isSuccess: false,
                });
            }
        }
    };

    return (
        <>
            {toast && <CustomToast show={!!toast} message={toast.message} isSuccess={toast.isSuccess}/>}
            <Button variant="success"
                    style={{backgroundColor: colorBtn}}
                    className={classNameBtn}
                    onClick={handleShowModal}>
                {buttonText}
                {useIcon && <i className={`ps-1 ${iconClass}`}></i>}
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Tag' : 'Nova Tag'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nome da Tag</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Digite o nome da Tag"
                                          className={`${erro ? 'is-invalid' : ''}`}
                                          onChange={(e) => setTagName(e.target.value)}
                                          value={tagName}/>
                            {erro && <div className="invalid-feedback">{erro.nome}</div>}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Fechar
                        </Button>
                        <Button variant="primary" type="submit">
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default CadastroTag;