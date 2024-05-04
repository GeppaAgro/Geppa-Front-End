import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Noticia, Tag} from "../../../Domain/TypesConteudos/TypesConteudos.ts";
import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";
import {ValidarConteudoService} from "../../../Domain/Services/ValidarConteudoService.ts";
import {TipoConteudo} from "../../../Domain/Enums/TipoConteudo.ts";

const ModalNoticia: React.FC<ModalConteudoProps> = ({abrir, fechar, mostrar, salvar, noticia}) => {
    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [dataPublicacao, setDataPublicacao] = useState<Date | null>(null)
    const [novaTag, setNovaTag] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [camposInvalidos, setCamposInvalidos] = useState<string[]>([])

    useEffect(() => {
        if (noticia) {
            setTitulo(noticia.titulo)
            setDescricao(noticia.descricao)
            setLink(noticia.link)
            setDataPublicacao(new Date(noticia.dataPublicacao))
            setTags(noticia.tags || []);
        }
    }, [noticia]);
    const salvarNoticia = () => {
        const dados: Noticia = {
            id: '',
            boletimInformativoEdicao: '',
            titulo,
            descricao,
            link,
            dataCadastro: '',
            dataAtualizacao: new Date,
            dataPublicacao: dataPublicacao || new Date,
            tags,
        }
        salvar(dados);
        fechar()
        limpar()
    };

    const validarNoticia = async () => {
        const dados: Noticia = {
            id: '',
            boletimInformativoEdicao: '',
            titulo,
            descricao,
            link,
            dataCadastro: '',
            dataAtualizacao: new Date,
            dataPublicacao: dataPublicacao || new Date,
            tags,
        }
        console.log(dados);

        try {
            const resp = await axiosClient.post('/noticias/validar', dados)
            salvar(dados)
        }catch (error) {
            console.error('Erro ao validar a notícia:', error);
        }
    };


    const cancelar = () => {
        fechar()
        limpar()
    }

    const limpar =() =>{
        setTitulo('')
        setDescricao('')
        setLink('')
        setDataPublicacao(null)
        setNovaTag('')
        setTags([])
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

    const mudarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateRegex.test(dateString)) {
            setDataPublicacao(new Date(dateString));
        } else {
            setDataPublicacao(null);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={mostrar}>
                Adicionar Noticia
            </Button>

            <Modal show={abrir} onHide={cancelar} backdrop="static">
                <Modal.Header>
                    <Modal.Title>{noticia ? 'Editar noticia' : 'Adicionar noticia'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label htmlFor="titulo">Titulo da Noticia *</label>
                        <input type="text" className="form-control" id="titulo" value={titulo}
                               onChange={(e) => setTitulo(e.target.value)}/>
                        <label htmlFor="descricao">Descreva brevemente a noticia *</label>
                        <textarea className="form-control" id="descricao" value={descricao}
                                  onChange={(e) => setDescricao(e.target.value)}/>

                        <label htmlFor="link">Cole aqui o link para a noticia *</label>
                        <input type="text" className="form-control" id="link" value={link}
                               onChange={(e) => setLink(e.target.value)}/>

                        <div>
                            <label htmlFor="dataCadastro">Quando a noticia foi lançada? *</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataPublicacao"
                                value={dataPublicacao ? dataPublicacao.toISOString().substr(0, 10) : ''}
                                onChange={mudarData}
                            />
                        </div>

                        <div>
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
                    <Button variant="primary" onClick={salvarNoticia}>
                        Salvar
                    </Button>
                    <Button variant="danger" onClick={validarNoticia}>
                        Validar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalNoticia