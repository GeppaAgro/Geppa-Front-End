import {BoletimSubmit} from "../../Data/ApiTypes/BoletimSubmit.ts";
import axiosClient from "./AxiosClient.ts";

export class PostarBoletimService{

    static async postarBoletim (boletim: BoletimSubmit){
        try {
            const response = await axiosClient.post('/boletins', boletim);
            if (response.data.status === 201) {
                console.log('Boletim enviado com sucesso!', response.data.edicao);
                return response.data.edicao
            } else {
                console.error(`Erro ao enviar boletim: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Erro ao enviar boletim:', error);
        }
    }

}