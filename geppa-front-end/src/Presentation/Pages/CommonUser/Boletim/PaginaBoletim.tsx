import "./StylePaginaBoletim.css"

import axios from "axios"
import {useEffect, useState} from "react";
import CardArtigoBoletim from "../../../Components/ComponentesBoletim/CardArtigoBoletim.tsx";
import {Container} from "react-bootstrap";
import {ArtigoTeste,CursoTeste,EventoTeste,NoticiaTeste,VideoTeste} from "./TypesForTest.ts";
import {Link} from "react-router-dom";
import CardCursoBoletim from "../../../Components/ComponentesBoletim/CardCursoBoletim.tsx";
import CardEventoBoletim from "../../../Components/ComponentesBoletim/CardEventoBoletim.tsx";
import CardNoticiaBoletim from "../../../Components/ComponentesBoletim/CardNoticiasBoletim.tsx";
import CardVideoBoletim from "../../../Components/ComponentesBoletim/CardVideoBoletim.tsx";

export default function PaginaBoletim() {

    const [edicao] = useState<string>(`AA88J`);
    const [dataPublicacao] = useState<Date>(new Date(`2022-01-01`));

    const [linkAPI] = useState<string>(`src/Presentation/Pages/CommonUser/Boletim/ValoresTestComponenteBoletim.json`);
    const artigos: ArtigoTeste[] = [
        {
            id: "001",
            titulo: "titulo do artigo 1",
            dataPublicacao: new Date("2022-01-01"),
            descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis metus nec erat laoreet, vel malesuada ligula rhoncus. Praesent sed massa in purus suscipit tristique. Sed nec diam at augue euismod fermentum id ac ante. Aenean dignissim, elit ac hendrerit lacinia, quam tellus blandit urna, nec faucibus ipsum ex in ex.",
            autores: ["Autor 1", "Autor 2"],
            tags: ["Tag 1", "Tag 2"],
            link: "#"
        },
        {
            id: "002",
            titulo: "titulo do artigo 2",
            dataPublicacao: new Date("2022-02-01"),
            descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis metus nec erat laoreet, vel malesuada ligula rhoncus. Praesent sed massa in purus suscipit tristique. Sed nec diam at augue euismod fermentum id ac ante. Aenean dignissim, elit ac hendrerit lacinia, quam tellus blandit urna, nec faucibus ipsum ex in ex.",
            autores: ["Autor 3", "Autor 4"],
            tags: ["Tag 3", "Tag 4"],
            link: "#"
        },
        {
            id: "003",
            titulo: "titulo do artigo 3",
            dataPublicacao: new Date("2022-03-01"),
            descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis metus nec erat laoreet, vel malesuada ligula rhoncus. Praesent sed massa in purus suscipit tristique. Sed nec diam at augue euismod fermentum id ac ante. Aenean dignissim, elit ac hendrerit lacinia, quam tellus blandit urna, nec faucibus ipsum ex in ex.",
            autores: ["Autor 5", "Autor 6"],
            tags: ["Tag 5", "Tag 6", "Tag 7"],
            link: "#"
        }
    ];

    //const [artigos, setArtigos] = useState<ArtigoTeste[]>([])
    const [cursos, setCursos] = useState<CursoTeste[]>([]);
    const [eventos, setEventos] = useState<EventoTeste[]>([]);
    const [noticias, setNoticias] = useState<NoticiaTeste[]>([]);
    const[videos, setVideos] = useState<VideoTeste[]>([]);

    useEffect(() => {
        const buscaObjetosBoletim = async () => {
            try {
                const res = await axios.get(linkAPI);
                setCursos(res.data.cursos);
                setEventos(res.data.eventos);
                setNoticias(res.data.noticias);
                setVideos(res.data.videos);
            } catch (error) {
                console.log(`Deu Ruim`, error);
            }
        };
        buscaObjetosBoletim();
    }, []);

    /*useEffect(() => {
        console.log(cursos);
        console.log(eventos);
        console.log(noticias);
        console.log(videos);
    }, [cursos, eventos, noticias, videos]);
    */


    return (
        <>
            <Container className="d-flex justify-content-between mt-3">
                <h3>Edição é: {edicao}</h3>
                <h3>A data é: {dataPublicacao.toLocaleDateString()}</h3>
                <h3><i className="ri-download-2-line fw-bold"></i> .PDF</h3>
            </Container>

            {artigos.length > 0 && (
                <Container>
                    <div className="d-flex justify-content-between mt-5 align-items-baseline">
                        <h2><i className="ri-article-line"></i> Artigos</h2>
                        <Link to="#" className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium"> Clique para ver mais artigos</Link>
                    </div>
                    {artigos.map((artigo) => (
                        <CardArtigoBoletim key={artigo.id} artigo={artigo}/>
                    ))}
                </Container>
            )}

            {cursos.length > 0 && (
                <Container>
                    <div className="d-flex justify-content-between mt-5 align-items-baseline">
                        <h2><i className="ri-graduation-cap-line"/> Cursos</h2>
                        <Link to="#" className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium"> Clique para ver mais cursos</Link>
                    </div>
                    {cursos.map((curso) => (
                        <CardCursoBoletim key={curso.id} curso={curso}/>
                    ))}
                </Container>
            )}

            {eventos.length > 0 && (
                <Container>
                    <div className="d-flex justify-content-between mt-5 align-items-baseline">
                        <h2><i className="ri-graduation-cap-line"/> Eventos</h2>
                        <Link to="#" className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium"> Clique para ver mais cursos</Link>
                    </div>
                        {eventos.map((evento) => (
                        <CardEventoBoletim key={evento.id} evento={evento}/>
                    ))}
                </Container>
            )}

            {noticias.length > 0 && (
                <Container>
                    <div className="d-flex justify-content-between mt-5 align-items-baseline">
                        <h2><i className="ri-graduation-cap-line"/> Noticias</h2>
                        <Link to="#" className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium"> Clique para ver mais noticias</Link>
                    </div>
                    {noticias.map((noticia) => (
                        <CardNoticiaBoletim key={noticia.id} noticia={noticia}/>
                    ))}
                </Container>
            )}

            {videos.length > 0 && (
                <Container>
                    <div className="d-flex justify-content-between mt-5 align-items-baseline">
                        <h2><i className="ri-graduation-cap-line"/> Videos</h2>
                        <Link to="#" className="pagina-boletim-btn-clique-para-mais text-decoration-underline fw-medium"> Clique para mais videos</Link>
                    </div>
                    {videos.map((video) => (
                        <CardVideoBoletim key={video.id} video={video}/>
                    ))}
                </Container>
            )}


        </>

    )
}