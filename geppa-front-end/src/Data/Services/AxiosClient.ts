import axios, {AxiosInstance} from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL_PROD || import.meta.env.VITE_API_BASE_URL_DEV;

const axiosClient: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.response.use();

export default axiosClient;