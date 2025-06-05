import axios from "axios";

// export const API_URL = "https://api.xgameforge.com";
export const API_URL = "http://192.168.1.5:4242";

const api = axios.create({
    baseURL: API_URL,
});

axios.defaults.withCredentials = true;


api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default api;
