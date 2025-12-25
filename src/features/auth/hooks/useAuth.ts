import { useState } from 'react';
import { useAuthStore } from '../store';
import { apiClient } from '../../../shared/api/client';
import { API_CONFIG } from '../../../shared/constants/config';
import { Alert } from 'react-native';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setToken, setUser, logout } = useAuthStore();

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response: any = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
                email,
                password,
            });

            if (response && response.token) {
                setToken(response.token);
                setUser(response.user || { email, username: 'User' }); // Fallback if user object optional
                return true;
            }
            return false;
        } catch (error: any) {
            console.error('Login Error', error);
            Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, username: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response: any = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
                email,
                password,
                username
            });

            // Auto-login after register logic usually depends on backend
            if (response && response.token) {
                setToken(response.token);
                setUser(response.user);
                return true;
            }
            return true;
        } catch (error: any) {
            console.error('Register Error', error);
            Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        register,
        logout,
        isLoading,
    };
};
