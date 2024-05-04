import {Artigo,Curso, Evento, Noticia, Video} from "./TypesConteudos.ts";
import {Conteudo} from "./Conteudos/Conteudo.ts";

export type ModalConteudoProps = {
    abrir: boolean;
    fechar: () => void;
    mostrar: () => void;
    salvar: (data: Conteudo) => void;
    artigo?: Artigo
    curso? : Curso
    evento?: Evento
    noticia?: Noticia
    video?: Video
}
