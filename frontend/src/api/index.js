import axios from 'axios';
import store from "@/store";

const baseURL = 'http://localhost:8080';

const api = axios.create({
    baseURL,
});

const apiAuth = axios.create({
    baseURL: `${baseURL}/api/auth`,
});

// Add an interceptor to include the Authorization header in every request
api.interceptors.request.use(
    (config) => {
        const accessToken = store.state.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


apiAuth.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);
api.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

// Wrapper function for requests with global error handling
const makeRequest = async (method, url, data) => {
    try {
        return method(url, data);
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

export const auth = {
    login: async (userData) => {
        return makeRequest(apiAuth.post, '/login', userData);
    },
    register: async (userData) => {
        return makeRequest(apiAuth.post, '/register', userData);
    },
}

export const categories = {
    create: async (categoryData) => {
        return makeRequest(api.post, '/category', categoryData);
    },
    getAll: async () => {
        return makeRequest(api.get, '/category/getAll');
    },
    update: async (id, categoryData) => {
        return makeRequest(api.put, `/category/${id}`, categoryData);
    },
    delete: async (id) => {
        return makeRequest(api.delete(), `/category/${id}`);
    },
}

export const operations = {
    create: async (operationData) => {
        return makeRequest(api.post, '/category', operationData);
    },
    getAll: async () => {
        return makeRequest(api.get, '/operation/getAll');
    },
}
