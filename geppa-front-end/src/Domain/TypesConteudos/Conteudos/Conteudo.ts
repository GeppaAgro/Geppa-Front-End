import {Tag} from "../TypeTag.ts";

export class Conteudo {
    id: string | null;
    boletimInformativoEdicao: string | null;
    titulo: string;
    descricao: string;
    link: string;
    dataCadastro: Date | null;
    dataAtualizacao: Date | null;
    tags: Tag[];

    constructor(titulo: string, descricao: string, link: string, tags: Tag[], id?: string, boletimInformativoEdicao?: string, dataCadastro?: Date, dataAtualizacao?: Date) {
        this.id = id || null;
        this.boletimInformativoEdicao = boletimInformativoEdicao || null;
        this.titulo = titulo;
        this.descricao = descricao;
        this.link = link;
        this.dataCadastro = dataCadastro || null;
        this.dataAtualizacao = dataAtualizacao || null;
        this.tags = tags;
    }
}