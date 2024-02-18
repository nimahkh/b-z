import axios from "axios";

function setAuthToken(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function fetchTokenFromLocalStorage() {
    return localStorage.getItem('token');
}

function setTokenIfAvailable() {
    const token = fetchTokenFromLocalStorage();
    if (token) {
        setAuthToken(token);
    }
}

export function initConfigs() {
    const apiEndPoint = import.meta.env.VITE_BASE_URL;
    axios.defaults.baseURL = apiEndPoint;
    setTokenIfAvailable();
}

initConfigs();
