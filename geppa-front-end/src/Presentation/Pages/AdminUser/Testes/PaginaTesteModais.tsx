import { useState } from "react";
import {Artigo, Curso, Evento, Noticia, Video} from "../../../../Domain/TypesConteudos/TypesConteudos.ts";
import {Button, Container} from "react-bootstrap";
import ModalArtigo from "../../../Components/Modais/ModalArtigo.tsx";
import ModalCurso from "../../../Components/Modais/ModalCurso.tsx";
import ModalEvento from "../../../Components/Modais/ModalEvento.tsx";
import ModalNoticia from "../../../Components/Modais/ModalNoticia.tsx";
import ModalVideo from "../../../Components/Modais/ModalVideo.tsx";

const PaginaTesteModais: React.FC = () => {
    const [artigos, setArtigos] = useState<Artigo[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);

    const [showArtigo, setShowArtigo] = useState(false);
    const [showCurso, setShowCurso] = useState(false);
    const [showEvento, setShowEvento] = useState(false);
    const [showNoticia, setShowNoticia] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const abrirModalArtigo = () => setShowArtigo(true);
    const abrirModalCurso = () => setShowCurso(true);
    const abrirModalEvento = () => setShowEvento(true);
    const abrirModalNoticia = () => setShowNoticia(true);
    const abrirModalVideo = () => setShowVideo(true);

    const fecharModal = () => {
        setShowVideo(false);
        setShowArtigo(false);
        setShowCurso(false);
        setShowEvento(false);
        setShowNoticia(false);
        setEditIndex(null);
    };
    
    const salvarItem = <T,>(
        setItems: React.Dispatch<React.SetStateAction<T[]>>,
        item: T,
        editIndex: number | null,
        setEditIndex: React.Dispatch<React.SetStateAction<number | null>>
    ) => {
        if (editIndex !== null) {
            setItems(prevItems => {
                const newItems = [...prevItems];
                newItems[editIndex] = item;
                return newItems;
            });
            setEditIndex(null);
        } else {
            setItems(prevItems => [...prevItems, item]);
        }
    }

    const deletarItem = <T,>(
        setItems: React.Dispatch<React.SetStateAction<T[]>>,
        index: number
    ) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems.splice(index, 1);
            return newItems;
        });
    };

    const salvarArtigo = (data: Artigo) => {
        salvarItem(setArtigos, data, editIndex, setEditIndex);
    }
    const salvarCurso = (data: Curso) => {
        salvarItem(setCursos, data, editIndex, setEditIndex);
    }
    const salvarEvento = (data: Evento) => {
        salvarItem(setEventos, data, editIndex, setEditIndex);
    }
    const salvarNoticia = (data: Noticia) => {
        salvarItem(setNoticias, data, editIndex, setEditIndex);
    }
    const salvarVideo = (data: Video) => {
        salvarItem(setVideos, data, editIndex, setEditIndex);
    }


    const editarArtigo = (index: number) => {
        setEditIndex(index);
        abrirModalArtigo();
    };
    const editarCurso = (index: number) => {
        setEditIndex(index);
        abrirModalCurso();
    };
    const editarEvento = (index: number) => {
        setEditIndex(index);
        abrirModalEvento();
    };
    const editarNoticia = (index: number) => {
        setEditIndex(index);
        abrirModalNoticia();
    };
    const editarVideo = (index: number) => {
        setEditIndex(index);
        abrirModalVideo();
    };


    const deletarArtigo = (index: number) => deletarItem(setArtigos, index);
    const deletarCurso = (index: number) => deletarItem(setCursos, index);
    const deletarEvento = (index: number) => deletarItem(setEventos, index);
    const deletarNoticia = (index: number) => deletarItem(setNoticias, index);
    const deletarVideo = (index: number) => deletarItem(setVideos, index);



    return (
        <Container className="">
            <ModalArtigo
                abrir={showArtigo}
                fechar={fecharModal}
                mostrar={abrirModalArtigo}
                salvar={salvarArtigo}
                artigo={editIndex !==null ? artigos[editIndex]: undefined}
            />
            <ModalCurso
                abrir={showCurso}
                fechar={fecharModal}
                mostrar={abrirModalCurso}
                salvar={salvarCurso}
                curso={editIndex !== null ? cursos[editIndex]: undefined}
            />
            {//<ModalEvento
             //   abrir={showEvento}
             //   fechar={fecharModal}
             //   mostrar={abrirModalEvento}
             //   salvar={salvarEvento}
             //    curso={editIndex !== null ? eventos[editIndex]: undefined}
             //   />
            }
            <ModalNoticia
                abrir={showNoticia}
                fechar={fecharModal}
                mostrar={abrirModalNoticia}
                salvar={salvarNoticia}
                noticia={editIndex !== null ? noticias [editIndex]: undefined}
            />
            <ModalVideo
                abrir={showVideo}
                fechar={fecharModal}
                mostrar={abrirModalVideo}
                salvar={salvarVideo}
                video={editIndex !== null ? videos[editIndex]: undefined}
            />
            <ul>
                <h4>Artigos</h4>
                {artigos.map((artigo, index) => (
                    <li key={index} className="mb-3">
                        <div className="d-flex col align-items-center gap-3">
                            <p>
                                {artigo.titulo}
                            </p>
                            <Button variant="2" onClick={() => editarArtigo(index)}><i className="ri-pencil-line"></i></Button>
                            <Button onClick={() => deletarArtigo(index)}><i className="ri-delete-back-2-line"></i></Button>
                        </div>
                    </li>
                ))}
                <h4>Cursos</h4>
                {cursos.map((curso, index) => (
                    <li key={index} className="mb-3">
                        <div className="d-flex col align-items-center gap-3">
                            <p>
                                {curso.titulo}
                            </p>
                            <Button variant="2" onClick={() => editarCurso(index)}><i className="ri-pencil-line"></i></Button>
                            <Button onClick={() => deletarCurso(index)}><i className="ri-delete-back-2-line"></i></Button>
                        </div>
                    </li>
                ))}
                <h4>Eventos</h4>
                {eventos.map((evento, index) => (
                    <li key={index} className="mb-3">
                        <div className="d-flex col align-items-center gap-3">
                            <p>
                                {evento.titulo}
                            </p>
                            <Button variant="2" onClick={() => editarEvento(index)}><i className="ri-pencil-line"></i></Button>
                            <Button onClick={() => deletarEvento(index)}><i className="ri-delete-back-2-line"></i></Button>
                        </div>
                    </li>
                ))}

                <h4>Noticia</h4>
                {noticias.map((noticia, index) => (
                    <li key={index} className="mb-3">
                        <div className="d-flex col align-items-center gap-3">
                            <p>
                                {noticia.titulo}
                            </p>
                            <Button variant="2" onClick={() => editarNoticia(index)}><i className="ri-pencil-line"></i></Button>
                            <Button onClick={() => deletarNoticia(index)}><i className="ri-delete-back-2-line"></i></Button>
                        </div>
                    </li>
                ))}

                <h4>Videos</h4>
                {videos.map((video, index) => (
                    <li key={index} className="mb-3">
                        <div className="d-flex col align-items-center gap-3">
                            <p>
                                {video.titulo}
                            </p>
                            <Button variant="2" onClick={() => editarVideo(index)}><i className="ri-pencil-line"></i></Button>
                            <Button onClick={() => deletarVideo(index)}><i className="ri-delete-back-2-line"></i></Button>
                        </div>

                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default PaginaTesteModais;
