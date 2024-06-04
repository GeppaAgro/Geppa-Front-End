import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";
import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Tag} from "../../../Domain/TypesConteudos/TypeTag.ts";
import {Autor} from "../../../Domain/TypesConteudos/TypeAutor.ts";
import ListagemTagsModal from "./ComponentesModal/ListagemTagsModal.tsx";
import BuscadorDeTag from "./ComponentesModal/BuscadorDeTag.tsx";
import CampoDataModal from "./ComponentesModal/CampoDataModal.tsx";
import CampoTextoSimplesModal from "./ComponentesModal/CampoTextoSimplesModal.tsx";
import CampoTextAreaModal from "./ComponentesModal/CampoTextAreaModal.tsx";
import AdicaoDeStringAoArrayModal from "./ComponentesModal/AdicaoDeStringAoArrayModal.tsx";
import ListagemDeAutores from "./ComponentesModal/ListagemDeAutores.tsx";
import {Artigo} from "../../../Domain/TypesConteudos/Conteudos/Artigo.ts";
import {ValidarConteudoService} from "../../../Domain/Services/ValidarConteudoService.ts";
import {TipoConteudo} from "../../../Domain/Enums/TipoConteudo.ts";
import {mapperMensagensValidacaoConteudo} from "../../../Domain/mappers/MapperMensagensValidacao.ts";
import LoadingOverlay from "../Utils/LoadingOverlay/LoadingOverlay.tsx";
import AxiosClient from "../../../Domain/Services/AxiosClient.ts";

const ModalArtigo: React.FC<ModalConteudoProps> = ({abrir, fechar, salvar, artigo}) => {
    const [id, setId] = useState<string | null>('')
    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [dataPublicacao, setDataPublicacao] = useState<Date | null>(null)
    const [tags, setTags] = useState<Tag[]>([]);
    const [novoAutor, setNovoAutor] = useState<string>('')
    const [autores, setAutores] = useState<Autor[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errosValidacao, setErrosValidacao] = useState<{ [key: string]: string }>()
    const [tentouSalvar, setTentouSalvar] = useState(false);


    useEffect(() => {
        if (artigo) {
            setId(artigo.id)
            setTitulo(artigo.titulo)
            setDescricao(artigo.descricao)
            setLink(artigo.link)
            setDataPublicacao(artigo.dataPublicacao)
            setTags(artigo.tags || [])
            setAutores(artigo.autores)
        }
    }, [artigo]);

    const handleArtigo = async () => {
        setIsLoading(true);
        const artigo: Artigo = new Artigo(titulo, descricao, link, autores, dataPublicacao, tags)

        const isValid = await validar(artigo);
        setTentouSalvar(true);

        if (isValid) {
            if (id) {
                await atualizar(artigo)
                fechar();
                limpar();
            } else {
                salvar(artigo);
                fechar();
                limpar();
            }
        }
        setIsLoading(false);
    };


        const atualizar = async (art: Artigo)=> {
            await AxiosClient.put(`/artigos/${id}`, art)
        }
    const validar = async (artigo: Artigo): Promise<boolean> => {
        const artigoParaValidar = {
            ...artigo,
            autores: artigo.autores.map(autor => ({nome: autor.nome}))
        };
        const result = await ValidarConteudoService.validarConteudo(artigoParaValidar, TipoConteudo.ARTIGO);


        if (result.success) {
            return true
        }
        const errosValidacao = mapperMensagensValidacaoConteudo(result.errors, TipoConteudo.ARTIGO)
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
        setAutores([])
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
            {isLoading && <LoadingOverlay/>}
            <Modal show={abrir} onHide={cancelar} backdrop="static">
                <Modal.Header>
                    <Modal.Title>{artigo ? 'Editar artigo' : 'Adicionar Artigo'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <CampoTextoSimplesModal id="Titulo" label="Titulo do artigo"
                                                texto={titulo}
                                                salvarTexto={setTitulo}
                                                erro={errosValidacao?.titulo}
                                                tentouSalvar={tentouSalvar}/>

                        <CampoTextAreaModal id="Descricao" label="Descreva brevemente o assunto do artigo"
                                            texto={descricao}
                                            salvarTexto={setDescricao}
                                            erro={errosValidacao?.descricao}
                                            tentouSalvar={tentouSalvar}/>

                        <CampoTextoSimplesModal id="Link" label="Cole aqui o link para o artigo"
                                                texto={link}
                                                salvarTexto={setLink}
                                                erro={errosValidacao?.link}
                                                tentouSalvar={tentouSalvar}/>

                        <CampoDataModal label="Quando o artigo foi lançado?"
                                        valor={dataPublicacao}
                                        salvarData={setDataPublicacao}
                                        erro={errosValidacao?.dataPublicacao}
                                        tentouSalvar={tentouSalvar}/>


                        <AdicaoDeStringAoArrayModal label="Autores" novaString={novoAutor}
                                                    setNovaString={setNovoAutor}
                                                    adicionarString={adicionarAutor}
                                                    erro={errosValidacao?.autores}
                                                    tentouSalvar={tentouSalvar}/>

                        <ListagemDeAutores autores={autores} removerAutor={removerAutor}
                                           errosValidacao={errosValidacao}/>

                        <hr/>

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
                    <Button variant="primary" onClick={handleArtigo}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalArtigo;
