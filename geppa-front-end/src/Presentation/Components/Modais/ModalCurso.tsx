import { useEffect, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";
import CampoTextoSimplesModal from "./ComponentesModal/CampoTextoSimplesModal.tsx";
import {ValidarConteudoService} from "../../../Domain/Services/ValidarConteudoService.ts";
import {TipoConteudo} from "../../../Domain/Enums/TipoConteudo.ts";
import {mapperMensagensValidacaoConteudo} from "../../../Domain/mappers/MapperMensagensValidacao.ts";
import CampoDataModal from "./ComponentesModal/CampoDataModal.tsx";
import CampoTextAreaModal from "./ComponentesModal/CampoTextAreaModal.tsx";
import BuscadorDeTag from "./ComponentesModal/BuscadorDeTag.tsx";
import ListagemTagsModal from "./ComponentesModal/ListagemTagsModal.tsx";
import LoadingOverlay from "../Utils/LoadingOverlay/LoadingOverlay.tsx";
import {Curso} from "../../../Domain/TypesConteudos/Conteudos/Curso.ts";
import {Tag} from "../../../Domain/TypesConteudos/TypeTag.ts";
import CampoValorMonetarioModal from "./ComponentesModal/CampoValorMonetarioModal.tsx";
import CampoNumerico from "./ComponentesModal/CampoNumerico.tsx";

const ModalCurso: React.FC<ModalConteudoProps> = ({abrir, fechar, mostrar, salvar, curso}) => {
    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [prazoInscricao, setPrazoInscricao] = useState<Date|null>(null)
    const [link, setLink] = useState<string>('')
    const [preco, setPreco] = useState<number | null>(0)
    const [duracaoEmHoras, setDuracaoEmHoras] = useState<number>(0)
    const [novaTag, setNovaTag] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [errosValidacao, setErrosValidacao] = useState<{ [key: string]: string }>()
    const [tentouSalvar, setTentouSalvar] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        if (curso) {
            setTitulo(curso.titulo)
            setDescricao(curso.descricao)
            setLink(curso.link)
            setPreco(curso.preco)
            setPrazoInscricao(curso.prazoInscricao)
            setDuracaoEmHoras(curso.duracaoEmHoras)
            setTags(curso.tags || []);
        }
    }, [curso]);

    const salvarCurso = async () => {
        setIsLoading(true);

        const curso: Curso = new Curso (titulo, descricao, link, tags, prazoInscricao, preco, duracaoEmHoras)
        const isValid = await validar(curso);
        setTentouSalvar(true);

        if (isValid) {
            salvar(curso);
            fechar();
            limpar();
        }
        setIsLoading(false);
    };

    const validar = async (curso: Curso): Promise<boolean> => {
        const result = await ValidarConteudoService.validarConteudo(curso, TipoConteudo.CURSO);
        if (result.success) {
            return true
        }
        const errosValidacao = mapperMensagensValidacaoConteudo(result.errors, TipoConteudo.CURSO)
        setErrosValidacao(errosValidacao)
        return false
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

    const adicionarTag = (novaTagObj: Tag) => {
        if (!tags.find(tag => tag.id === novaTagObj.id)) {
            setTags([...tags, novaTagObj]);
        }
    };

    const removerTag = (id: string) => {
        const novasTags = tags.filter(tag => tag.id !== id);
        setTags(novasTags);
    };

    return(
        <>
            {isLoading && <LoadingOverlay />}

            <Button variant="primary" onClick={mostrar}>
                Adicionar Curso
            </Button>

            <Modal show={abrir} onHide={cancelar} backdrop="static">
                <Modal.Header>
                    <Modal.Title>{curso ? 'Editar Curso' : 'Adicionar Curso'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <CampoTextoSimplesModal id="Titulo" label="Titulo"
                                                texto={titulo}
                                                salvarTexto={setTitulo}
                                                erro={errosValidacao?.titulo}
                                                tentouSalvar={tentouSalvar}/>
                        <CampoTextAreaModal id="Descricao" label="Qual o foco do curso?"
                                            texto={descricao}
                                            salvarTexto={setDescricao}
                                            erro={errosValidacao?.descricao}
                                            tentouSalvar={tentouSalvar}/>
                        <CampoTextoSimplesModal id="Link" label="Cole aqui o link para o curso"
                                                texto={link}
                                                salvarTexto={setLink}
                                                erro={errosValidacao?.link}
                                                tentouSalvar={tentouSalvar}/>
                        <CampoDataModal label="Qual o limite de inscrição para o curso?"
                                        valor={prazoInscricao}
                                        salvarData={setPrazoInscricao}
                                        erro={errosValidacao?.prazoInscricao}
                                        tentouSalvar={tentouSalvar}/>
                        <CampoValorMonetarioModal label="Preço do curso"
                                                  valor={preco}
                                                  checkBox={true}
                                                  checkBoxLabel="O curso é gratuito?"
                                                  salvarValor={setPreco}
                                                  erro={errosValidacao?.preco}
                                                  tentouSalvar={tentouSalvar}/>

                        <CampoNumerico
                            value={duracaoEmHoras}
                            onChange={setDuracaoEmHoras}
                            id="duracaoHoras"
                            min={0}
                            label="Quantas horas dura o curso?"
                            erro={errosValidacao?.duracaoEmHoras}
                            tentouSalvar={tentouSalvar}
                        />

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
                    <Button variant="primary" onClick={salvarCurso}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCurso