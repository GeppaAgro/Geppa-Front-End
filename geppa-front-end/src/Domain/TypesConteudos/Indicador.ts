import {UnidadeMedida} from "../Enums/unidadeMedida.ts";

export class Indicador {
    id? : string
    produto: string;
    unidadeMedida: UnidadeMedida;
    valor: number | null ;

    constructor(produto: string, unidadeMedida: UnidadeMedida, valor: number | null) {
        this.produto = produto;
        this.unidadeMedida = unidadeMedida;
        this.valor = valor || 0;
    }
}