import "./StyleListaCOnteudosPaginaBoletim.css"
import axios from "axios"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
interface Conteudo{
    dataPublicacao:number;
    id: number;
    descricao:string;
}
export default function ListaConteudosPaginaBoletins(){
    const[conteudos,setConteudos] = useState<Conteudo[]>([]);

    useEffect(() => {
        const buscarUltimosConteudos = async() => {
            try{
                const response = await axios.get(`src/Data/JsonsForTests/TesteConteudosNaListaDeBoletins.json`);
                setConteudos(response.data)
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
                                <Link to='#'>
                                    {conteudo.descricao}
                                </Link>
                            </div>
                        )
                )
            }

        </>
    )
}