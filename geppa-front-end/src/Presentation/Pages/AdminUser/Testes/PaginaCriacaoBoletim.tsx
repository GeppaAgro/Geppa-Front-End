import {Artigo, Curso, Evento, Noticia, Video} from "../../../../Domain/TypesConteudos/TypesConteudos.ts";
import {Button, Container, Modal} from "react-bootstrap";
import ModalArtigo from "../../../Components/Modais/ModalArtigo.tsx";
import ModalCurso from "../../../Components/Modais/ModalCurso.tsx";
import ModalNoticia from "../../../Components/Modais/ModalNoticia.tsx";
import ModalVideo from "../../../Components/Modais/ModalVideo.tsx";
import {useItemsAndModal} from "../../../../Domain/Hooks/useItemsAndModal.ts";
import ModalEvento from "../../../Components/Modais/ModalEvento.tsx";
import "./PaginaCriacaoBoletim.css"
import Logo from '../../../../Data/Images/Logos/Logo.png'
import ModalIndicadores from "../../../Components/Modais/ModalIndicadores.tsx";
import {Indicador} from "../../../../Domain/TypesConteudos/Indicador.ts";
import {useState} from "react";
import ListaDeIndicadores from "../../../Components/Modais/ComponentesModal/ListaDeIndicadores.tsx";

interface Item {
    id: string | number;
    titulo: string;
}

const PaginaCriacaoBoletim: React.FC = () => {

    const [indicadores, setIndicadores] = useState<Indicador[]>([]);
    const [modalIndicadores, setModalIndicadores] = useState<{
        show: boolean,
        editIndex: number | null
    }>({ show: false, editIndex: null });

    const closeModalIndicadores = () => {
        setModalIndicadores({
           show: false,
           editIndex: null
        })
    }

    const openModalIndicadores = (index: number | null) => {
        setModalIndicadores({
            show: true,
            editIndex: index
        })
    }

    const salvarIndicador = (indicador : Indicador, index: number | null) => {
        console.log(indicador, index);
        setIndicadores((prevIndicadores) => {
            const newIndicadores = [...prevIndicadores];
            if (index !== null && index >= 0 && index < newIndicadores.length) {
                newIndicadores[index] = indicador;
            } else {
                newIndicadores.push(indicador);
            }
            return newIndicadores;
        });
    }
    const deleteIndicador = (index: number) => {
        indicadores.splice(index, 1);
        setIndicadores([...indicadores]);
    };


    type ContentType = 'artigo' | 'curso' | 'noticia' | 'video'| 'evento';

    const contentTypeMap: Record<string, ContentType> = {
        artigos: 'artigo',
        cursos: 'curso',
        noticias: 'noticia',
        videos: 'video',
        eventos: 'evento'
    };

    const getContentType = (type: 'artigos' | 'cursos' | 'noticias' | 'videos' | 'eventos'): ContentType => {
        return contentTypeMap[type];
    };

    const {items, modal, openModal, closeModal, saveItem, deleteItem} = useItemsAndModal();
    const renderList = (type: 'artigos' | 'cursos' | 'noticias' | 'videos' | 'eventos', items: Item[]) => {
        return (
            <ul>
                <Container className="container-lista-conteudos px-sm-5">
                    <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                        <span className="fw-bold fs-5 ">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                        <Button className="btn-modal fw-semibold" onClick={() => openModal(getContentType(type), null)}>
                            +
                        </Button>
                    </div>
                {items.map((item, index) => (
                    <li key={item.id} className="mb-3 list-unstyled">
                        <div className="lista-conteudos d-flex col align-items-center justify-content-between  ">
                            <span className="fw-semibold">{item.titulo}</span>
                            <div className="d-flex flex-row gap-2 gap-sm-3">
                                <Button className="btn-edit-delete" variant="2" onClick={() => openModal(getContentType(type), index)}>
                                    <i className="ri-edit-fill"/>
                                </Button>
                                <Button className="btn-edit-delete" variant="2" onClick={() => deleteItem(type, index)}>
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

    const publicarBoletim = () => {
        const confirmacao = window.confirm('Deseja realmente enviar?');
        if (confirmacao) {
            console.log('Enviar');
        }
    };

    const deletarBoletim = () => {
        const confirmacao = window.confirm('Deseja realmente deletar?');
        if (confirmacao) {
            console.log('Deletar');
        }
    };


    return (
        <Container className="pagina-criar-boletim p-5">
            <div className="d-flex justify-content-center mb-2">
                <span className="fs-1 fw-semibold">Cadastrar Boletim</span>
            </div>

            <Container
                className="col-8 px-5 d-none d-xl-flex align-items-center container-lista-conteudos mb-3 justify-content-between flex-row">
                <div className=" my-3 col-8">
                    <div className="d-flex justify-content-center mb-2">
                        <span className="fs-5 fw-semibold">
                        Como cadastrar boletins
                        </span>
                    </div>

                    <ul>
                        <li>Clique no botão "+" para adicionar o tipo de conteudo</li>
                        <li>Clique em salvar</li>
                        <li>Logo após clique em "Publicar" no final da pagina e confirme a ação</li>
                        <li>Pronto, seu novo boletim foi cadastrado e publicado em poucos passos</li>
                    </ul>
                </div>
                <div className="imagem col-4 d-flex justify-content-center">
                    <img className="imagem-cadastro-boletim" src={Logo} alt="Logo-geppa"/>
                </div>
            </Container>

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



            <ListaDeIndicadores/>

            <div className="d-flex flex-row gap-4 justify-content-end mb-5">
                <Button onClick={deletarBoletim} className="" variant="danger">Cancelar</Button>
                <Button onClick={publicarBoletim} className="btn-modal" >Publicar</Button>
            </div>

        </Container>
    );
};

export default PaginaCriacaoBoletim;
