import {Artigo, Curso, Evento, Noticia, Video} from "../../../../Domain/TypesConteudos/TypesConteudos.ts";
import {Button, Container} from "react-bootstrap";
import ModalArtigo from "../../../Components/Modais/ModalArtigo.tsx";
import ModalCurso from "../../../Components/Modais/ModalCurso.tsx";
import ModalNoticia from "../../../Components/Modais/ModalNoticia.tsx";
import ModalVideo from "../../../Components/Modais/ModalVideo.tsx";
import {useItemsAndModal} from "../../../../Domain/Hooks/useItemsAndModal.ts";
import ModalEvento from "../../../Components/Modais/ModalEvento.tsx";

interface Item {
    id: string | number;
    titulo: string;
}

const PaginaTesteModais: React.FC = () => {

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
                <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                {items.map((item, index) => (
                    <li key={item.id} className="mb-3">
                        <div className="d-flex col align-items-center gap-3">
                            <p>{item.titulo}</p>
                            <Button variant="2" onClick={() => openModal(getContentType(type), index)}>
                                <i className="ri-pencil-line"></i>
                            </Button>
                            <Button onClick={() => deleteItem(type, index)}>
                                <i className="ri-delete-back-2-line"></i>
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Container className="">
            <Button variant="primary" onClick={() => openModal(getContentType('artigos'), null)}>
                Adicionar Novo Artigo
            </Button>
            <Button variant="primary" onClick={() => openModal(getContentType('cursos'), null)}>
                Adicionar Novo curso
            </Button>
            <Button variant="primary" onClick={() => openModal(getContentType('noticias'), null)}>
                Adicionar Novo noticia
            </Button>
            <Button variant="primary" onClick={() => openModal(getContentType('videos'), null)}>
                Adicionar Novo video
            </Button>
            <Button variant="primary" onClick={() => openModal(getContentType('eventos'), null)}>
                Adicionar Novo evento
            </Button>

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
                                     evento={modal.editIndex !==null ? items.eventos[modal.editIndex] : undefined}/>
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
        </Container>
    );
};

export default PaginaTesteModais;
