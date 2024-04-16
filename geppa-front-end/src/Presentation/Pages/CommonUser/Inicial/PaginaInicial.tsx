import {Banner} from "../../../Components/Inicial/Banner/Banner.tsx";
import AreaInscricao from "../../../Components/Inicial/AreaInscricao/AreaInscricao.tsx";
import UltimosConteudos from "../../../Components/Inicial/UltimosConteudos/UltimosConteudos.tsx";
import {useEffect, useState} from "react";
import {TypeConteudoGenerico} from "../../../Components/Inicial/UltimosConteudos/TypeConteudoGenerico.ts";
import {Container} from "react-bootstrap";
import AxiosClient from "../../../../Data/Services/AxiosClient.ts";
import {UltimosConteudosHomeSkeleton} from "../../../Components/Skeleton/UltimosConteudosHomeSkeleton.tsx";

export default function PaginaInicial() {
    const [urlUltimosConteudos] = useState<string>(`/conteudos/ultimos-por-conteudo?size=4`)
    const [artigos, setArtigos] = useState<TypeConteudoGenerico[]>([])
    const [cursos, setCursos] = useState<TypeConteudoGenerico[]>([])
    const [eventos, setEventos] = useState<TypeConteudoGenerico[]>([])
    const [noticias, setNoticias] = useState<TypeConteudoGenerico[]>([])
    const [videos, setVideos] = useState<TypeConteudoGenerico[]>([])
    const [loadingUltimosConteudos, setLoadingUltimosConteudos] = useState<boolean>(true);

    useEffect(() => {
        const buscarUltimosConteudos = async () => {
            try {
                const res = await AxiosClient.get(urlUltimosConteudos)
                setArtigos(res.data.dados.Artigo)
                setCursos(res.data.dados.Curso)
                setEventos(res.data.dados.Evento)
                setNoticias(res.data.dados.Noticia)
                setVideos(res.data.dados.Video)
                setLoadingUltimosConteudos(false);
            } catch (error) {
                console.log("Algo deu errado:", error);
                setLoadingUltimosConteudos(false);
            }
        }
        buscarUltimosConteudos();
    }, []);

    return (
        <>
            <Container>
                <Banner/>
                <AreaInscricao/>
                <div className="mt-5">
                    {loadingUltimosConteudos ? (
                        <>
                            <UltimosConteudosHomeSkeleton/>
                            <UltimosConteudosHomeSkeleton/>
                            <UltimosConteudosHomeSkeleton/>
                            <UltimosConteudosHomeSkeleton/>
                            <UltimosConteudosHomeSkeleton/>
                        </>
                    ) : (
                        <>
                            <UltimosConteudos tipo={"Artigos"} conteudoGenerico={artigos}/>
                            <UltimosConteudos tipo={"Cursos"} conteudoGenerico={cursos}/>
                            <UltimosConteudos tipo={"Eventos"} conteudoGenerico={eventos}/>
                            <UltimosConteudos tipo={"Noticias"} conteudoGenerico={noticias}/>
                            <UltimosConteudos tipo={"Videos"} conteudoGenerico={videos}/>
                        </>
                    )}
                </div>
            </Container>

        </>
    )
}