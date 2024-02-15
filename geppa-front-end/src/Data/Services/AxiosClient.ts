import axios from "axios";

const axiosClient = axios.create(
    {
        baseURL:`http://localhost/`,
        headers:{
            "Content-Type":"application/json"
        }
    }
)

axios.interceptors.response.use(res => res.data)

export default axiosClient