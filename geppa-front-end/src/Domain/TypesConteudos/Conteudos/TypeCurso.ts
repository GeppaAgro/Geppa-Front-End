import {Conteudo} from "./TypeConteudo.ts";

export type Curso = Conteudo & {
    prazoInscricao: Date;
    preco: number;
    duracaoEmHoras: number;
};