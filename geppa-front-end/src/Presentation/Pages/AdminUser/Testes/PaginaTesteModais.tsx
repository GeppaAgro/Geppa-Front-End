import { useState } from "react";
import ModalVideo from "../../../Components/Modais/ModalVideo.tsx";
import {Video} from "../../../../Domain/TypesConteudos/TypeVideo.ts";
import {Button} from "react-bootstrap";


const PaginaTesteModais: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [show, setShow] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const fecharModal = () => {
        setShow(false)
        setEditIndex(null)
    };
    const abrirModal = () => setShow(true);
    const salvarVideos = (data: Video) => {
        if (editIndex !== null) {
            setVideos(prevVideos => {
                const newVideos = [...prevVideos];
                newVideos[editIndex] = data;
                return newVideos;
            });
            setEditIndex(null);
        } else {
            setVideos(prevVideos => [...prevVideos, data]);
        }
    };

    const editarVideo = (index: number) => {
        setEditIndex(index);
        abrirModal();
    };

    const deletarVideo = (index: number) => {
        setVideos(prevVideos => {
            const newVideos = [...prevVideos];
            newVideos.splice(index, 1);
            return newVideos;
        });
    };

    return (
        <div className="App ">
            <ModalVideo abrir={show} fechar={fecharModal} mostrar={abrirModal} salvar={salvarVideos} video={editIndex !== null ? videos[editIndex]: undefined} />
            <ul>
                {videos.map((video, index) => (
                    <li key={index} className="mb-3">
                        <div className="d-flex col align-items-center gap-3">
                            <p>
                                {video.titulo}
                            </p>
                            <Button variant="2" onClick={() => editarVideo(index)}><i className="ri-pencil-line"></i></Button>
                            <Button onClick={() => deletarVideo(index)}><i className="ri-pencil-line"></i></Button>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaginaTesteModais;
