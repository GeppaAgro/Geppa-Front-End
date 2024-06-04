import {Conteudo} from "./Conteudo.ts";
import {Tag} from "../TypeTag.ts";

export class Evento extends Conteudo {

    dataHoraInicio: Date | null;
    dataHoraFim: Date | null;
    local: string;
    preco: number | null;

    constructor(titulo: string, descricao: string, link: string, tags: Tag[], dataHoraInicio: Date | null, dataHoraFim: Date | null, local: string, preco: number | null, id?: string, boletimInformativoEdicao?: string, dataCadastro?: Date, dataAtualizacao?: Date) {
        super(titulo, descricao, link, tags, id, boletimInformativoEdicao, dataCadastro, dataAtualizacao);
        this.dataHoraInicio = dataHoraInicio;
        this.dataHoraFim = dataHoraFim;
        this.local = local;
        this.preco = preco;
    }
}


