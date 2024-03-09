import {Tag} from "./TypeTag.ts"
import {Autor} from "./TypeAutor.ts";

export type Artigo = {
    id: string;
    boletimInformativoEdicao: string;
    titulo: string;
    descricao: string;
    link: string;
    dataCadastro: string;
    dataAtualizacao: string;
    tags: Tag[];
    dataPublicacao: Date;
    autores: Autor[];
};