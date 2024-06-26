import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import CardArtigoBoletim from "../../../Components/ComponentesBoletim/CardArtigoBoletim.tsx";
import CardCursoBoletim from "../../../Components/ComponentesBoletim/CardCursoBoletim.tsx";
import CardNoticiaBoletim from "../../../Components/ComponentesBoletim/CardNoticiasBoletim.tsx";
import CardVideoBoletim from "../../../Components/ComponentesBoletim/CardVideoBoletim.tsx";
import {Artigo, Curso, Evento, Noticia, Tag, Video} from "../../../../Domain/TypesConteudos/TypesConteudos.ts";
import CardEventoBoletim from "../../../Components/ComponentesBoletim/CardEventoBoletim.tsx";
import AxiosClient from "../../../../Domain/Services/AxiosClient.ts";
import {ConteudoSkeleton} from "../../../Components/Skeleton/ConteudoSkeleton.tsx";
import Paginacao from "../../../Components/Paginacao/Paginacao.tsx";
import BuscadorTag from "../../../Components/Modais/ComponentesModal/BuscadorDeTag.tsx";
import cores from "../../../Components/Utils/Cores.tsx";

export default function PaginaListaConteudos() {
    const {filtro} = useParams<{ filtro: string }>();
    const [filtroSelecionado, setFiltroSelecionado] = useState<string>(filtro || 'artigos');
    const [numeroPagina, setNumeroPagina] = useState<number>(0)
    const [qtdPaginas, setQtdPaginas] = useState<number>(1)
    const [artigos, setArtigos] = useState<Artigo[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loadingConteudos, setLoadingConteudos] = useState<boolean>(true);

    const [tags, setTags] = useState<Tag[]>([])
    const urlConteudo = `/${filtroSelecionado}?page=${numeroPagina}&sort=titulo,desc&size=5&tags=${tags.map(tag => tag.nome).join(",")}`;

    const trocarFiltro = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLoadingConteudos(true)
        const novoFiltro = event.target.value;
        setFiltroSelecionado(novoFiltro);
        setNumeroPagina(0);
    };

    useEffect(() => {
        const buscarConteudo = async () => {
            setLoadingConteudos(true)
            try {
                switch (filtroSelecionado.toLowerCase()) {
                    case 'artigos':
                        try {
                            const response = await AxiosClient.get(urlConteudo);
                            setArtigos(response.data.dados)
                            setQtdPaginas(response.data.totalPaginas)
                            setLoadingConteudos(false)
                            setErroMensagem(``)
                        } catch (error) {
                            setLoadingConteudos(false)
                            setErroMensagem(`${filtroSelecionado} não encontrado com essa tag`)
                        }
                        break;
                    case 'cursos':
                        try {
                            const response = await AxiosClient.get(urlConteudo);
                            setCursos(response.data.dados)
                            setQtdPaginas(response.data.totalPaginas)
                            setLoadingConteudos(false)
                            setErroMensagem(``)
                        } catch (error) {
                            setLoadingConteudos(false)
                            setErroMensagem(`${filtroSelecionado} não encontrado com essa tag`)
                        }
                        break;
                    case 'eventos':
                        try {
                            const response = await AxiosClient.get(urlConteudo);
                            setEventos(response.data.dados)
                            setQtdPaginas(response.data.totalPaginas)
                            setLoadingConteudos(false)
                            setErroMensagem(``)
                        } catch (error) {
                            setLoadingConteudos(false)
                            setErroMensagem(`${filtroSelecionado} não encontrado com essa tag`)
                        }
                        break;
                    case 'noticias':
                        try {
                            const response = await AxiosClient.get(urlConteudo);
                            setNoticias(response.data.dados)
                            setQtdPaginas(response.data.totalPaginas)
                            setLoadingConteudos(false)
                            setErroMensagem(``)
                        } catch (error) {
                            setLoadingConteudos(false)
                            setErroMensagem(`${filtroSelecionado} não encontrado com essa tag`)
                        }
                        break;
                    case 'videos':
                        try {
                            const response = await AxiosClient.get(urlConteudo);
                            setVideos(response.data.dados)
                            setQtdPaginas(response.data.totalPaginas)
                            setLoadingConteudos(false)
                            setErroMensagem(``)
                        } catch (error) {
                            setLoadingConteudos(false)
                            setErroMensagem(`${filtroSelecionado} não encontrado com essa tag`)
                        }
                        break;
                    default:
                        null;
                }
            } catch (error) {
                setLoadingConteudos(false)
            }
        };
        buscarConteudo()
    }, [filtroSelecionado, urlConteudo]);

    const handlePageChange = (page: number) => {
        setNumeroPagina(page);
    };

    const renderizarConteudoSelecionado = () => {
        switch (filtroSelecionado) {
            case 'artigos' :
                return (
                    <>
                        {
                            artigos.map((artigo) => (
                                <div key={artigo.id}>
                                    <CardArtigoBoletim artigo={artigo}/>
                                </div>
                            ))
                        }
                    </>
                )
            case 'cursos' :
                return (
                    <>
                        {
                            cursos.map((curso) => (
                                <div key={curso.id}>
                                    <CardCursoBoletim curso={curso}/>
                                </div>
                            ))
                        }
                    </>
                )
            case 'eventos' :
                return (
                    <>
                        {
                            eventos.map((evento) => (
                                <div key={evento.id}>
                                    <CardEventoBoletim evento={evento}/>
                                </div>
                            ))
                        }
                    </>
                )
            case 'noticias' :
                return (
                    <>
                        {
                            noticias.map((noticia) => (
                                <div key={noticia.id}>
                                    <CardNoticiaBoletim noticia={noticia}/>
                                </div>
                            ))
                        }
                    </>
                )
            case 'videos' :
                return (
                    <>
                        {
                            videos.map((video) => (
                                <div key={video.id}>
                                    <CardVideoBoletim video={video}/>
                                </div>
                            ))
                        }
                    </>
                )
            default :
                return (<>
                    Erro ao buscar esse tipo de conteudo
                </>)
        }
    }

    const [erroMensagem, setErroMensagem] = useState<string>(``)
    const addTag = (newTag: Tag) => {
        const tagExists = tags.some(tag => tag.nome === newTag.nome);
        if (!tagExists && tags.length <3) {
            setTags([...tags, newTag]);
        }
    };
    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };
    const clearTags = () => {
        setTags([]);
    };

    return (
        <>
            <Container className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="input-group my-3">
                            <label className="input-group-text d-none d-lg-block " htmlFor="filtro">Tipo do
                                conteúdo:</label>
                            <select className="form-select" id="filtro" value={filtroSelecionado}
                                    onChange={trocarFiltro}>
                                <option value="artigos">Artigo</option>
                                <option value="cursos">Cursos</option>
                                <option value="eventos">Eventos</option>
                                <option value="noticias">Notícias</option>
                                <option value="videos">Vídeo</option>
                            </select>
                        </div>
                        <BuscadorTag label="Buscar por tag (máximo 3) " salvarTag={addTag} erro={erroMensagem} tentouSalvar={false}/>
                        <div className="d-flex justify-content-between gap-1">
                            <div className="d-flex flex-row gap-1 ">
                                {tags.map((tag, index) => (
                                    <Button className="d-flex justify-content-between gap-2 align-items-center"
                                            style={{backgroundColor: cores.verdeOliva}}
                                            variant="secondary" onClick={() => removeTag(index)} key={tag.id}>
                                        <span>{tag.nome}</span>
                                        <i className="ri-delete-bin-2-line"/>
                                    </Button>
                                ))}
                            </div>
                            <Button variant="light" onClick={clearTags}><i className="ri-filter-off-line"></i></Button>
                        </div>
                    </div>
                </div>
            </Container>

            <Container>
                {loadingConteudos ? (
                    <>
                        {Array.from({length: 5}).map((_, index) => (
                            <div key={index}>
                                <ConteudoSkeleton/>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {renderizarConteudoSelecionado()}
                        <Paginacao
                            currentPage={numeroPagina}
                            totalPages={qtdPaginas}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </Container>
        </>
    )

}


