import {Tag} from "../TypesConteudos/TypeTag.ts";
import AxiosClient from "./AxiosClient.ts";
import {AxiosError} from "axios";
import {MensagensRetorno} from "../Enums/MensagensRetorno.ts";

export class TagService {
    static async buscarSugestoesTags(tag: string): Promise<Tag[]> {
        try {
            const response = await AxiosClient.get(`/tags/${tag}`);
            return response.data.dados;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 400) {
                throw new Error(MensagensRetorno.TAG_NAO_ENCONTRADA);
            } else {
                throw new Error(MensagensRetorno.ERRO_AO_BUSCAR_SUGESTOES_TAGS);
            }
        }
    }
}
