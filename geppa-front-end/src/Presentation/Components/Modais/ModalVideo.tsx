import {useEffect, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import {Video} from "../../../Domain/TypesConteudos/Conteudos/TypeVideo.ts";
import {Tag} from "../../../Domain/TypesConteudos/TypeTag.ts";
import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";

const ModalArtigo: React.FC<ModalConteudoProps> = ({ abrir, fechar, mostrar, salvar, video }) => {
    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [youtube, setYoutube] = useState<boolean>(false)
    const [novaTag, setNovaTag] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);


    useEffect(() => {
        if (video) {
            setTitulo(video.titulo)
            setDescricao(video.descricao)
            setLink(video.link)
            setTags(video.tags || []);
        }
    }, [video]);

    const salvarVideo = () => {
        const dados: Video = {
            id: '',
            boletimInformativoEdicao: '',
            titulo,
            descricao,
            link,
            dataCadastro: new Date(),
            dataAtualizacao: new Date(),
            tags,
            youtube }
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
        setYoutube(false)
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


    return (
        <>
            <Button variant="primary" onClick={mostrar}>
                Adicionar Video
            </Button>

            <Modal show={abrir} onHide={cancelar} backdrop="static">
                <Modal.Header>
                    <Modal.Title>{video ? 'Editar Video' : 'Adicionar Video'}</Modal.Title>
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
                        <div className="d-flex justify-content-between">
                            <label htmlFor="youtube">Este vídeo é do YouTube? </label>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="youtube"
                                checked={youtube}
                                onChange={(e) => setYoutube(e.target.checked)}
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
                    <Button variant="primary" onClick={salvarVideo}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalArtigo