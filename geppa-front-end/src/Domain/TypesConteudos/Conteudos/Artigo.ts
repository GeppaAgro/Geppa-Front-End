import {Autor} from "../TypeAutor.ts";
import {Conteudo} from "./Conteudo.ts";
import {Tag} from "../TypeTag.ts";


export class Artigo extends Conteudo {
    dataPublicacao: Date;
    autores: Autor[];

    constructor(titulo: string, descricao: string, link: string, autores: Autor[], dataPublicacao: Date, tags: Tag[], id?: string, boletimInformativoEdicao?: string, dataCadastro?: Date, dataAtualizacao?: Date) {
        super(titulo, descricao, link, tags, id, boletimInformativoEdicao, dataCadastro, dataAtualizacao);
        this.dataPublicacao = dataPublicacao;
        this.autores = autores;
    }
}

