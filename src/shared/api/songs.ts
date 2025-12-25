import { apiClient } from './client';
import { API_CONFIG } from '../constants/config';
import Song from '../../data/models/Song';

// Define the shape of the search response if it wraps the songs
interface SearchResponse {
    songs: any[]; // We'll map this to our model or just use raw data if the UI expects it
}

export const SongsApi = {
    search: async (query: string): Promise<any[]> => {
        try {
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.SONGS.SEARCH, {
                params: { query },
            });
            // Assuming the API returns a list of songs directly or nested in a 'data' property
            // Adjust based on actual API response structure. For now, assuming direct array or standard wrapper.
            return Array.isArray(response) ? response : (response as any).data || [];
        } catch (error) {
            console.error('SongsApi.search error:', error);
            throw error;
        }
    },

    getPopular: async (): Promise<any[]> => {
        try {
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.SONGS.POPULAR);
            return Array.isArray(response) ? response : (response as any).data || [];
        } catch (error) {
            console.error('SongsApi.getPopular error:', error);
            throw error;
        }
    },

    getRecent: async (): Promise<any[]> => {
        try {
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.SONGS.RECENT);
            return Array.isArray(response) ? response : (response as any).data || [];
        } catch (error) {
            console.error('SongsApi.getRecent error:', error);
            throw error;
        }
    },

    getMySongs: async (): Promise<any[]> => {
        try {
            // Assuming GET /songs returns the user's uploaded songs or all songs.
            // If there is a specific 'uploaded' endpoint, use that.
            // Based on config, closest is BASE which is /songs.
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.SONGS.BASE);
            return Array.isArray(response) ? response : (response as any).data || [];
        } catch (error) {
            console.error('SongsApi.getMySongs error:', error);
            throw error;
        }
    },

    upload: async (formData: FormData): Promise<any> => {
        try {
            const response = await apiClient.post(API_CONFIG.ENDPOINTS.SONGS.UPLOAD, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            console.error('SongsApi.upload error:', error);
            throw error;
        }
    }
};
