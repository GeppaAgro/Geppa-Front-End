import {ModalConteudoProps} from "../../../Domain/TypesConteudos/TypeModaisProps.ts";
import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Tag} from "../../../Domain/TypesConteudos/TypeTag.ts";
import ListagemTagsModal from "./ComponentesModal/ListagemTagsModal.tsx";
import BuscadorDeTag from "./ComponentesModal/BuscadorDeTag.tsx";
import CampoDataModal from "./ComponentesModal/CampoDataModal.tsx";
import CampoTextoSimplesModal from "./ComponentesModal/CampoTextoSimplesModal.tsx";
import CampoTextAreaModal from "./ComponentesModal/CampoTextAreaModal.tsx";
import {Evento} from "../../../Domain/TypesConteudos/Conteudos/Evento.ts";
import {ValidarConteudoService} from "../../../Domain/Services/ValidarConteudoService.ts";
import {TipoConteudo} from "../../../Domain/Enums/TipoConteudo.ts";
import {mapperMensagensValidacaoConteudo} from "../../../Domain/mappers/MapperMensagensValidacao.ts";
import LoadingOverlay from "../Utils/LoadingOverlay/LoadingOverlay.tsx";
import CampoValorMonetarioModal from "./ComponentesModal/CampoValorMonetarioModal.tsx";
import CampoHoraModal from "./ComponentesModal/CampoHoraModal.tsx";
import AxiosClient from "../../../Domain/Services/AxiosClient.ts";
import CadastroTag from "../Tags/CadastroTag/CadastroTag.tsx";

const ModalEvento: React.FC<ModalConteudoProps> = ({abrir, fechar, salvar, evento}) => {
    const [id, setId] = useState<string | null>('')

    const [titulo, setTitulo] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [tags, setTags] = useState<Tag[]>([]);
    const [dataHoraInicio, setDataHoraInicio] = useState<Date | null>(null)
    const [dataHoraFim, setDataHoraFim] = useState<Date | null>(null)
    const [local, setLocal] = useState<string>('')
    const [preco, setPreco] = useState<number | null>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errosValidacao, setErrosValidacao] = useState<{ [key: string]: string }>()
    const [tentouSalvar, setTentouSalvar] = useState(false);
    const [showCadastroTag, setShowCadastroTag] = useState(false);

    useEffect(() => {
        if (evento) {
            setId(evento.id)
            setTitulo(evento.titulo);
            setDescricao(evento.descricao);
            setLink(evento.link);
            setTags(evento.tags);
            setDataHoraInicio(new Date(evento.dataHoraInicio || ''));
            setDataHoraFim(new Date(evento.dataHoraFim || ''));
            setLocal(evento.local);
            setPreco(evento.preco);
        }
    }, [evento]);

    const handleEvento = async () => {
        setIsLoading(true);
        const evento: Evento = new Evento(titulo, descricao, link, tags, dataHoraInicio, dataHoraFim, local, preco)

        const isValid = await validar(evento);
        setTentouSalvar(true);

        if (isValid) {
            if (id) {
                await atualizar(evento)
                fechar();
                limpar();
            } else {
                salvar(evento);
                fechar();
                limpar();
            }

        }
        setIsLoading(false);
    };

    const validar = async (evento: Evento): Promise<boolean> => {
        const result = await ValidarConteudoService.validarConteudo(evento, TipoConteudo.EVENTO);
        if (result.success) {
            return true
        }
        const errosValidacao = mapperMensagensValidacaoConteudo(result.errors, TipoConteudo.EVENTO)
        setErrosValidacao(errosValidacao)
        return false
    };

    const atualizar = async (eve: Evento) => {
        await AxiosClient.put(`/eventos/${id}`, eve)
    }

    const cancelar = () => {
        fechar()
        limpar()
    }

    const limpar = () => {
        setTitulo('')
        setDescricao('')
        setLink('')
        setPreco(0)
        setDataHoraInicio(null)
        setDataHoraFim(null)
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


    const combinarDataHora = (data: Date | null, hora: string | null): Date | null => {
        if (!data || !hora) return null;

        const [horas, minutos] = hora.split(":");
        const dataComHora = new Date(data);
        dataComHora.setHours(parseInt(horas, 10), parseInt(minutos, 10));

        return dataComHora;
    };

    const salvarDataInicio = (data: Date | null) => {
        setDataHoraInicio(data);
    };

    const salvarHoraInicio = (hora: string | null) => {
        if (!dataHoraInicio) return;
        const dataHoraCombinada = combinarDataHora(dataHoraInicio, hora);
        setDataHoraInicio(dataHoraCombinada);
    };

    const salvarDataFim = (data: Date | null) => {
        setDataHoraFim(data);
    };

    const salvarHoraFim = (hora: string | null) => {
        if (!dataHoraFim) return;
        const dataHoraCombinada = combinarDataHora(dataHoraFim, hora);
        setDataHoraFim(dataHoraCombinada);
    };

    return (
        <>
            {isLoading && <LoadingOverlay/>}
            <Modal className={showCadastroTag ? "modal-backdrop" : ""} show={abrir} onHide={cancelar} backdrop="static">
                <Modal.Header>
                    <Modal.Title>{evento ? 'Editar Evento' : 'Adicionar Evento'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <CampoTextoSimplesModal id="Titulo" label="Titulo"
                                                texto={titulo}
                                                salvarTexto={setTitulo}
                                                erro={errosValidacao?.titulo}
                                                tentouSalvar={tentouSalvar}/>
                        <CampoTextAreaModal id="Descricao" label="Qual o foco do evento"
                                            texto={descricao}
                                            salvarTexto={setDescricao}
                                            erro={errosValidacao?.descricao}
                                            tentouSalvar={tentouSalvar}/>
                        <CampoTextoSimplesModal id="Link" label="Cole aqui o link para o evento"
                                                texto={link}
                                                salvarTexto={setLink}
                                                erro={errosValidacao?.link}
                                                tentouSalvar={tentouSalvar}/>
                        <CampoValorMonetarioModal label="Preço do Evento (R$)"
                                                  valor={preco}
                                                  checkBox={true}
                                                  checkBoxLabel="O evento é gratuito?"
                                                  salvarValor={setPreco}
                                                  erro={errosValidacao?.preco}
                                                  tentouSalvar={tentouSalvar}/>

                        <CampoTextAreaModal id="Local" label="Onde sera o evento?"
                                            texto={local}
                                            salvarTexto={setLocal}
                                            erro={errosValidacao?.local}
                                            tentouSalvar={tentouSalvar}/>

                        <CampoDataModal label="Data de Início do Evento"
                                        valor={dataHoraInicio}
                                        salvarData={salvarDataInicio}
                                        erro={errosValidacao?.dataHoraInicio}
                                        tentouSalvar={tentouSalvar}/>

                        <CampoHoraModal label="Hora de Início do Evento"
                                        valor={dataHoraInicio ? dataHoraInicio.getHours().toString().padStart(2, '0') + ':' + dataHoraInicio.getMinutes().toString().padStart(2, '0') : ''}
                                        salvarHora={salvarHoraInicio}
                                        erro={errosValidacao?.dataHoraInicio}
                                        tentouSalvar={tentouSalvar}/>

                        <CampoDataModal label="Data de Fim do Evento"
                                        valor={dataHoraFim}
                                        salvarData={salvarDataFim}
                                        erro={errosValidacao?.dataHoraFim}
                                        tentouSalvar={tentouSalvar}/>

                        <CampoHoraModal label="Hora de Fim do Evento"
                                        valor={dataHoraFim ? dataHoraFim.getHours().toString().padStart(2, '0') + ':' + dataHoraFim.getMinutes().toString().padStart(2, '0') : ''}
                                        salvarHora={salvarHoraFim}
                                        erro={errosValidacao?.dataHoraFim}
                                        tentouSalvar={tentouSalvar}/>
                        <hr/>

                        <CadastroTag buttonText={"Nova Tag"}
                                     iconClass={"ri-add-line"}
                                     fetchTags={() => {
                                     }}
                                     classNameBtn={"mb-3 border-0"}
                                     onShow={() => setShowCadastroTag(true)}
                                     onHide={() => setShowCadastroTag(false)}/>


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
                    <Button variant="primary" onClick={handleEvento}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEvento