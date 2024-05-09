import React, {useEffect, useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import cores from "../../Utils/Cores.tsx";
import AxiosClient from "../../../../Data/Services/AxiosClient.ts";
import CustomToast from "../../Utils/CustomToast.tsx";

interface AddTagButtonProps {
    buttonText: string;
    iconClass: string;
    editMode?: boolean;
    useIcon?: boolean;
    fetchTags: () => void;
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
                                                      editMode = false,
                                                      fetchTags
                                                  }) => {
    const [showModal, setShowModal] = useState(false);
    const [tagName, setTagName] = useState('');
    const [toast, setToast] = useState<{ message: string; isSuccess: boolean } | null>(null);
    const [erro, setErro] = useState<ErroValidacao | null>()

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
        setErro(null)
        setTagName('')
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await AxiosClient.post('/tags', {nome: tagName});
            handleCloseModal();
            setToast({
                message: `Tag '${tagName}' criada com sucesso!`,
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