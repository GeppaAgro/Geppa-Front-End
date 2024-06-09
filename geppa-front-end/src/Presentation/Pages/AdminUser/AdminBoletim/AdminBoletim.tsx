import {useEffect, useState} from "react";
import {Col, Table} from "react-bootstrap";
import {Boletim} from "../../../../Data/ApiTypes/TypeBoletim.ts";
import cores from "../../../Components/Utils/Cores.tsx";
import Paginacao from "../../../Components/Paginacao/Paginacao.tsx";
import {Section} from "@react-email/components";
import DeleteBoletim from "../../../Components/AdminUser/ListaBoletins/DeleteBoletim/DeleteBoletim.tsx";
import {TypeFiltro} from "../../../../Data/ApiTypes/TypeFiltro.ts";
import {Filtros} from "../../../Components/Filters/FiltrosListagem/Filtros.tsx";
import AxiosClient from "../../../../Domain/Services/AxiosClient.ts";
import EditButton from "../../../Components/AdminUser/ListaBoletins/EditButton/EditButton.tsx";
import {LinhaSkeleton} from "../../../Components/Skeleton/LinhaSkeleton.tsx";


export default function AdminListaBoletins() {
    const [loadingBoletim, setLoadingBoletim] = useState<boolean>(true);
    const [boletins, setBoletins] = useState<Boletim[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filtroType, setFiltroType] = useState<TypeFiltro | null>(null);

    useEffect(() => {
        setLoadingBoletim(true)
        fetchBoletins();
    }, [filtroType, currentPage]);

    const fetchBoletins = async () => {
        try {
            console.log()
            const response = await AxiosClient(`/boletins?page=${currentPage}&size=8`
                +
                (filtroType ?
                    `&dataMinima=${filtroType.dataMinima}` +
                    `&dataMaxima=${filtroType.dataMaxima}` : ''));
            setTotalPages(response.data.totalPaginas);
            setCurrentPage(response.data.paginaAtual || 0);
            setBoletins(response.data.dados)
            setLoadingBoletim(false)

        } catch (error) {
            console.error("Erro ao buscar boletins:", error);
            setLoadingBoletim(false)

        }
    };

    const handleFilterSubmit = (dataMinima: string, dataMaxima: string) => {

        setFiltroType({dataMinima, dataMaxima})
        setCurrentPage(0);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Section className={"p-0"}>
                <h1 className={"text-center p-3 mt-4"} style={{color: cores.marromEscuro}}>Gerenciamento de
                    Boletins</h1>
                <div className="d-flex justify-content-center">
                    <div className="col-2 me-5">
                        <Filtros onDataSubmit={handleFilterSubmit}/>
                    </div>
                    <Col md={8} className={"p-0"}>
                        <Table striped hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Edição</th>
                                <th>Data Publicação</th>
                                <th className="text-center">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loadingBoletim ? (
                                <>
                                    {Array.from({length: 8}).map((_, index) => (
                                        <tr key={index} className="linha-tabela-boletim fs-4">
                                            <td>
                                                <LinhaSkeleton/>
                                            </td>
                                            <td>
                                                <LinhaSkeleton/>
                                            </td>
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
                                boletins.length > 0 ? (
                                        boletins.map((boletim, index) => (
                                            <tr key={boletim.id}>
                                                <td className={"align-middle"}>{index + 1}</td>
                                                <td className={"align-middle"}>{boletim.edicao}</td>
                                                <td className={"align-middle ps-3"}>
                                                    {new Date(boletim.dataPublicacao).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                                                </td>

                                                <td className="text-center align-middle">
                                                    <EditButton edicao={boletim.edicao} />
                                                    <DeleteBoletim boletim={boletim} fetchBoletins={fetchBoletins}/>
                                                </td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan={3} className="text-center">Nenhuma tag encontrada.</td>
                                        </tr>
                                    )
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </div>
                <Paginacao
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Section>
        </>
    );
}