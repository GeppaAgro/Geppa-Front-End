import {Conteudo} from "./Conteudo.ts";
import {Tag} from "../TypeTag.ts";

export class Noticia extends Conteudo {

    dataPublicacao: Date | null;

    constructor(titulo: string, descricao: string, link: string, tags: Tag[], dataPublicacao: Date | null, id?: string, boletimInformativoEdicao?: string, dataCadastro?: Date, dataAtualizacao?: Date) {
        super(titulo, descricao, link, tags, id, boletimInformativoEdicao, dataCadastro, dataAtualizacao);
        this.dataPublicacao = dataPublicacao;
    }
}