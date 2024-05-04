import "./StyleCardBoletim.css"
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
import {Video} from "../../../Domain/TypesConteudos/Conteudos/TypeVideo.ts";

const CardVideoBoletim: React.FC <{video : Video}> = ({video}) => {

    const [videoVisivel, setVideoVisivel] = useState(false);

    const mostrarVideo = () => {
        setVideoVisivel(!videoVisivel);
    };

    return(
        <Container className="card-boletim p-5 mt-1 mb-3 d-flex flex-column justify-content-start ">
            <p className="card-boletim-titulo fs-5 fw-bold">
                {video.titulo.toUpperCase()}
            </p>
            <div className="card-boletim-informacoes fw-bold fs-6">
                <p>

                </p>
            </div>
            <p className="card-boletim-descricao mt-2 mt-lg-0 fs-6 fw-medium">
                {video.descricao}
            </p>
            <div
                className="card-boletim-footer d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div
                    className="tags-boletim d-flex flex-wrap justify-content-start justify-content-md-end mb-2 mb-md-0 gap-3">
                    {
                        video.tags.map(tag => (
                            <span className="card-boletim-tags p-3 fs-6 fw-semibold " key={tag.id}> {tag.nome} </span>
                        ))
                    }
                </div>
                {
                    !video.youtube ? (
                        <div className="link-boletim mt-3 mt-md-0 card-boletim-btn p-3 ">
                            <Link to={video.link} className="fs-6 fw-bold ">
                                Visitar Video
                            </Link>
                        </div>
                    ) : (
                        <div className="link-boletim mt-3 mt-md-0">
                            <button
                                className="btn-abrir-video-boletim py-2 px-4 fw-semibold fs-6"
                                onClick={mostrarVideo}>
                                Assistir video <i className="ri-arrow-down-s-line"/>
                            </button>
                        </div>
                    )
                }
            </div>
            {
                videoVisivel &&(
                    video.youtube && (
                        <video src="#" className="object-fit-contain video-boletim"/>
                    )
                )
            }
        </Container>
    )
}

export default CardVideoBoletim