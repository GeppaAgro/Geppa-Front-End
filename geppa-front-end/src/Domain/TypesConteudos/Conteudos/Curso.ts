import {Conteudo} from "./Conteudo.ts";
import {Tag} from "../TypeTag.ts";

export class Curso extends Conteudo {
    prazoInscricao: Date | null;
    preco: number | null;
    duracaoEmHoras: number;

    constructor(titulo: string, descricao: string, link: string, tags: Tag[], prazoInscricao: Date | null, preco: number | null, duracaoEmHoras: number, id?: string, boletimInformativoEdicao?: string, dataCadastro?: Date, dataAtualizacao?: Date) {
        super(titulo, descricao, link, tags, id, boletimInformativoEdicao, dataCadastro, dataAtualizacao);
        this.prazoInscricao = prazoInscricao;
        this.preco = preco;
        this.duracaoEmHoras = duracaoEmHoras;
    }
}
