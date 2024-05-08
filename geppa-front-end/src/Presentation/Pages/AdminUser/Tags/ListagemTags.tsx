import React, {useState, useEffect} from 'react';
import {Button, Form, Table, InputGroup, Col} from 'react-bootstrap';
import {Section} from "@react-email/components";
import cores from "../../../Components/Utils/Cores.tsx";
import CadastroTag from "../../../Components/Tags/CadastroTag/CadastroTag.tsx";
import {Tag} from "../../../../Domain/TypesConteudos/TypeTag.ts";
import AxiosClient from "../../../../Data/Services/AxiosClient.ts";
import Paginacao from "../../../Components/Paginacao/Paginacao.tsx";

const ListagemTags: React.FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [filter, setFilter] = useState('');
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await AxiosClient(`/tags?page=${currentPage}&size=8`)
            setTags(response.data.dados);
            setTotalPages(response.data.totalPaginas);
            setCurrentPage(response.data.paginaAtual);
        };

        fetchTags();
    }, [currentPage]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const filteredTags = tags.filter(tags =>
        tags.nome.toLowerCase().includes(filter.toLowerCase())
    );

    const handleEdit = (tags: Tag) => {
        setSelectedTag(tags);

    };

    const handleDelete = (tags: Tag) => {
        console.log('Excluir categoria:', tags.id);
    };

    const handleCloseModal = () => {
        setSelectedTag(null);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleSave = () => {
        console.log('Salvar categoria:', selectedTag);
        handleCloseModal();
    };

    return (
        <>
            <Section className={"p-0"}>
                <h1 className={"text-center p-3 mt-4"} style={{color: cores.marromEscuro}}>Gerenciamento de Tags</h1>
                <div className="d-flex justify-content-center">
                    <Col md={8} className={"p-0"}>
                        <InputGroup className="mb-3 px-5">
                            <Form.Control
                                placeholder="Buscar por nome"
                                aria-label="Buscar por nome"
                                aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                                Filtrar
                            </Button>
                        </InputGroup>

                        <CadastroTag buttonText={"Nova Tag"} iconClass={"ri-add-line"}/>

                        <Table striped hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th className="text-center">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredTags.map((tags, index) => (
                                <tr key={tags.id}>
                                    <td className={"align-middle"}>{index + 1}</td>
                                    <td className={"align-middle"}>{tags.nome}</td>
                                    <td className="text-center align-middle">
                                        <Button variant="primary" onClick={() => handleEdit(tags)}>
                                            Editar
                                            <i className=" fw- ps-1 ri-pencil-fill"></i>
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(tags)}>
                                            Excluir
                                            <i className="ps-1 ri-delete-bin-line"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
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
};

export default ListagemTags;
