import {Conteudo} from "./TypeConteudo.ts";

export type Evento = Conteudo & {
    dataHoraInicio: Date;
    dataHoraFim: Date;
    local: string;
    preco: number;
}