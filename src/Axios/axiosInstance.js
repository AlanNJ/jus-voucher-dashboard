import axios from "axios";
import config from "../Constants/config";

const axiosInstance = axios.create({
    baseURL: config.baseURL,
    timeout: 1000,
})

export default axiosInstance;