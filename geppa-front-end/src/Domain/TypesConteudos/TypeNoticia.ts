import {Tag} from "./TypeTag.ts";

export type Noticia = {
    id: string;
    boletimInformativoEdicao: string;
    titulo: string;
    descricao: string;
    link: string;
    dataCadastro: string;
    dataAtualizacao: Date;
    dataPublicacao: Date;
    tags: Tag[];
}