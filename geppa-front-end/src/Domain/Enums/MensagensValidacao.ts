export enum MensagensValidacao {
    IMPOSSIVEL_REALIZAR_VALIDACAO = 'Não foi possivel realizar a validação. Tente novamente mais tarde!',
    TITULO_OBRIGATORIO = 'O título é obrigatório',
    TITULO_MINIMO_CARACTERES = 'O título deve ter no mínimo 3 caracteres',
    DESCRICAO_OBRIGATORIA = 'A descrição é obrigatória',
    DESCRICAO_MINIMO_CARACTERES = 'A descrição deve ter no mínimo 10 caracteres',
    LINK_OBRIGATORIO = 'O link é obrigatório',
    LINK_INVALIDO = 'O link deve ser uma URL válida',
    TAGS_OBRIGATORIAS = 'As tags são obrigatórias',
    TAGS_SIZE_MINIMO = 'Deve haver pelo menos uma tag',
    DATA_PUBLICACAO_OBRIGATORIA = 'A data de publicação é obrigatória',
    DATA_PUBLICACAO_ANTERIOR_DATA_ATUAL = 'A data de publicação deve ser anterior a data atual'
}