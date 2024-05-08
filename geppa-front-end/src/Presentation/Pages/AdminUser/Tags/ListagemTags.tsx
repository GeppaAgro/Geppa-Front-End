import React, {useState, useEffect, useRef} from 'react';
import {Button, Form, Table, InputGroup, Col} from 'react-bootstrap';
import {Section} from "@react-email/components";
import cores from "../../../Components/Utils/Cores.tsx";
import CadastroTag from "../../../Components/Tags/CadastroTag/CadastroTag.tsx";
import {Tag} from "../../../../Domain/TypesConteudos/TypeTag.ts";
import AxiosClient from "../../../../Data/Services/AxiosClient.ts";
import Paginacao from "../../../Components/Paginacao/Paginacao.tsx";
import DeleteTag from "../../../Components/Tags/DeleteTag/DeleteTag.tsx";

const ListagemTags: React.FC = () => {
    const filterInputRef = useRef<HTMLInputElement>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [filter, setFilter] = useState('');
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchTags();
    }, [currentPage, filter]);

    const fetchTags = async () => {
        let response;
        try {
            if (filter) {
                response = await AxiosClient(`/tags/${filter}`);
                setTotalPages(1);
                setCurrentPage(0);
            } else {
                response = await AxiosClient(`/tags?page=${currentPage}&size=8`);
                setTotalPages(response.data.totalPaginas);
                setCurrentPage(response.data.paginaAtual || 0);
            }
            setTags(response.data.dados);
        } catch (error) {
            setTags([]);
            setTotalPages(1);
            setCurrentPage(0);
        }
    };

    const clearFilter = () => {
        setFilter('');
        if (filterInputRef.current) {
            filterInputRef.current.value = '';
        }
    };

    const handleEdit = (tags: Tag) => {
        setSelectedTag(tags);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleSave = () => {
        console.log('Salvar categoria:', selectedTag);
    };

    return (
        <>
            <Section className={"p-0"}>
                <h1 className={"text-center p-3 mt-4"} style={{color: cores.marromEscuro}}>Gerenciamento de Tags</h1>
                <div className="d-flex justify-content-center">
                    <Col md={8} className={"p-0"}>
                        <InputGroup className="mb-3 px-5">
                            <Form.Control
                                placeholder="Encontre a tag por nome"
                                aria-label="Encontre a tag por nome"
                                aria-describedby="basic-addon2"
                                ref={filterInputRef}
                            />
                            <Button variant="outline-secondary" onClick={clearFilter}>
                                <i className="ri-filter-off-line"></i>
                            </Button>
                            <Button variant="outline-secondary" id="button-addon2" onClick={() => {
                                setFilter(filterInputRef.current?.value || '');
                            }}>
                                Buscar
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
                            {tags.length > 0 ? (
                                tags.map((tags, index) => (
                                    <tr key={tags.id}>
                                        <td className={"align-middle"}>{index + 1}</td>
                                        <td className={"align-middle"}>{tags.nome}</td>
                                        <td className="text-center align-middle">
                                            <Button variant=""
                                                    className={'fw-medium text-primary-emphasis'}

                                                    onClick={() => handleEdit(tags)}>
                                                Editar
                                                <i className=" fw- ps-1 ri-pencil-fill"></i>
                                            </Button>
                                            <span className={'px-1'}/>
                                            <DeleteTag tag={tags} fetchTags={fetchTags}/>
                                        </td>
                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan={3} className="text-center">Nenhuma tag encontrada.</td>
                                </tr>
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
};

export default ListagemTags;
