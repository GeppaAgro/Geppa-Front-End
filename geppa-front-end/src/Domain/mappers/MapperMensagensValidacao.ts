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
        let chaveMapeada = chave;

        const match = chave.match(/(.+)\[(\d+)\]\.(.+)/);
        if (match) {
            const [, baseChave, index, subChave] = match;
            chaveMapeada = `${baseChave}[${index}].${subChave}`;
        }

        if (Object.prototype.hasOwnProperty.call(mapeamentoEspecifico, chaveMapeada)) {
            const mensagemOriginal = erros[chave];
            const mapeamentoEspecificoChave = mapeamentoEspecifico[chaveMapeada];

            const mensagemMapeada = mapeamentoEspecificoChave.get(mensagemOriginal);
            errosMapeados[chave] = mensagemMapeada !== undefined ? mensagemMapeada : mensagemOriginal;
        } else {
            errosMapeados[chave] = erros[chave];
        }
    }

    return errosMapeados;
}
