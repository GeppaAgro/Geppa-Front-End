import "./StyleListaBoletins.css"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ConsultaBoletim} from "../../../Data/ApiTypes/TypeConsultaBoletim.ts";
import {TypeFiltro} from "../../../Data/ApiTypes/TypeFiltro.ts";
import {Filtros} from "../Filters/FiltrosListagem/Filtros.tsx";
import AxiosClient from "../../../Data/Services/AxiosClient.ts";
import {LinhaSkeleton} from "../Skeleton/LinhaSkeleton.tsx";

export default function ListaBoletins() {
    const [consultaBoletim, setConsultaBoletim] = useState<ConsultaBoletim | null>(null);
    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [filtroType, setFiltroType] = useState<TypeFiltro | null>(null);
    const [loadingBoletim, setLoadingBoletim] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState('');

    const tamanhoPagina = 12;

    useEffect(() => {


        const buscarBoletins = async () => {
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
            } catch (error) {
                setErrorMessage("Ocorreu um erro ao buscar boletins. Por favor, tente novamente mais tarde.")
                setLoadingBoletim(false);
            }
        };

        buscarBoletins();
    }, [filtroType, paginaAtual]);

    const carregarProximaPagina = () => {
        if (consultaBoletim && consultaBoletim._links && consultaBoletim._links.proximaPagina) {
            setLoadingBoletim(true)
            setPaginaAtual(consultaBoletim.paginaAtual + 1);
        } else {
            console.error('linksPaginacaoBoletim.paginaAtual está vazio ou indefinido.');
        }
    };
    const carregarPaginaAnterior = () => {
        if (consultaBoletim && consultaBoletim._links && consultaBoletim._links.paginaAnterior) {
            setLoadingBoletim(true)
            setPaginaAtual(consultaBoletim.paginaAtual - 1);
        } else {
            console.error('linksPaginacaoBoletim.paginaAnterior está vazio ou indefinido.');
        }
    };

    const carregarPrimeiraPagina = () => {
        if (consultaBoletim && consultaBoletim.paginaAtual > 0) {
            setLoadingBoletim(true)
            setPaginaAtual(0);
        }
    };

    const carregarUltimaPagina = () => {
        console.log("teste")
        if (consultaBoletim) {
            setLoadingBoletim(true)
            console.log(consultaBoletim.totalPaginas - 1)
            setPaginaAtual(consultaBoletim.totalPaginas - 1);
        }
    };

    const handleFilterSubmit = (dataMinima: string, dataMaxima: string) => {
        setErrorMessage('');
        setLoadingBoletim(true)
        setFiltroType({dataMinima, dataMaxima})
        setPaginaAtual(0);
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
                                <div className="d-flex justify-content-between">
                                    <div className="paginationButtons">
                                        <ul className="pagination">
                                            <li className="page-item d-flex align-items-stretch">
                                                <button
                                                    className={`page-link fs-4 ${!consultaBoletim._links || !consultaBoletim._links.paginaAnterior ? 'd-none' : ''}`}
                                                    onClick={carregarPrimeiraPagina}>
                                                    <i className="ri-skip-left-line"></i>
                                                </button>
                                            </li>
                                            <li className="page-item d-flex align-items-stretch">
                                                <button
                                                    className={`page-link fs-4 ${!consultaBoletim._links || !consultaBoletim._links.paginaAnterior ? 'd-none' : ''}`}
                                                    onClick={carregarPaginaAnterior}
                                                    disabled={!consultaBoletim._links || !consultaBoletim._links.paginaAnterior}>
                                                    {consultaBoletim.paginaAtual}
                                                </button>
                                            </li>
                                            <li className="page-item d-flex align-items-stretch disabled">
                                            <span className='page-link fs-4'>
                                                {consultaBoletim.paginaAtual + 1}
                                            </span>
                                            </li>
                                            <li className="page-item d-flex align-items-stretch">
                                                <button
                                                    className={`page-link fs-4 ${!consultaBoletim._links || !consultaBoletim._links.proximaPagina ? 'd-none' : ''}`}
                                                    disabled={!consultaBoletim._links || !consultaBoletim._links.proximaPagina}
                                                    onClick={carregarProximaPagina}>
                                                    {consultaBoletim.paginaAtual + 2}
                                                </button>
                                            </li>
                                            <li className="page-item d-flex align-items-stretch">
                                                <button
                                                    className={`page-link fs-4 ${!consultaBoletim._links || !consultaBoletim._links.proximaPagina ? 'd-none' : ''}`}
                                                    onClick={carregarUltimaPagina}>
                                                    <i className="ri-skip-right-line"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="indicePaginacao ms-3 ">
                                <span className="fs-5">
                                    Página {consultaBoletim.paginaAtual + 1} de {consultaBoletim.totalPaginas}
                                </span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}