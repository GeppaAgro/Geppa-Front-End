import "./StylePaginaBoletim.css"

import {useEffect, useState} from "react";
import CardArtigoBoletim from "../../../Components/ComponentesBoletim/CardArtigoBoletim.tsx";
import {Container} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import CardCursoBoletim from "../../../Components/ComponentesBoletim/CardCursoBoletim.tsx";
import CardVideoBoletim from "../../../Components/ComponentesBoletim/CardVideoBoletim.tsx";
import BoletimBanner from "../../../Components/BoletimBanner/BoletimBanner.tsx";
import TabelaIndicadores from "../../../Components/Utils/TabelaIndicadores/TabelaIndicadores.tsx";
import {Artigo, Curso, Evento, Noticia, Video} from "../../../../Domain/TypesConteudos/TypesConteudos.ts";
import CardEventoBoletim from "../../../Components/ComponentesBoletim/CardEventoBoletim.tsx";
import CardNoticiaBoletim from "../../../Components/ComponentesBoletim/CardNoticiasBoletim.tsx";
import AxiosClient from "../../../../Data/Services/AxiosClient.ts";
import {PaginaBoletimSkeleton} from "../../../Components/Skeleton/PaginaBoletimSkeleton.tsx";

export default function PaginaBoletim() {
    const {edicao} = useParams<{ edicao: string }>()
    const [dataPublicacao, setDataPublicacao] = useState<Date>()
    const [linkBoletim] = useState<string>(`/boletins/${edicao}`);

    const [artigos, setArtigos] = useState<Artigo[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loadingBoletim, setLoadingBoletim] = useState<boolean>(true);


    useEffect(() => {
        const buscarBoletim = async () => {
            try {
                const response = await AxiosClient.get(linkBoletim)

                setDataPublicacao(new Date(response.data.dados.dataPublicacao))
                setArtigos(response.data.dados.artigos)
                setCursos(response.data.dados.cursos)
                setEventos(response.data.dados.eventos)
                setNoticias(response.data.dados.noticias)
                setVideos(response.data.dados.videos)
                setLoadingBoletim(false)
            } catch (error) {
                console.log("Boletim não encontrado")
            }
        };
        buscarBoletim()
    }, []);


    return (
        <>
            <BoletimBanner/>
            <Container className="d-flex justify-content-between mt-5">
                <h4>Edição: {edicao}</h4>
                <h4> Data de Publicação: {dataPublicacao?.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</h4>
                <h4><i className="ri-download-2-line fw-bold"></i> .PDF</h4>
            </Container>
            {loadingBoletim ? (
                <>
                    <PaginaBoletimSkeleton/>
                </>
            ) : (
                <>
                    {artigos.length > 0 && (
                        <Container>
                            <div className="d-flex justify-content-between mt-5 align-items-baseline">
                                <p className="fs-4 fw-bold"><i className="ri-article-line"></i> Artigos</p>
                                <Link to="#"
                                      className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium"> Clique
                                    para ver mais artigos</Link>
                            </div>
                            {
                                artigos.map((artigo) => (
                                    <div key={artigo.id}>
                                        <CardArtigoBoletim artigo={artigo}/>
                                    </div>
                                ))
                            }

                        </Container>
                    )}

                    {cursos.length > 0 && (
                        <Container>
                            <div className="d-flex justify-content-between mt-5 align-items-baseline">
                                <p className="fs-4 fw-bold"><i className="ri-graduation-cap-line"/> Cursos</p>
                                <Link to="#"
                                      className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium"> Clique
                                    para ver mais cursos</Link>
                            </div>
                            {
                                cursos.map((curso) => (
                                    <div key={curso.id}>
                                        <CardCursoBoletim curso={curso}/>
                                    </div>
                                ))
                            }
                        </Container>
                    )}

                    {eventos.length > 0 && (
                        <Container>
                            <div className="d-flex justify-content-between mt-5 align-items-baseline">
                                <h2 className="fs-4 fw-bold"><i className="ri-calendar-line"></i> Eventos</h2>
                                <Link to="#"
                                      className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium"> Clique
                                    para ver mais cursos</Link>
                            </div>
                            {
                                eventos.map((evento) => (
                                    <div key={evento.id}>
                                        <CardEventoBoletim evento={evento}/>
                                    </div>
                                ))
                            }
                        </Container>
                    )}

                    {noticias.length > 0 && (
                        <Container>
                            <div className="d-flex justify-content-between mt-5 align-items-baseline">
                                <h2 className="fs-4 fw-bold"><i className="ri-news-line"></i> Noticias</h2>
                                <Link to="#"
                                      className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium"> Clique
                                    para ver mais noticias</Link>
                            </div>
                            {
                                noticias.map((noticia) => (
                                    <div key={noticia.id}>
                                        <CardNoticiaBoletim noticia={noticia}/>
                                    </div>
                                ))
                            }
                        </Container>
                    )}

                    {videos.length > 0 && (
                        <Container>
                            <div className="d-flex justify-content-between mt-5 align-items-baseline">
                                <h2 className="fs-4 fw-bold"><i className="ri-video-line"></i> Videos</h2>
                                <Link to="#"
                                      className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium"> Clique
                                    para mais videos</Link>
                            </div>
                            {
                                videos.map((video) => (
                                    <div key={video.id}>
                                        <CardVideoBoletim video={video}/>
                                    </div>
                                ))
                            }
                        </Container>
                    )}


                    <Container className="text-center my-5 ">
                        <h2 className="fs-4 fw-bold">Indicadores</h2>
                        <TabelaIndicadores/>
                    </Container>
                </>
            )}
        </>
    )
}