import "./StyleListaBoletins.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ConsultaBoletim } from "../../../Data/ApiTypes/TypeConsultaBoletim.ts";

    export default function ListaBoletins() {
        const [consultaBoletim, setConsultaBoletim] = useState<ConsultaBoletim | null>(null);
        const [paginaAtual, setPaginaAtual] = useState<number>(0);
        const tamanhoPagina = 12;

        useEffect(() => {
            const buscarBoletins = async () => {
                try {
                    const response = await axios.get(`http://localhost/boletins?page=${paginaAtual}&sort=dataPublicacao,desc&size=${tamanhoPagina}`);
                    setConsultaBoletim(response.data);
                } catch (error) {
                    console.error('Erro ao buscar boletins:', error);
                }
            };
            buscarBoletins();
        }, [paginaAtual]);
        const carregarProximaPagina = () => {
            if (consultaBoletim && consultaBoletim._links && consultaBoletim._links.proximaPagina) {
                setPaginaAtual(consultaBoletim.paginaAtual + 1);
            } else {
                console.error('linksPaginacaoBoletim.paginaAtual está vazio ou indefinido.');
            }
        };
        const carregarPaginaAnterior = () => {
            if (consultaBoletim && consultaBoletim._links && consultaBoletim._links.paginaAnterior) {
                setPaginaAtual(consultaBoletim.paginaAtual - 1);
            } else {
                console.error('linksPaginacaoBoletim.paginaAnterior está vazio ou indefinido.');
            }
        };

        const carregarPrimeiraPagina = () => {
            if (consultaBoletim && consultaBoletim.paginaAtual !== 0) {
                setPaginaAtual(0);
            }
        };

        const carregarUltimaPagina = () => {
            if (consultaBoletim && consultaBoletim.paginaAtual < consultaBoletim.totalPaginas - 2) {
                setPaginaAtual(consultaBoletim.totalPaginas - 1);
            }
        };

        return (
            <div>
                {consultaBoletim && (
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
                                {consultaBoletim.dados.map((Boletim) => (
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
                                                {new Date(Boletim.dataPublicacao).toLocaleDateString()}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between">
                                <div className="paginationButtons">
                                    <ul className="pagination">
                                        <li className="page-item d-flex align-items-stretch">
                                            <button
                                                className={`page-link fs-4 ${!consultaBoletim._links || !consultaBoletim._links.paginaAnterior ? 'd-none' : ''}`}
                                                onClick={carregarPrimeiraPagina}
                                                disabled={!consultaBoletim._links || !consultaBoletim._links.paginaAnterior}>
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
                                                onClick={carregarUltimaPagina}
                                                disabled={!consultaBoletim._links || consultaBoletim.paginaAtual >= consultaBoletim.totalPaginas - 2}>
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
                        </div>
                    </div>
                )}
            </div>
        );
    }