
import {Autor} from "../TypeAutor.ts";
import {Conteudo} from "./TypeConteudo.ts";

export type Artigo = Conteudo & {
    dataPublicacao: Date;
    autores: Autor[];
};