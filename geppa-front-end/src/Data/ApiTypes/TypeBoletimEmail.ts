import {Artigo} from "../../Domain/TypesConteudos/Conteudos/Artigo.ts";
import {Curso} from "../../Domain/TypesConteudos/Conteudos/Curso.ts";
import {Evento} from "../../Domain/TypesConteudos/Conteudos/Evento.ts";
import {Noticia} from "../../Domain/TypesConteudos/Conteudos/Noticia.ts";
import {Video} from "../../Domain/TypesConteudos/Conteudos/Video.ts";
import {Indicador} from "../../Domain/TypesConteudos/Indicador.ts";

export class BoletimEmail  {
    id:string
    edicao: string
    dataPublicacao: Date
    artigos: Artigo[]
    cursos: Curso[]
    eventos: Evento[]
    noticias:Noticia[]
    videos: Video[]
    indicadores:Indicador[]


    constructor(id: string, edicao: string, dataPublicacao: Date, artigos: Artigo[], cursos: Curso[], eventos: Evento[], noticias: Noticia[], videos: Video[], indicadores: Indicador[]) {
        this.id = id;
        this.edicao = edicao;
        this.dataPublicacao = dataPublicacao;
        this.artigos = artigos;
        this.cursos = cursos;
        this.eventos = eventos;
        this.noticias = noticias;
        this.videos = videos;
        this.indicadores = indicadores;
    }
}