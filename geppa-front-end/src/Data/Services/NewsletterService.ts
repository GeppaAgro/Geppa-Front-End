import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Newsletter } from '../ApiTypes/TypeNewsletter.ts';
import axiosClient from './AxiosClient.ts';

export class NewsletterService {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: axiosClient.defaults.baseURL,
        });
    }

    async inscricaoNewsletter(newsletter: Newsletter): Promise<boolean> {
        try {
            const response: AxiosResponse = await this.axiosClient.post('/newsletters/inscricao', { data: newsletter }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status >= 200 && response.status < 300) {
                return true;
            } else {
                throw new Error(`Failed to subscribe to newsletter. Status: ${response.status}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios Error:', error.message);
            } else {
                console.error('Error:', error.message);
            }

            return false;
        }
    }
}
