export interface ArtigoTeste {
    id: string;
    titulo: string;
    dataPublicacao: Date;
    descricao: string;
    autores: string[];
    tags: string[];
    link: string;
}

export interface CursoTeste {
    id: string;
    titulo: string;
    duracao: number;
    prazoInscricao: string;
    descricao: string;
    preco: number;
    tags: string[];
    link: string;
}

export interface EventoTeste {
    id: string;
    titulo: string;
    descricao: string;
    dataInicio: string;
    horarioInicio: string;
    dataFim: string;
    horarioFim: number;
    valor:number;
    local:string;
    tags: string[];
    link: string;
}

export interface NoticiaTeste {
    id: string;
    titulo: string;
    dataPublicacao: string;
    descricao: string;
    tags: string[];
    link: string;
}

export interface VideoTeste {
    id: string;
    titulo: string;
    descricao: string;
    youtube:boolean;
    tags: string[];
    link: string;
}