import axios from 'axios';
import { API_CONFIG } from '../constants/config';

export const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUTS.CONNECTION,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor (Auth Token placeholder)
apiClient.interceptors.request.use(
    (config: any) => {
        const { token } = require('../../features/auth/store').useAuthStore.getState();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Response Interceptor (Error Handling)
apiClient.interceptors.response.use(
    (response: any) => response.data,
    (error: any) => {
        // Handle global errors (e.g. 401 Unauthorized) here
        if (error.response?.status === 401) {
            // TODO: Trigger logout or refresh
        }
        return Promise.reject(error);
    }
);
