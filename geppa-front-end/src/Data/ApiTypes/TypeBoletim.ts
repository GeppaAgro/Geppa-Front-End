export type Boletim = {
    id:string;
    edicao: number;
    dataPublicacao: string;
};

/*
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

interface BoletimTeste{
    id:number;
    dataLancamento:string;
}

export default function PaginaListaBoletins() {

    const [listaboletins, setlistaboletins] = useState<BoletimTeste[]> ([]);

    useEffect(() => {
        fetch('src/Data/JsonsForTests/TesteDeRotaBoletim.json')
            .then((response) => {
                console.log('Response:', response);
                return response.json();
            })
            .then((lista) => {
                console.log('Lista de Boletins:', lista);
                setlistaboletins(lista);
            })
            .catch((error) => console.error("Erro ao carregar lista: ", error));
    }, []);

    return (
        <>
            <ul>
                {listaboletins.map(
                    (Boletim) =>
                        (
                            <li key={Boletim.id}>
                                <Link to={`/boletim/${Boletim.id}`}> id: {Boletim.id} - {Boletim.dataLancamento}</Link>
                            </li>
                        )
                )
                }
            </ul>

            teste da lista de boletins

        </>
    )
}

useEffect(() => {
        axios.get(`http://localhost/boletins?page=1&sort=edicao,desc&size=2`)
        .then(response => {
            console.log(response)
        })
            .catch(error => {
                console.log(error)
            } )
    }, []);

*/