import {Conteudo} from "./TypeConteudo.ts";

export type Noticia =  Conteudo & {
    dataPublicacao: Date;
}