import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";
import BuscadorDeTag from "./ComponentesModal/BuscadorDeTag.tsx";
import CampoTextoSimplesModal from "./ComponentesModal/CampoTextoSimplesModal.tsx";
import CampoDataModal from "./ComponentesModal/CampoDataModal.tsx";
import CampoTextAreaModal from "./ComponentesModal/CampoTextAreaModal.tsx";
import ListagemTagsModal from "./ComponentesModal/ListagemTagsModal.tsx";
import {Noticia} from "../../../Domain/TypesConteudos/Conteudos/Noticia.ts";
import {Tag} from "../../../Domain/TypesConteudos/TypeTag.ts";
import {ValidarConteudoService} from "../../../Domain/Services/ValidarConteudoService.ts";
import {TipoConteudo} from "../../../Domain/Enums/TipoConteudo.ts";
import {mapperMensagensValidacaoConteudo} from "../../../Domain/mappers/MapperMensagensValidacao.ts";
import LoadingOverlay from "../Utils/LoadingOverlay/LoadingOverlay.tsx";


const ModalNoticia: React.FC<ModalConteudoProps> = ({abrir, fechar, mostrar, salvar, noticia}) => {
    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [dataPublicacao, setDataPublicacao] = useState<Date | null>(null)
    const [tags, setTags] = useState<Tag[]>([]);
    const [errosValidacao, setErrosValidacao] = useState<{ [key: string]: string }>()
    const [tentouSalvar, setTentouSalvar] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        if (noticia) {
            setTitulo(noticia.titulo)
            setDescricao(noticia.descricao)
            setLink(noticia.link)
            setDataPublicacao(noticia.dataPublicacao)
            setTags(noticia.tags || []);
        }
    }, [noticia]);

    const handleNoticia = async () => {
        setIsLoading(true);
        const noticia: Noticia = new Noticia(titulo, descricao, link, tags, dataPublicacao)
        const isValid = await validar(noticia);
        setTentouSalvar(true);

        if (isValid) {
            salvar(noticia);
            fechar();
            limpar();
        }
        setIsLoading(false);
    };

    const validar = async (noticia: Noticia): Promise<boolean> => {
        const result = await ValidarConteudoService.validarConteudo(noticia, TipoConteudo.NOTICIA);
        if (result.success) {
            return true
        }
        const errosValidacao = mapperMensagensValidacaoConteudo(result.errors, TipoConteudo.NOTICIA)
        setErrosValidacao(errosValidacao)
        return false
    };

    const cancelar = () => {
        fechar()
        limpar()
    }

    const limpar = () => {
        setTitulo('')
        setDescricao('')
        setLink('')
        setDataPublicacao(null)
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
            {isLoading && <LoadingOverlay />}
            <Button variant="primary" onClick={mostrar}>
                Adicionar Noticia
            </Button>

            <Modal show={abrir} onHide={cancelar} backdrop="static">
                <Modal.Header>
                    <Modal.Title>{noticia ? 'Editar noticia' : 'Adicionar noticia'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <CampoTextoSimplesModal id="Titulo" label="Titulo"
                                                texto={titulo}
                                                salvarTexto={setTitulo}
                                                erro={errosValidacao?.titulo}
                                                tentouSalvar={tentouSalvar}/>


                        <CampoTextAreaModal id="Descricao" label="Descreva brevemente a noticia"
                                            texto={descricao}
                                            salvarTexto={setDescricao}
                                            erro={errosValidacao?.descricao}
                                            tentouSalvar={tentouSalvar}/>

                        <CampoDataModal label="Quando a noticia foi lançada?"
                                        valor={dataPublicacao}
                                        salvarData={setDataPublicacao}
                                        erro={errosValidacao?.dataPublicacao}
                                        tentouSalvar={tentouSalvar}/>

                        <CampoTextoSimplesModal id="Link" label="Cole aqui o link para a noticia"
                                                texto={link}
                                                salvarTexto={setLink}
                                                erro={errosValidacao?.link}
                                                tentouSalvar={tentouSalvar}/>


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
                    <Button variant="primary" onClick={handleNoticia}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalNoticia