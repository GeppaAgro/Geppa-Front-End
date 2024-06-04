import {Conteudo} from "./Conteudo.ts";
import {Tag} from "../TypeTag.ts";

export class Video extends Conteudo {

    youtube: boolean;

    constructor(titulo: string, descricao: string, link: string, tags: Tag[], youtube: boolean, id?: string, boletimInformativoEdicao?: string, dataCadastro?: Date, dataAtualizacao?: Date) {
        super(titulo, descricao, link, tags, id, boletimInformativoEdicao, dataCadastro, dataAtualizacao);
        this.youtube = youtube;
    }
}