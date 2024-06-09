import "./StyleListaBoletins.css"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ConsultaBoletim} from "../../../Data/ApiTypes/TypeConsultaBoletim.ts";
import {TypeFiltro} from "../../../Data/ApiTypes/TypeFiltro.ts";
import {Filtros} from "../Filters/FiltrosListagem/Filtros.tsx";
import AxiosClient from "../../../Domain/Services/AxiosClient.ts";
import {LinhaSkeleton} from "../Skeleton/LinhaSkeleton.tsx";
import Paginacao from "../Paginacao/Paginacao.tsx";

export default function ListaBoletins() {
    const [consultaBoletim, setConsultaBoletim] = useState<ConsultaBoletim | null>(null);
    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [filtroType, setFiltroType] = useState<TypeFiltro | null>(null);
    const [loadingBoletim, setLoadingBoletim] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    const tamanhoPagina = 12;

    useEffect(() => {


        const buscarBoletins = async () => {
            setLoadingBoletim(true)
            try {
                const response = await AxiosClient.get(
                    `/boletins?page=${paginaAtual}` +
                        `&sort=dataPublicacao,desc` +
                        `&size=${tamanhoPagina}` +
                    (filtroType ?
                        `&dataMinima=${filtroType.dataMinima}` +
                        `&dataMaxima=${filtroType.dataMaxima}` : '')
                    , {
                        validateStatus: function (status) {
                            return status === 404 || status >= 200
                        }
                    }
                );
                if (response.data.status == 404) {
                    setErrorMessage("Nenhum boletim encontrado para os critérios de busca.");
                    return
                }
                setConsultaBoletim(response.data);
                setLoadingBoletim(false)
                console.log(response)
                setTotalPages(response.data.totalPaginas);
            } catch (error) {
                setErrorMessage("Ocorreu um erro ao buscar boletins. Por favor, tente novamente mais tarde.")
                setLoadingBoletim(false);
            }
        };

        buscarBoletins();

    }, [filtroType, paginaAtual]);


    const handleFilterSubmit = (dataMinima: string, dataMaxima: string) => {
        setErrorMessage('');
        setLoadingBoletim(true)
        setFiltroType({dataMinima, dataMaxima})
        setPaginaAtual(0);
    };

    const handlePageChange = (page: number) => {
        setPaginaAtual(page);
    };

    return (
        <div className="row">
            <div className="col-lg-3 pe-lg-0">
                <Filtros onDataSubmit={handleFilterSubmit}/>
            </div>

            <div className="col-lg-9">
                <div className="d-flex flex-row align-items-center justify-content-between gap-5">
                    <h3 className="fw-bold">Boletins</h3>
                </div>
                <div className="container-lista-boletins px-5">
                    {errorMessage ? (
                        <>
                            <p className="fw-semibold">{errorMessage}</p>
                        </>
                    ) : (
                        <>
                            <table className="text-center table table-striped table-hover tabela-boletins">
                                <thead className="fs-4">
                                <tr>
                                    <th>Edição</th>
                                    <th>Lançamento</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    loadingBoletim ? (
                                        <>
                                            {Array.from({length: tamanhoPagina}).map((_, index) => (
                                                <tr key={index} className="linha-tabela-boletim fs-4">
                                                    <td>
                                                        <LinhaSkeleton/>
                                                    </td>
                                                    <td>
                                                        <LinhaSkeleton/>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {consultaBoletim && consultaBoletim.dados.map((Boletim) => (
                                                <tr key={Boletim.id} className="linha-tabela-boletim fs-4">
                                                    <td>
                                                        <Link
                                                            to={`/boletim/${Boletim.edicao}`}
                                                            className="table-row-link">
                                                            {Boletim.edicao}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/boletim/${Boletim.edicao}`}
                                                            className="table-row-link">
                                                            {new Date(Boletim.dataPublicacao).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )
                                }
                                </tbody>
                            </table>
                            {consultaBoletim && (
                                <Paginacao currentPage={paginaAtual} totalPages={totalPages} onPageChange={handlePageChange}/>
                            )}
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}