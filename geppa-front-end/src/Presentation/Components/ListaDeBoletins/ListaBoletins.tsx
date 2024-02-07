import "./StyleListaBoletins.css"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios"

interface Boletim {
    id:number;
    edicao: string;
    dataPublicacao: string;
}

export default function ListaBoletins() {
    const [boletins, setBoletins] = useState<Boletim[]>([]);

    useEffect(() => {
        const buscarBoletins = async () => {
            try {
                const response = await axios.get('http://localhost/boletins?page=1&sort=edicao,desc&size=15');
                setBoletins(response.data.dados);
            } catch (error) {
                console.error('Erro ao buscar boletins:', error);
            }
        };

        buscarBoletins();
    }, []);




    return (
        <div>
            <div className="d-flex flex-row align-items-center justify-content-between gap-5">
                <h3 className="fw-bold">Boletins</h3>
            </div>
            <div className="container-lista-boletins px-5">
                <table className="text-center table table-striped table-hover tabela-boletins">
                    <thead className="fs-4">
                    <tr>
                        <th>Edição</th>
                        <th>Lançamento</th>
                    </tr>
                    </thead>
                    <tbody>
                    {boletins.map(
                        (Boletim) =>
                            (
                                <tr key={Boletim.id} className="linha-tabela-boletim fs-4">
                                    <td>
                                        <Link
                                            to={`/boletim/${Boletim.id}`}
                                            className="table-row-link">
                                            {Boletim.edicao}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/boletim/${Boletim.id}`}
                                            className="table-row-link">
                                            {Boletim.dataPublicacao}
                                        </Link>
                                    </td>
                                </tr>

                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>


    )
}