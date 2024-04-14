import "./StyleListaCOnteudosPaginaBoletim.css"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AxiosClient from "../../../Data/Services/AxiosClient.ts";

interface Conteudo{
    dataPublicacao:number;
    id: number;
    titulo:string;
    descricao:string;
    link:string;
}
export default function ListaConteudosPaginaBoletins(){
    const[conteudos,setConteudos] = useState<Conteudo[]>([]);

    useEffect(() => {
        const buscarUltimosConteudos = async() => {
            try{
                const response = await AxiosClient.get(`/conteudos?quantidade=15`);
                setConteudos(response.data.dados)
            }catch (error){
                console.error('Erro ao buscar conteudo', error)
            }
        }
        buscarUltimosConteudos()
    }, []);

    return(
        <>
            <h5 >Últimos conteúdos</h5>

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
    )
}