import {Artigo,Curso, Evento, Noticia, Video} from "./TypesConteudos.ts";

export type ModalConteudoProps = {
    abrir: boolean;
    fechar: () => void;
    mostrar: () => void;
    salvar: (data: Video) => void;
    artigo?: Artigo
    curso? : Curso
    evento?: Evento
    noticia?: Noticia
    video?: Video
}
