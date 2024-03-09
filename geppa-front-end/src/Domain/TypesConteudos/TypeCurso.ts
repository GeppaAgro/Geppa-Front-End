import {Tag} from "./TypeTag.ts";

export type Curso = {
    id: string;
    boletimInformativoEdicao: string;
    titulo: string;
    descricao: string;
    link: string;
    dataCadastro: string;
    dataAtualizacao: string;
    tags: Tag[];
    prazoInscricao: Date;
    preco: number;
    duracaoEmHoras: number;
};