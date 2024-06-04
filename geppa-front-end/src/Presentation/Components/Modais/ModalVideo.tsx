import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Video} from "../../../Domain/TypesConteudos/Conteudos/Video.ts";
import {Tag} from "../../../Domain/TypesConteudos/TypeTag.ts";
import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";
import {ValidarConteudoService} from "../../../Domain/Services/ValidarConteudoService.ts";
import {TipoConteudo} from "../../../Domain/Enums/TipoConteudo.ts";
import {mapperMensagensValidacaoConteudo} from "../../../Domain/mappers/MapperMensagensValidacao.ts";
import LoadingOverlay from "../Utils/LoadingOverlay/LoadingOverlay.tsx";
import CampoTextoSimplesModal from "./ComponentesModal/CampoTextoSimplesModal.tsx";
import CampoTextAreaModal from "./ComponentesModal/CampoTextAreaModal.tsx";
import BuscadorDeTag from "./ComponentesModal/BuscadorDeTag.tsx";
import ListagemTagsModal from "./ComponentesModal/ListagemTagsModal.tsx";
import AxiosClient from "../../../Domain/Services/AxiosClient.ts";

const ModalArtigo: React.FC<ModalConteudoProps> = ({abrir, fechar, salvar, video}) => {
    const [id, setId] = useState<string | null>('')

    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [youtube, setYoutube] = useState<boolean>(false)
    const [tags, setTags] = useState<Tag[]>([]);
    const [errosValidacao, setErrosValidacao] = useState<{ [key: string]: string }>()
    const [tentouSalvar, setTentouSalvar] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (video) {
            setId(video.id)
            setTitulo(video.titulo)
            setDescricao(video.descricao)
            setLink(video.link)
            setTags(video.tags || []);
            setYoutube(video.youtube)
        }
    }, [video]);

    const salvarVideo = async () => {
        setIsLoading(true);
        const video: Video = new Video(titulo, descricao, link, tags, youtube)
        const isValid = await validar(video);
        setTentouSalvar(true);
        if (isValid) {
            if (id) {
                await atualizar(video)
                fechar();
                limpar();
            } else {
                salvar(video);
                fechar();
                limpar();
            }
        }
        setIsLoading(false);
    };


    const validar = async (video: Video): Promise<boolean> => {
        const result = await ValidarConteudoService.validarConteudo(video, TipoConteudo.VIDEO);
        if (result.success) {
            return true
        }
        const errosValidacao = mapperMensagensValidacaoConteudo(result.errors, TipoConteudo.VIDEO)
        setErrosValidacao(errosValidacao)
        return false
    };
    const atualizar = async (vid: Video)=> {
        await AxiosClient.put(`/videos/${id}`, vid)
    }

    const cancelar = () => {
        fechar()
        limpar()
    }

    const limpar = () => {
        setTitulo('')
        setDescricao('')
        setLink('')
        setYoutube(false)
        setTags([])
    }
    const adicionarTag = (novaTagObj: Tag) => {
        if (!tags.find(tag => tag.id === novaTagObj.id)) {
            setTags([...tags, novaTagObj]);
        }
    };

    const removerTag = (id: string) => {
        const novasTags = tags.filter(tag => tag.id !== id);
        setTags(novasTags);
    };

    return (
        <>
            {isLoading && <LoadingOverlay/>}
            <Modal show={abrir} onHide={cancelar} backdrop="static">
                <Modal.Header>
                    <Modal.Title>{video ? 'Editar Video' : 'Adicionar Video'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <CampoTextoSimplesModal id="Titulo"
                                                label="Titulo do Video"
                                                texto={titulo}
                                                salvarTexto={setTitulo}
                                                erro={errosValidacao?.titulo}
                                                tentouSalvar={tentouSalvar}/>
                        <CampoTextAreaModal id="Descricao" label="Descreva brevemente o assunto do video"
                                            texto={descricao}
                                            salvarTexto={setDescricao}
                                            erro={errosValidacao?.descricao}
                                            tentouSalvar={tentouSalvar}/>
                        <CampoTextoSimplesModal id="Link" label="Cole aqui o link do video"
                                                texto={link}
                                                salvarTexto={setLink}
                                                erro={errosValidacao?.link}
                                                tentouSalvar={tentouSalvar}/>

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
                        <BuscadorDeTag label="Selecione suas tags"
                                       salvarTag={adicionarTag}
                                       erro={errosValidacao?.tags}
                                       tentouSalvar={tentouSalvar}/>

                        <ListagemTagsModal tags={tags} removerTag={removerTag}/>
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