import {Artigo, Curso, Evento, Noticia, Video} from "../../../../Domain/TypesConteudos/TypesConteudos.ts";
import {Button, Container} from "react-bootstrap";
import ModalArtigo from "../../../Components/Modais/ModalArtigo.tsx";
import ModalCurso from "../../../Components/Modais/ModalCurso.tsx";
import ModalNoticia from "../../../Components/Modais/ModalNoticia.tsx";
import ModalVideo from "../../../Components/Modais/ModalVideo.tsx";
import {useItemsAndModal} from "../../../../Domain/Hooks/useItemsAndModal.ts";
import ModalEvento from "../../../Components/Modais/ModalEvento.tsx";
import "./PaginaCriacaoBoletim.css"
import ListaDeIndicadores from "../../../Components/Modais/ComponentesModal/ListaDeIndicadores.tsx";
import axiosClient from "../../../../Domain/Services/AxiosClient.ts";
import React, {useEffect, useState} from "react";
import {Indicador} from "../../../../Domain/TypesConteudos/Indicador.ts";
import {BoletimSubmit} from "../../../../Data/ApiTypes/BoletimSubmit.ts";
import {render} from "@react-email/render";
import Email from "../../../Components/Email/Email.tsx";
import {BoletimEmail} from "../../../../Data/ApiTypes/TypeBoletimEmail.ts";
import {useNavigate, useParams} from "react-router-dom";
import LoadingOverlay from "../../../Components/Utils/LoadingOverlay/LoadingOverlay.tsx";
import CustomToast from "../../../Components/Utils/CustomToast.tsx";
import {AxiosError, AxiosResponse} from "axios";
import ConfirmModal from "../../../Components/Modais/ModalConfirm.tsx";
import ModalComponent from "../../../Components/Modais/ModalCancel.tsx";


interface Item {
    id: string | number;
    titulo: string;
}


const PaginaCriacaoBoletim: React.FC = () => {
    const edicao = useParams()

    const buscarBoletim = async () => {
        try {
            const resp = await axiosClient.get(`boletins/${edicao.edicao}`)
            setItems({
                artigos: resp.data.dados.artigos || [],
                cursos: resp.data.dados.cursos || [],
                eventos: resp.data.dados.eventos || [],
                noticias: resp.data.dados.noticias || [],
                videos: resp.data.dados.videos || [],
            });
            setIndicadores(resp.data.dados.indicadores)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (edicao.edicao) {
            buscarBoletim()
        }
    }, []);

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)

    const [toast, setToast] = useState<{ message: string; isSuccess: boolean } | null>(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [toast]);

    type ContentType = 'artigo' | 'curso' | 'noticia' | 'video' | 'evento';

    const contentTypeMap: Record<string, ContentType> = {
        artigos: 'artigo',
        cursos: 'curso',
        noticias: 'noticia',
        videos: 'video',
        eventos: 'evento'
    };

    const [indicadores, setIndicadores] = useState<Indicador[]>([])

    const atualizarIndicadores = (novosIndicadores: Indicador[]) => {
        setIndicadores(novosIndicadores);
    };

    const getContentType = (type: 'artigos' | 'cursos' | 'noticias' | 'videos' | 'eventos'): ContentType => {
        return contentTypeMap[type];
    };

    const {items, setItems, modal, openModal, closeModal, saveItem, deleteItem} = useItemsAndModal();
    const renderList = (type: 'artigos' | 'cursos' | 'noticias' | 'videos' | 'eventos', items: Item[]) => {
        return (
            <ul className="mx-md-5">
                <Container className="container-lista-conteudos px-sm-5">
                    <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                        <span className="fw-bold fs-5 ">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                        {!edicao.edicao  && (<Button className="btn-modal fw-semibold" onClick={() => openModal(getContentType(type), null)}>
                            +
                        </Button>)}

                    </div>
                    {items.map((item, index) => (
                        <li key={item.id} className="mb-3 list-unstyled">
                            <div className="lista-conteudos d-flex col align-items-center justify-content-between  ">
                                <span className="fw-semibold">{item.titulo}</span>
                                <div className="d-flex flex-row gap-2 gap-sm-3">
                                    <Button className="btn-edit-delete" variant="2"
                                            onClick={() => openModal(getContentType(type), index)}>
                                        <i className="ri-edit-fill"/>
                                    </Button>
                                    <Button className="btn-edit-delete" variant="2"
                                            onClick={() => deleteItem(type, index)}>
                                        <i className="ri-eraser-fill"/>
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </Container>
            </ul>
        );

    };


    const atualizarBoletim = async (boletim: BoletimSubmit) => {
        try {
           await axiosClient.put(`/boletins/${edicao.edicao}`, boletim)
        } catch (error) {
            setToast({
                message: `Falha ao salvar boletim, tente novamente em alguns instantes`,
                isSuccess: false,
            });
        }
    }

    const publicarNovoBoletim = async (boletim: BoletimSubmit) => {
        try {
            const response = await axiosClient.post('/boletins', boletim);
            if (response.data.status === 201) {
                await enviarNewsLetter(await renderizarEmail(response.data.dados))
                navigate(`/boletim/${response.data.dados.edicao}`);
                setToast({
                    message: `Boletim cadastrado com sucesso`,
                    isSuccess: true,
                });
            }
        } catch (error) {
            if (error as AxiosError) {
                const axiosError = error.response as AxiosResponse;
                if (axiosError.data.errosValidacao) {
                    const validationErrors = Object.values(axiosError.data.errosValidacao).join(', ');
                    setToast({
                        message: validationErrors,
                        isSuccess: false,
                    });
                }else{
                    setToast({
                        message: `Ocorreu um erro inesperado, por favor tente novamente mais tarde.`,
                        isSuccess: false,
                    });
                }
            } else {
                setToast({
                    message: `Ocorreu um erro inesperado, por favor tente novamente mais tarde.`,
                    isSuccess: false,
                });
            }
        }
    }

    const publicarBoletim = () => {
        const boletim: BoletimSubmit = {
            edicao: edicao.edicao || null,
            artigos: items.artigos,
            cursos: items.cursos,
            eventos: items.eventos,
            noticias: items.noticias,
            videos: items.videos,
            indicadores: indicadores
        };
        setLoading(true)
        if (edicao.edicao) {
            atualizarBoletim(boletim)
        } else {
            publicarNovoBoletim(boletim)
        }
        setLoading(false)
    };

    const enviarNewsLetter = async (html: string) => {

        return await axiosClient.post(`/newsletters/publicar`, {body: html})
    }
    const renderizarEmail = async (boletim: BoletimEmail) => {
        return render(
            <Email boletim={boletim}/>, {
                pretty: true
            }
        )
    }

    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const handleOpenConfirmModal = () => {
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const handleModalResult = (confirmed: boolean) => {
        if (confirmed) {
            handleCloseConfirmModal()
        } else {
            console.log("Publicação do boletim cancelada.");
        }
    };


    const [showCancel, setShowCancel] = useState(false);

    const handleOpenCancel = () => setShowCancel(true);
    const handleCloseCancel = () => setShowCancel(false);

    const cancelarBoletim = () => {
        navigate(`/admin`)
    };


    return (
        <>
            <div className="d-flex justify-content-center my-5 fw-bold fs-2">
                {
                    edicao.edicao ? (<span>Editar Boletim {edicao.edicao}</span>)
                        : (<span>Criar Boletim</span>)
                }
            </div>
            {modal.show && (
                <>
                    {modal.type === 'artigo' && (
                        <ModalArtigo
                            abrir={modal.show}
                            fechar={closeModal}
                            mostrar={() => openModal('artigo')}
                            salvar={(data: Artigo) => saveItem('artigos', data, modal.editIndex)}
                            artigo={modal.editIndex !== null ? items.artigos[modal.editIndex] : undefined}
                        />
                    )}
                    {modal.type === 'curso' && (
                        <ModalCurso
                            abrir={modal.show}
                            fechar={closeModal}
                            mostrar={() => openModal('curso')}
                            salvar={(data: Curso) => saveItem('cursos', data, modal.editIndex)}
                            curso={modal.editIndex !== null ? items.cursos[modal.editIndex] : undefined}
                        />
                    )}
                    {modal.type === 'evento' && (
                        <ModalEvento abrir={modal.show}
                                     fechar={closeModal}
                                     mostrar={() => openModal('evento')}
                                     salvar={(data: Evento) => saveItem('eventos', data, modal.editIndex)}
                                     evento={modal.editIndex !== null ? items.eventos[modal.editIndex] : undefined}/>
                    )}
                    {modal.type === 'noticia' && (
                        <ModalNoticia
                            abrir={modal.show}
                            fechar={closeModal}
                            mostrar={() => openModal('noticia')}
                            salvar={(data: Noticia) => saveItem('noticias', data, modal.editIndex)}
                            noticia={modal.editIndex !== null ? items.noticias[modal.editIndex] : undefined}
                        />
                    )}
                    {modal.type === 'video' && (
                        <ModalVideo
                            abrir={modal.show}
                            fechar={closeModal}
                            mostrar={() => openModal('video')}
                            salvar={(data: Video) => saveItem('videos', data, modal.editIndex)}
                            video={modal.editIndex !== null ? items.videos[modal.editIndex] : undefined}
                        />
                    )}
                </>
            )}
            {renderList('artigos', items.artigos)}
            {renderList('cursos', items.cursos)}
            {renderList('eventos', items.eventos)}
            {renderList('noticias', items.noticias)}
            {renderList('videos', items.videos)}

            <ListaDeIndicadores indicadoresIniciais={indicadores} onUpdate={atualizarIndicadores} edicao={!!edicao.edicao}/>

            {!edicao.edicao && (<div className="d-flex flex-row gap-4 justify-content-end mb-5 mx-md-5">
                <Button onClick={handleOpenCancel} className="" variant="danger">Cancelar</Button>
                {
                    edicao.edicao ? (
                            <Button onClick={handleOpenConfirmModal} className="btn-modal">Editar boletim</Button>)
                        : (<Button onClick={handleOpenConfirmModal} className="btn-modal">Publicar</Button>)
                }

            </div>)}
            {
                <ConfirmModal
                    show={showConfirmModal}
                    title="Confirmação de Publicação"
                    message="Tem certeza que deseja publicar este boletim?"
                    onConfirm={publicarBoletim}
                    onCancel={handleCloseConfirmModal}
                    onResult={handleModalResult}
                />
            }
            {
                <ModalComponent
                    show={showCancel}
                    handleClose={handleCloseCancel}
                    onConfirm={cancelarBoletim}
                    title="Finalizar"
                    message="Tudo o que voce criou até aqui para este boletim será excluido , deseja continuar"
                />
            }

            {
                loading && (
                    <LoadingOverlay/>
                )
            }
            {toast && <CustomToast show={!!toast} message={toast.message} isSuccess={toast.isSuccess}/>}

        </>

    );
};

export default PaginaCriacaoBoletim;
