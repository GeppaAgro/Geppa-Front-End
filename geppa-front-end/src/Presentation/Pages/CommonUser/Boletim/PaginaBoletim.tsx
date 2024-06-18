import "./StylePaginaBoletim.css";
import {useEffect, useRef, useState} from "react";
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
import AxiosClient from "../../../../Domain/Services/AxiosClient.ts";
import {PaginaBoletimSkeleton} from "../../../Components/Skeleton/PaginaBoletimSkeleton.tsx";
import {Indicador} from "../../../../Domain/TypesConteudos/Indicador.ts";
import html2pdf from "html2pdf.js";
import cores from "../../../Components/Utils/Cores.tsx";

export default function PaginaBoletim() {
    const {edicao} = useParams<{ edicao: string }>();
    const [dataPublicacao, setDataPublicacao] = useState<Date>();
    const [linkBoletim] = useState<string>(`/boletins/${edicao}`);
    const [artigos, setArtigos] = useState<Artigo[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [indicadores, setIndicadores] = useState<Indicador[]>([]);
    const [loadingBoletim, setLoadingBoletim] = useState<boolean>(true);
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const buscarBoletim = async () => {
            try {
                const response = await AxiosClient.get(linkBoletim);
                setDataPublicacao(new Date(response.data.dados.dataPublicacao));
                setArtigos(response.data.dados.artigos);
                setCursos(response.data.dados.cursos);
                setEventos(response.data.dados.eventos);
                setNoticias(response.data.dados.noticias);
                setVideos(response.data.dados.videos);
                setIndicadores(response.data.dados.indicadores);
                setLoadingBoletim(false);
            } catch (error) {
                console.log("Boletim não encontrado");
            }
        };
        buscarBoletim();
    }, []);

    const generatePDF = () => {
        const element = componentRef.current;
        const options = {
            margin: 0,
            filename: `Boletim-${edicao}.pdf`,
            image: {type: 'jpeg', quality: 0.98},
            html2canvas: {
                scale: 2,
                ignoreElements: (element) => element.classList.contains('no-print')
            },
            jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'},
            pagebreak: {mode: ['avoid-all', 'css', 'legacy']}
        };

        if (element) {
            html2pdf().from(element).set(options).save();
        }
    };

    return (
        <>
            <div ref={componentRef}>


                <BoletimBanner/>
                <Container className="d-flex justify-content-between mt-5">
                    <h4>Edição: {edicao}</h4>
                    <h4>Data de Publicação: {dataPublicacao?.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</h4>
                    <button className="btn btn-primary no-print" onClick={generatePDF}
                            style={{backgroundColor: cores.verdeOliva, border: 0}}>
                        <i className="ri-download-2-line fw-bold"></i> Download PDF
                    </button>
                </Container>
                <div>
                    {loadingBoletim ? (
                        <PaginaBoletimSkeleton/>
                    ) : (
                        <div>
                            {artigos.length > 0 && (
                                <Container>
                                    <div
                                        className="d-flex justify-content-between mt-5 align-items-baseline avoid-break">
                                        <p className="fs-4 fw-bold">
                                            <i className="ri-article-line"></i> Artigos
                                        </p>
                                        <Link to="#"
                                              className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium">
                                            Clique para ver mais artigos
                                        </Link>
                                    </div>
                                    {artigos.map((artigo) => (
                                        <div key={artigo.id} className="avoid-break">
                                            <CardArtigoBoletim artigo={artigo}/>
                                        </div>
                                    ))}
                                </Container>
                            )}
                            {cursos.length > 0 && (
                                <Container>
                                    <div
                                        className="d-flex justify-content-between mt-5 align-items-baseline avoid-break">
                                        <p className="fs-4 fw-bold">
                                            <i className="ri-graduation-cap-line"/> Cursos
                                        </p>
                                        <Link to="#"
                                              className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium">
                                            Clique para ver mais cursos
                                        </Link>
                                    </div>
                                    {cursos.map((curso) => (
                                        <div key={curso.id} className="avoid-break">
                                            <CardCursoBoletim curso={curso}/>
                                        </div>
                                    ))}
                                </Container>
                            )}
                            {eventos.length > 0 && (
                                <Container>
                                    <div
                                        className="d-flex justify-content-between mt-5 align-items-baseline avoid-break">
                                        <h2 className="fs-4 fw-bold">
                                            <i className="ri-calendar-line"></i> Eventos
                                        </h2>
                                        <Link to="#"
                                              className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium">
                                            Clique para ver mais cursos
                                        </Link>
                                    </div>
                                    {eventos.map((evento) => (
                                        <div key={evento.id} className="avoid-break">
                                            <CardEventoBoletim evento={evento}/>
                                        </div>
                                    ))}
                                </Container>
                            )}
                            {noticias.length > 0 && (
                                <Container>
                                    <div
                                        className="d-flex justify-content-between mt-5 align-items-baseline avoid-break">
                                        <h2 className="fs-4 fw-bold">
                                            <i className="ri-news-line"></i> Notícias
                                        </h2>
                                        <Link to="#"
                                              className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium">
                                            Clique para ver mais notícias
                                        </Link>
                                    </div>
                                    {noticias.map((noticia) => (
                                        <div key={noticia.id} className="avoid-break">
                                            <CardNoticiaBoletim noticia={noticia}/>
                                        </div>
                                    ))}
                                </Container>
                            )}
                            {videos.length > 0 && (
                                <Container>
                                    <div
                                        className="d-flex justify-content-between mt-5 align-items-baseline avoid-break">
                                        <h2 className="fs-4 fw-bold">
                                            <i className="ri-video-line"></i> Vídeos
                                        </h2>
                                        <Link to="#"
                                              className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium">
                                            Clique para mais vídeos
                                        </Link>
                                    </div>
                                    {videos.map((video) => (
                                        <div key={video.id} className="avoid-break">
                                            <CardVideoBoletim video={video}/>
                                        </div>
                                    ))}
                                </Container>
                            )}
                            {indicadores.length > 0 && (
                                <Container className="text-center my-5 avoid-break">
                                    <TabelaIndicadores indicadores={indicadores}/>
                                </Container>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
