import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Fix for MMKV type/value conflict
// @ts-ignore
const { MMKV } = require('react-native-mmkv');

// Initialize MMKV
export const storage = new MMKV();

// Custom storage adapter for Zustand
const zustandStorage = {
    setItem: (name: string, value: string) => {
        return storage.set(name, value);
    },
    getItem: (name: string) => {
        const value = storage.getString(name);
        return value ?? null;
    },
    removeItem: (name: string) => {
        return storage.delete(name);
    },
};

interface User {
    id: string;
    email: string;
    username: string;
    avatarUrl?: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            setToken: (token) => set({ token, isAuthenticated: !!token }),
            setUser: (user) => set({ user }),
            logout: () => set({ token: null, user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
);
