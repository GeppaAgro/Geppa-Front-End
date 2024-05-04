import {Conteudo} from "../TypesConteudos/Conteudos/TypeConteudo.ts";
import {TipoConteudo} from "../Enums/TipoConteudo.ts";
import axiosClient from "./AxiosClient.ts";
import {AxiosError, AxiosResponse} from "axios";
import {MensagensValidacao} from "../Enums/MensagensValidacao.ts";

export class ValidarConteudoService {

    async validarConteudo(conteudo: Conteudo, tipoConteudo: TipoConteudo): Promise<{
        success: boolean;
        errors: Array<object>
    }> {
        try {
            const response = await axiosClient.post(`/${tipoConteudo}/validar`, conteudo)
            return this.handleResponse(response)
        } catch (error) {
            const axiosError = error as AxiosError
            return this.handleError(axiosError.response as AxiosResponse)
        }
    }

    private handleResponse(response: AxiosResponse): { success: boolean; errors: Array<object> } {
        if (response.status >= 200 && response.status < 300) {
            return {success: true, errors: []}
        }
        return {
            success: false, errors: [
                {mensagem: MensagensValidacao.IMPOSSIVEL_REALIZAR_VALIDACAO}
            ]
        }
    }


    private handleError(response: AxiosResponse): { success: boolean; errors: Array<object> } {
        if (response.status == 400) {
            if (response.data.errosValidacao) {
                return {
                    success: false,
                    errors: response.data.errosValidacao
                }
            }
            return {
                success: false,
                errors: [{
                    mensagem: response.data.mensagem
                }]
            }
        }

        return {
            success: false,
            errors: [{mensagem: MensagensValidacao.IMPOSSIVEL_REALIZAR_VALIDACAO}]
        }
    }
}