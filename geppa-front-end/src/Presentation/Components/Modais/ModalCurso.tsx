import { useEffect, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import {Curso, Tag} from "../../../Domain/TypesConteudos/TypesConteudos.ts";
import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";

const ModalCurso: React.FC<ModalConteudoProps> = ({abrir, fechar, mostrar, salvar, curso}) => {
    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [prazoInscricao, setPrazoInscricao] = useState<Date|null>(null)
    const [link, setLink] = useState<string>('')
    const [preco, setPreco] = useState<number>(0)
    const [duracaoEmHoras, setDuracaoEmHoras] = useState<number>(0)
    const [novaTag, setNovaTag] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);

    const mudarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateRegex.test(dateString)) {
            setPrazoInscricao(new Date(dateString));
        } else {
            setPrazoInscricao(null);
        }
    };
    useEffect(() => {
        if (curso) {
            setTitulo(curso.titulo)
            setDescricao(curso.descricao)
            setLink(curso.link)
            setPreco(curso.preco)
            setPrazoInscricao(new Date(curso.prazoInscricao))
            setDuracaoEmHoras(curso.duracaoEmHoras)
            setTags(curso.tags || []);
        }
    }, [curso]);

    const salvarCurso = () => {
        const dados: Curso = {
            id: '',
            boletimInformativoEdicao: '',
            titulo,
            descricao,
            link,
            dataCadastro: '',
            dataAtualizacao: '',
            tags,
            prazoInscricao: prazoInscricao || new Date,
            preco,
            duracaoEmHoras }
        salvar(dados);
        fechar()
        limpar()
    };
    const cancelar = () => {
        fechar()
        limpar()
    }
    const limpar = () =>{
        setTitulo('')
        setDescricao('')
        setLink('')
        setPreco(0)
        setDuracaoEmHoras(0)
        setTags([])
        setNovaTag('')
    }

    const adicionarTag = () => {
        if (novaTag.trim() !== '') {
            const novaTagObj: Tag = {
                id: Math.random().toString(),
                nome: novaTag.trim(),
            };
            setTags([...tags, novaTagObj]);
            setNovaTag('');
        }
    };

    const removerTag = (id: string) => {
        const novasTags = tags.filter(tag => tag.id !== id);
        setTags(novasTags);
    };

    return(
        <>
            <Button variant="primary" onClick={mostrar}>
                Adicionar Curso
            </Button>

            <Modal show={abrir} onHide={cancelar} backdrop="static">
                <Modal.Header>
                    <Modal.Title>{curso ? 'Editar Curso' : 'Adicionar Curso'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label htmlFor="titulo">Nome do curso *</label>
                        <input type="text" className="form-control" id="titulo" value={titulo}
                               onChange={(e) => setTitulo(e.target.value)}/>
                        <label htmlFor="descricao">Descreva brevemente o objetivo do curso *</label>
                        <textarea className="form-control" id="descricao" value={descricao}
                                  onChange={(e) => setDescricao(e.target.value)}/>

                        <label htmlFor="link">Cole aqui o link para o curso *</label>
                        <input type="text" className="form-control" id="link" value={link}
                               onChange={(e) => setLink(e.target.value)}/>

                        <label htmlFor="prazoInscricao">Prazo para limite incricao *</label>
                        <input
                            type="date"
                            className="form-control"
                            id="prazoInscricao"
                            value={prazoInscricao ? prazoInscricao.toISOString().substr(0, 10) : ''}
                            onChange={(mudarData)}
                        />
                        <label htmlFor="preco">Preço do curso *</label>
                        <input
                            type="number"
                            className="form-control"
                            id="preco"
                            value={preco}
                            onChange={(e) => {
                                const value = e.target.value;
                                const correctedValue = value.replace(',', '.');
                                if (correctedValue.includes('.') && correctedValue.split('.')[1].length > 2) {
                                    const newValue = parseFloat(correctedValue).toFixed(2);
                                    setPreco(parseFloat(newValue));
                                } else {
                                    setPreco(parseFloat(correctedValue));
                                }
                            }}
                            step="0.01"
                            name="quantity"
                            min="0.01"
                        />

                        <div>
                            <label htmlFor="duracaoHoras">Quantas horas dura o curso?</label>
                            <input
                                type="number"
                                className="form-control"
                                id="duracaoHoras"
                                value={duracaoEmHoras}
                                onChange={(e) => setDuracaoEmHoras(parseInt(e.target.value))}
                                name="numeroInteiro"
                                min="0"
                            />
                        </div>

                        <input
                            type="text"
                            id="novaTag"
                            value={novaTag}
                            onChange={(e) => setNovaTag(e.target.value)}
                        />
                        <Button variant="primary" onClick={adicionarTag}>
                            Adicionar
                        </Button>

                        <div>
                            <h4>Tags:</h4>
                            {tags.map(tag => (
                                <div key={tag.id}>
                                    <span>{tag.nome}</span>
                                    <Button variant="danger" onClick={() => removerTag(tag.id)}>
                                        Remover
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelar}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={salvarCurso}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCurso