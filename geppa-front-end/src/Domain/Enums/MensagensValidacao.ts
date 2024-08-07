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
    DATA_PUBLICACAO_ANTERIOR_DATA_ATUAL = 'A data de publicação deve ser anterior a data atual',
    AUTORES_OBRIGATORIOS = 'Os autores são obrigatórios',
    AUTORES_SIZE_MINIMO = 'Deve haver pelo menos um autor',
    AUTORES_NOME_OBRIGATORIO = 'O nome do autor é obrigatório',
    AUTORES_NOME_MINIMO_CARACTERES = 'O nome do autor deve ter pelo menos 3 caracteres',
    ERRO_PUBLICAR_BOLETIM = 'Não foi possivel publicar o boletim, verifique a conexao com o servidor'
}