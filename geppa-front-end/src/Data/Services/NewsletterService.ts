import {AxiosError, AxiosResponse} from 'axios';
import {Newsletter} from '../ApiTypes/TypeNewsletter.ts';
import AxiosClient from "./AxiosClient.ts";


export class NewsletterService {
    async inscricaoNewsletter(newsletter: Newsletter): Promise<{ success: boolean; message: string }> {
        try {
            const response: AxiosResponse = await AxiosClient.post('/newsletters/inscricao', newsletter);
            return this.handleResponse(response);
        } catch (error) {
            const axiosError = error as AxiosError;
            return this.handleError(axiosError);
        }
    }

    private handleResponse(response: AxiosResponse): { success: boolean; message: string } {
        if (response.status >= 200 && response.status < 300) {
            return {success: true, message: "Inscrição Realizada com sucesso!"};
        } else {
            return this.handleErrorResponse(response);
        }
    }

    private handleErrorResponse(response: AxiosResponse): { success: boolean; message: string } {
        if (response.status === 400) {
            if (response.data.mensagem === "Registro já cadastrado") {
                return {success: false, message: "Este e-mail já está cadastrado na newsletter."};
            } else if (response.data.errosValidacao) {
                return {success: false, message: `${response.data.errosValidacao.email}`};
            }
        }

        return {
            success: false,
            message: 'Falha ao se inscrever na newsletter. Por favor, tente novamente mais tarde.'
        };
    }

    private handleError(error: AxiosError): { success: boolean; message: string } {
        if (error.response?.status === 400) {
            return this.handleErrorResponse(error.response);
        }

        return {
            success: false,
            message: 'Ocorreu um erro ao se inscrever na newsletter. Por favor, tente novamente mais tarde.'
        };
    }
}