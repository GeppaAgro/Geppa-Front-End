import {Tag} from "./TypeTag.ts";

export type Video = {
    id: string;
    boletimInformativoEdicao: string;
    titulo: string;
    descricao: string;
    link: string;
    dataCadastro: Date;
    dataAtualizacao: Date;
    tags: Tag[];
    youtube: boolean;
}