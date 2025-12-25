import { apiClient } from './client';
import { API_CONFIG } from '../constants/config';

export const PlaylistsApi = {
    getUserPlaylists: async () => {
        try {
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.PLAYLISTS.BASE);
            return Array.isArray(response) ? response : (response as any).data || [];
        } catch (error) {
            console.error('PlaylistsApi.getUserPlaylists error:', error);
            throw error;
        }
    },

    createPlaylist: async (name: string, description?: string) => {
        try {
            const response = await apiClient.post(API_CONFIG.ENDPOINTS.PLAYLISTS.CREATE, {
                name,
                description,
            });
            return response;
        } catch (error) {
            console.error('PlaylistsApi.createPlaylist error:', error);
            throw error;
        }
    },

    deletePlaylist: async (id: string) => {
        try {
            await apiClient.delete(API_CONFIG.ENDPOINTS.PLAYLISTS.DELETE(id));
        } catch (error) {
            console.error('PlaylistsApi.deletePlaylist error:', error);
            throw error;
        }
    },

    addSongToPlaylist: async (playlistId: string, songId: string) => {
        try {
            await apiClient.post(API_CONFIG.ENDPOINTS.PLAYLISTS.ADD_SONG(playlistId), {
                songId,
            });
        } catch (error) {
            console.error('PlaylistsApi.addSongToPlaylist error:', error);
            throw error;
        }
    },

    getLikedSongs: async () => {
        // Assuming there's an endpoint for liked songs, specifically
        try {
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.SONGS.FAVORITES);
            return Array.isArray(response) ? response : (response as any).data || [];
        } catch (error) {
            console.error('PlaylistsApi.getLikedSongs error:', error);
            throw error;
        }
    }
};
