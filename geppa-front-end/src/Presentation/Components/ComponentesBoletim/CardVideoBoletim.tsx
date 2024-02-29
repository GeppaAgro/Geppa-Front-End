import "./StyleCardBoletim.css"
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
import {Video} from "../../../Domain/TypesConteudos/TypeVideo.ts";

const CardVideoBoletim: React.FC <{video : Video}> = ({video}) => {

    const [videoVisivel, setVideoVisivel] = useState(false);

    const mostrarVideo = () => {
        setVideoVisivel(!videoVisivel);
    };

    return(
        <Container className="card-boletim p-5 mt-3 mb-3 d-flex flex-column justify-content-start p-3">
            <p className="card-boletim-titulo fs-3 fw-bold">
                {video.titulo.toUpperCase()}
            </p>
            <div className="card-boletim-informacoes fw-semibold fs-5">
                <p>

                </p>
            </div>
            <p className="card-boletim-descricao mt-2 mt-lg-0 fs-5 fw-medium">
                {video.descricao}
            </p>
            <div
                className="card-boletim-footer d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div
                    className="tags-boletim d-flex flex-wrap justify-content-start justify-content-md-end mb-2 mb-md-0">
                    {
                        video.tags.map(tag => (
                            <span className="card-boletim-tags p-3 fs-6 fw-semibold me-3" key={tag.id}> {tag.nome} </span>
                        ))
                    }
                </div>
                {
                    !video.youtube ? (
                        <div className="link-boletim mt-3 mt-md-0">
                            <Link to={video.link} className="card-boletim-btn p-3 fs-5 fw-bold ">
                                Visitar Video
                            </Link>
                        </div>
                    ) : (
                        <div className="link-boletim mt-3 mt-md-0">
                            <button
                                className="btn-abrir-video-boletim py-2 px-4 fw-semibold fs-5"
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