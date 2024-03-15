import {Boletim} from "./TypeBoletim.ts";
import {LinksConsultaPaginacao} from "./TypeLinkConsultaPaginacao.ts";

export type ConsultaBoletim = {
    dados: Boletim[];
    dataHora: string;
    mensagem: string;
    ordenacao: string;
    paginaAtual: number;
    path: string;
    status: number;
    tamanhoPagina: number;
    totalElementos: number;
    totalPaginas: number;
    _links: LinksConsultaPaginacao;
}

