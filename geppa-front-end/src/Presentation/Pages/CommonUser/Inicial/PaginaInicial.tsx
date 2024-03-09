import {Banner} from "../../../Components/Inicial/Banner/Banner.tsx";
import AreaInscricao from "../../../Components/Inicial/AreaInscricao/AreaInscricao.tsx";
import UltimosConteudos from "../../../Components/Inicial/UltimosConteudos/UltimosConteudos.tsx";
import {useEffect, useState} from "react";
import BASE_URL from "../../../../Core/AxiosClient/AxiosClient.ts";
import axios from "axios"
import {TypeConteudoGenerico} from "../../../Components/Inicial/UltimosConteudos/TypeConteudoGenerico.ts";
import {Container} from "react-bootstrap";

export default function PaginaInicial() {
    const [urlUltimosConteudos] = useState<string>(`${BASE_URL}/conteudos/ultimos-por-conteudo?quantidade=4`)
    const [artigos, setArtigos] = useState<TypeConteudoGenerico[]>([])
    const [cursos, setCursos] = useState<TypeConteudoGenerico[]>([])
    const [eventos, setEventos] = useState<TypeConteudoGenerico[]>([])
    const [noticias, setNoticias] = useState<TypeConteudoGenerico[]>([])
    const [videos, setVideos] = useState<TypeConteudoGenerico[]>([])

    useEffect(() => {
        const buscarUltimosConteudos = async () => {
            try {
                const res = await axios.get(urlUltimosConteudos);
                setArtigos(res.data.dados.Artigo)
                setCursos(res.data.dados.Curso)
                setEventos(res.data.dados.Evento)
                setNoticias(res.data.dados.Noticia)
                setVideos(res.data.dados.Video)

                console.log(res)
            } catch (error) {
                console.log("Algo deu errado:", error);
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
                    <UltimosConteudos tipo={"Artigos"} conteudoGenerico={artigos}/>
                    <UltimosConteudos tipo={"Cursos"} conteudoGenerico={cursos}/>
                    <UltimosConteudos tipo={"Eventos"} conteudoGenerico={eventos}/>
                    <UltimosConteudos tipo={"Noticias"} conteudoGenerico={noticias}/>
                    <UltimosConteudos tipo={"Videos"} conteudoGenerico={videos}/>
                </div>
            </Container>

        </>
    )
}