import "./StyleListaCOnteudosPaginaBoletim.css"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AxiosClient from "../../../Data/Services/AxiosClient.ts";
import {UltimosConteudosSimplificadoSkeleton} from "../Skeleton/UltimosConteudosSimplificadoSkeleton.tsx";

interface Conteudo {
    dataPublicacao: number;
    id: number;
    titulo: string;
    descricao: string;
    link: string;
}

export default function ListaConteudosPaginaBoletins() {
    const sizeConteudos = 10

    const [conteudos, setConteudos] = useState<Conteudo[]>([]);
    const [loadingConteudos, setLoadingConteudos] = useState<boolean>(true);


    useEffect(() => {
        const buscarUltimosConteudos = async () => {
            try {
                const response = await AxiosClient.get(`/conteudos?size=${sizeConteudos}`);
                setConteudos(response.data.dados)
                setLoadingConteudos(false);
            } catch (error) {
                console.error('Erro ao buscar conteudo', error)
                setLoadingConteudos(false);
            }
        }
        buscarUltimosConteudos()
    }, []);

    return (
        <>
            <h5>Últimos conteúdos</h5>
            {loadingConteudos ? (
                <>
                    {Array.from({length: sizeConteudos}).map((_, index) => (
                        <div key={index} className="containerConteudosSimplificado">
                            <UltimosConteudosSimplificadoSkeleton/>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {
                        conteudos.map(
                            (conteudo) =>
                                (
                                    <div key={conteudo.id} className="containerConteudosSimplificado">
                                        <Link to={conteudo.link} className="fs-6 fw-semibold">
                                            {conteudo.titulo}
                                        </Link>
                                    </div>
                                )
                        )
                    }
                </>
            )},

        </>
    )
}