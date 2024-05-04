import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";
import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Tag} from "../../../Domain/TypesConteudos/TypeTag.ts";
import {Artigo} from "../../../Domain/TypesConteudos/Conteudos/TypeArtigo.ts";
import {Autor} from "../../../Domain/TypesConteudos/TypeAutor.ts";
import ListagemTagsModal from "./ComponentesModal/ListagemTagsModal.tsx";
import BuscadorDeTag from "./ComponentesModal/BuscadorDeTag.tsx";
import CampoDataModal from "./ComponentesModal/CampoDataModal.tsx";
import CampoTextoSimplesModal from "./ComponentesModal/CampoTextoSimplesModal.tsx";
import CampoTextAreaModal from "./ComponentesModal/CampoTextAreaModal.tsx";
import AdicaoDeStringAoArrayModal from "./ComponentesModal/AdicaoDeStringAoArrayModal.tsx";
import ListagemDeAutores from "./ComponentesModal/ListagemDeAutores.tsx";
const ModalArtigo: React.FC<ModalConteudoProps> = ({abrir, fechar, mostrar, salvar, artigo}) =>{

    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [dataPublicacao, setDataPublicacao] = useState<Date|null>(null)
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

    const adicionarTag = (novaTagObj: Tag) => {
        if (!tags.find(tag => tag.id === novaTagObj.id)){
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
            <Button variant="primary" onClick={mostrar}>
                Adicionar Artigo
            </Button>

            <Modal show={abrir} onHide={cancelar} backdrop="static">
                 <Modal.Header>
                     <Modal.Title>{artigo ? 'Editar artigo' : 'Adicionar Artigo'}</Modal.Title>
                 </Modal.Header>
                <Modal.Body>
                    <form>
                        <CampoTextoSimplesModal id="Titulo" label="Titulo do artigo" texto={titulo} salvarTexto={setTitulo}/>
                        <CampoTextAreaModal id="Descricao" label="Descreva brevemente o assunto do artigo" texto={descricao} salvarTexto={setDescricao}/>
                        <CampoTextoSimplesModal id="Link" label="Cole aqui o link para o artigo" texto={link} salvarTexto={setLink}/>
                        <CampoDataModal label="Quando o artigo foi lançado?" valor={dataPublicacao} salvarData={setDataPublicacao}/>
                        <BuscadorDeTag label="Selecione suas tags" salvarTag={adicionarTag}/>
                        <ListagemTagsModal tags={tags} removerTag={removerTag} />
                        <hr className="mx-5"/>
                        <AdicaoDeStringAoArrayModal label="Autores" novaString={novoAutor} setNovaString={setNovoAutor} adicionarString={adicionarAutor} />
                        <ListagemDeAutores autores={autores} removerAutor={removerAutor}/>
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
