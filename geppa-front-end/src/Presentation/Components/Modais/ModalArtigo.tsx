import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";
import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Tag} from "../../../Domain/TypesConteudos/TypeTag.ts";
import {Artigo} from "../../../Domain/TypesConteudos/TypeArtigo.ts";
import {Autor} from "../../../Domain/TypesConteudos/TypeAutor.ts";
const ModalArtigo: React.FC<ModalConteudoProps> = ({abrir, fechar, mostrar, salvar, artigo}) =>{

    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [dataPublicacao, setDataPublicacao] = useState<Date|null>(null)
    const [novaTag, setNovaTag] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [novoAutor, setNovoAutor] = useState<string>('')
    const [autores, setAutores] = useState<Autor[]>([])

    const mudarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateRegex.test(dateString)) {
            setDataPublicacao(new Date(dateString));
        } else {
            setDataPublicacao(null);
        }
    };
    useEffect(() => {
        if (artigo){
            setTitulo(artigo.titulo)
            setDescricao(artigo.descricao)
            setLink(artigo.link)
            setDataPublicacao(new Date (artigo.dataPublicacao))
            setTags(artigo.tags||[])
            setAutores(artigo.autores)
        }
    }, [artigo]);

    const salvarArtigo = () => {
        const dados: Artigo = {
            id: '',
            boletimInformativoEdicao: '',
            titulo: titulo,
            descricao: descricao,
            link: link,
            dataCadastro: '',
            dataAtualizacao:'',
            tags: tags,
            dataPublicacao: dataPublicacao || new Date(),
            autores: autores
        }
        salvar(dados)
        fechar()
        limpar()
    }

    const cancelar = () => {
        fechar()
        limpar()
    }

    const limpar = () =>{
        setTitulo('')
        setDescricao('')
        setLink('')
        setDataPublicacao(null)
        setTags([])
        setAutores([])
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

    const adicionarAutor = () => {
        if (novoAutor.trim() !== '') {
            const novaAutorObj: Autor = {
                id: Math.random().toString(),
                nome: novoAutor.trim(),
            };
            setAutores([...autores, novaAutorObj]);
            setNovoAutor('');
        }
    };
    const removerAutor = (id: string) => {
        const novoAutor = autores.filter(autores => autores.id !== id);
        setAutores(novoAutor);
    };

    return (
        <>
            <Button variant="primary" onClick={mostrar}>
                Adicionar Artigo
            </Button>

            <Modal show={abrir} onHide={cancelar} backdrop="static">
                 <Modal.Header>
                     <Modal.Title>{artigo ? 'Editar artigo' : 'Adicionar Artigo'}</Modal.Title>
                 </Modal.Header>
                <Modal.Body>
                    <form>
                        <label htmlFor="titulo">Titulo do video *</label>
                        <input type="text" className="form-control" id="titulo" value={titulo}
                               onChange={(e) => setTitulo(e.target.value)}/>
                        <label htmlFor="descricao">Descreva brevemente o assunto do video *</label>
                        <textarea className="form-control" id="descricao" value={descricao}
                                  onChange={(e) => setDescricao(e.target.value)}/>

                        <label htmlFor="link">Cole aqui o link para o vídeo *</label>
                        <input type="text" className="form-control" id="link" value={link}
                               onChange={(e) => setLink(e.target.value)}/>
                        <label htmlFor="dataCadastro">Quando o artigo foi lançado? *</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dataCadastro"
                            value={dataPublicacao ? dataPublicacao.toISOString().substr(0, 10) : ''}
                            onChange={(mudarData)}
                        />
                        <div>
                            <h4>Tags:</h4>
                            <label htmlFor="novaTag"> Adicionar TAG</label>
                            <input
                                type="text"
                                id="novaTag"
                                value={novaTag}
                                onChange={(e) => setNovaTag(e.target.value)}
                            />
                            <Button variant="primary" onClick={adicionarTag}>
                                Adicionar
                            </Button>
                        </div>
                        <div>
                            {tags.map(tag => (
                                <div key={tag.id}>
                                    <span>{tag.nome}</span>
                                    <Button variant="danger" onClick={() => removerTag(tag.id)}>
                                        Remover
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h4>Autores :</h4>
                            <label htmlFor="novoAutor"> Adicionar autor</label>
                            <input
                                type="text"
                                id="novoAutor"
                                value={novoAutor}
                                onChange={(e) => setNovoAutor(e.target.value)}
                            />
                            <Button variant="primary" onClick={adicionarAutor}>
                                Adicionar
                            </Button>
                        </div>
                        <div>
                            {autores.map(autor => (
                                <div key={autor.id}>
                                    <span>{autor.nome}</span>
                                    <Button variant="danger" onClick={() => removerAutor(autor.id)}>
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
                    <Button variant="primary" onClick={salvarArtigo}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalArtigo;
