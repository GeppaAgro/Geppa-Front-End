import {Artigo} from "../../Domain/TypesConteudos/Conteudos/Artigo.ts";
import {Curso} from "../../Domain/TypesConteudos/Conteudos/Curso.ts";
import {Evento} from "../../Domain/TypesConteudos/Conteudos/Evento.ts";
import {Noticia} from "../../Domain/TypesConteudos/Conteudos/Noticia.ts";
import {Video} from "../../Domain/TypesConteudos/Conteudos/Video.ts";
import {Indicador} from "../../Domain/TypesConteudos/Indicador.ts";

export type BoletimSubmit = {
    edicao: string | null,
    artigos: Artigo[] | null
    cursos: Curso[] | null
    eventos: Evento[] | null
    noticias: Noticia[]
    videos: Video[] | null
    indicadores: Indicador[]
}