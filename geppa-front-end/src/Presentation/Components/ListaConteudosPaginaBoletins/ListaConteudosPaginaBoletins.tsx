import "./StyleListaCOnteudosPaginaBoletim.css"
import axios from "axios"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import BASE_URL from "../../../Core/AxiosClient/AxiosClient.ts";

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
                const response = await axios.get(`${BASE_URL}/conteudos?quantidade=15`);
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