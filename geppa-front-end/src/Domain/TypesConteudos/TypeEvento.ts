import {Tag} from "./TypeTag.ts";

export type Evento = {
    id: string;
    boletimInformativoEdicao: string;
    titulo: string;
    descricao: string;
    link: string;
    dataCadastro: string;
    dataAtualizacao: string;
    dataHoraInicio: Date;
    dataHoraFim: Date;
    local: string;
    preco: number;
    tags: Tag[];
}