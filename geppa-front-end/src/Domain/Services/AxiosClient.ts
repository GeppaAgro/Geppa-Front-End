import axios, {AxiosInstance} from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL_PROD || import.meta.env.VITE_API_BASE_URL_DEV;

const axiosClient: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});


axiosClient.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 500) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
        return Promise.reject(error);
    }
);

function getToken() {
    return localStorage.getItem('accessToken');
}


axiosClient.interceptors.response.use();


export default axiosClient;