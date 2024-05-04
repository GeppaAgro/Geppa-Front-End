import {TipoConteudo} from "../Enums/TipoConteudo.ts";
import {getMpperMensagensValidacaoCampos} from "./MapperMensagensCampos.ts";
import {MensagensValidacao} from "../Enums/MensagensValidacao.ts";

export function mapperMensagensValidacaoConteudo(erros: { [key: string]: string }, tipoConteudo: TipoConteudo): {
    [key: string]: string
} {
    const mapeamentoEspecifico: {
        [key: string]: Map<string, MensagensValidacao>
    } = getMpperMensagensValidacaoCampos(tipoConteudo);

    const errosMapeados: { [key: string]: string } = {};

    for (const chave in erros) {
        if (Object.prototype.hasOwnProperty.call(mapeamentoEspecifico, chave)) {
            const mensagemOriginal = erros[chave];
            const mapeamentoEspecificoChave = mapeamentoEspecifico[chave];

            const mensagemMapeada = mapeamentoEspecificoChave.get(mensagemOriginal);
            errosMapeados[chave] = mensagemMapeada !== undefined ? mensagemMapeada : mensagemOriginal;
        } else {
            errosMapeados[chave] = erros[chave];
        }
    }

    return errosMapeados;
}
