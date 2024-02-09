import "./StyleListaBoletins.css"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios"
import {Boletim} from "../../../Data/ApiTypes/TypeBoletim.ts";
import {ConsultaBoletim} from "../../../Data/ApiTypes/TypeConsultaBoletim.ts";
import {LinksConsultaPaginacao} from "../../../Data/ApiTypes/TypeLinkConsultaPaginacao.ts";

export default function ListaBoletins() {
    const [boletins, setBoletins] = useState<Boletim[]>([]);
    const[consultaBoletim, setConsultaBoletim] = useState<ConsultaBoletim>();
    const[linksPaginacaoBoletim, setLinksPaginacaoBoletim] = useState<LinksConsultaPaginacao | undefined>(undefined);
    const[urlListaBoletim, setUrlListaBoletim] = useState<string>(`http://localhost/boletins?page=0&sort=edicao,desc&size=15`);

    useEffect(() => {
        const buscarBoletins = async () => {
            try {
                const response = await axios.get(urlListaBoletim);
                setConsultaBoletim(response.data);
                setBoletins(response.data.dados);
                setLinksPaginacaoBoletim(response.data._links);
                //console.log("executou busca");
            } catch (error) {
                console.error('Erro ao buscar boletins:', error);
            }
        };
        buscarBoletins();
    }, [urlListaBoletim]);
    const carregarProximaPagina = () => {
        if (linksPaginacaoBoletim && linksPaginacaoBoletim.proximaPagina) {
            setUrlListaBoletim(linksPaginacaoBoletim.proximaPagina.href);
        } else {
            console.error('linksPaginacaoBoletim.paginaAtual está vazio ou indefinido.');
        }

    };
    const carregarPaginaAnterior = () => {
        if (linksPaginacaoBoletim && linksPaginacaoBoletim.paginaAnterior) {
            setUrlListaBoletim(linksPaginacaoBoletim.paginaAnterior.href);
        } else {
            console.error('linksPaginacaoBoletim.paginaAnterior está vazio ou indefinido.');
        }
    };

    //console.log(setLinksPaginacaoBoletim);
    //console.log(consultaBoletim)
    //console.log(linksPaginacaoBoletim?.proximaPagina.href)

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
                <div className="paginationButtons">
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                className={`page-link fs-4 ${!linksPaginacaoBoletim || !linksPaginacaoBoletim.paginaAnterior ? 'd-none' : ''}`}
                                onClick={carregarPaginaAnterior}
                                disabled={!linksPaginacaoBoletim || !linksPaginacaoBoletim.paginaAnterior}>
                                Anterior
                            </button>
                        </li>
                        <li className="page-item">
                            {consultaBoletim &&
                                <span className='page-link fs-4 '>
                                {consultaBoletim.paginaAtual + 1}
                            </span>}
                        </li>
                        <li className="page-item ">
                            <button
                                className={`page-link fs-4 ${!linksPaginacaoBoletim || !linksPaginacaoBoletim.proximaPagina ? 'd-none' : ''}`}
                                disabled={!linksPaginacaoBoletim || !linksPaginacaoBoletim.proximaPagina}
                                onClick={carregarProximaPagina}>
                                Próximo
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}