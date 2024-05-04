import { useEffect, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import { Noticia, Tag} from "../../../Domain/TypesConteudos/TypesConteudos.ts";
import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";
import axiosClient from "../../../Data/Services/AxiosClient.ts";
import BuscadorDeTag from "./ComponentesModal/BuscadorDeTag.tsx";
import CampoTextoSimplesModal from "./ComponentesModal/CampoTextoSimplesModal.tsx";
import CampoDataModal from "./ComponentesModal/CampoDataModal.tsx";
import CampoTextAreaModal from "./ComponentesModal/CampoTextAreaModal.tsx";
import ListagemTagsModal from "./ComponentesModal/ListagemTagsModal.tsx";

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
        const dadosValidacao = {
            titulo,
            descricao,
            link,
            dataPublicacao: dataPublicacao?.toISOString() || '',
            tags: tags.map(tag => tag.nome),
        };
        console.log(dadosValidacao);

        try {
            const resp = await axiosClient.post('/noticias/validar', dadosValidacao)
            console.log(resp)
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

    const adicionarTag = (novaTagObj: Tag) => {
        if (!tags.find(tag => tag.id === novaTagObj.id)){
            setTags([...tags, novaTagObj]);
        }
    };

    const removerTag = (id: string) => {
        const novasTags = tags.filter(tag => tag.id !== id);
        setTags(novasTags);
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
                        <CampoTextoSimplesModal id="Titulo" label="Titulo" texto={titulo} salvarTexto={setTitulo}/>
                        <CampoTextAreaModal id="Descricao" label="Descreva brevemente a noticia" texto={descricao} salvarTexto={setDescricao}/>
                        <CampoDataModal  label="Quando a noticia foi lançada?" valor={dataPublicacao} salvarData={setDataPublicacao} />
                        <CampoTextoSimplesModal id="Link" label="Cole aqui o link para a noticia" texto={link} salvarTexto={setLink}/>
                        <BuscadorDeTag label="Selecione suas tags" salvarTag={adicionarTag}/>
                        <ListagemTagsModal tags={tags} removerTag={removerTag} />
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