import {MensagensValidacao} from "../Enums/MensagensValidacao.ts";
import {TipoConteudo} from "../Enums/TipoConteudo.ts";


export function getMpperMensagensValidacaoCampos(tipoConteudo: TipoConteudo) {
    switch (tipoConteudo) {
        case TipoConteudo.NOTICIA:
            return mapeamentosCamposValidacaoNoticia;
        default:
            return mapeamentosCamposValidacaoConteudo;
    }
}

const mapeamentosCamposValidacaoConteudo = {
    titulo: new Map([
        ['O titulo eh obrigatorio', MensagensValidacao.TITULO_OBRIGATORIO],
        ['O titulo deve ter no minimo 3 caracteres', MensagensValidacao.TITULO_MINIMO_CARACTERES],
    ]),
    descricao: new Map([
        ['A descricao eh obrigatoria', MensagensValidacao.DESCRICAO_OBRIGATORIA],
        ['A descricao deve ter no minimo 10 caracteres', MensagensValidacao.DESCRICAO_MINIMO_CARACTERES],
    ]),
    link: new Map([
        ['O link e obrigatorio', MensagensValidacao.LINK_OBRIGATORIO],
        ['O link deve ser uma URL valida', MensagensValidacao.LINK_INVALIDO],
    ]),
    tags: new Map([
        ['As tags sao obrigatorias', MensagensValidacao.TAGS_OBRIGATORIAS],
        ['Deve haver pelo menos uma tag', MensagensValidacao.TAGS_SIZE_MINIMO],
    ]),
}

const mapeamentosCamposValidacaoNoticia = {
    ...mapeamentosCamposValidacaoConteudo,
    dataPublicacao: new Map([
        ['A data de publicacao eh obrigatoria', MensagensValidacao.DATA_PUBLICACAO_OBRIGATORIA],
        ['A data de publicacao deve ser anterior a data atual', MensagensValidacao.DATA_PUBLICACAO_ANTERIOR_DATA_ATUAL],
    ])
}