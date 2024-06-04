import {UnidadeMedida} from "../Enums/unidadeMedida.ts";

export class Indicador {
    id? : string
    nome: string;
    unidadeMedida: UnidadeMedida;
    valor: number | null ;

    constructor(nome: string, unidadeMedida: UnidadeMedida, valor: number | null) {
        this.nome = nome;
        this.unidadeMedida = unidadeMedida;
        this.valor = valor || 0;
    }
}