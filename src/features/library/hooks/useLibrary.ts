import { useState, useEffect, useCallback } from 'react';
import { PlaylistsApi } from '../../../services/api/playlists';
import { SongsApi } from '../../../services/api/songs';
import { useFocusEffect } from '@react-navigation/native';

export const useLibrary = () => {
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [likedSongs, setLikedSongs] = useState<any[]>([]);
    const [uploadedSongs, setUploadedSongs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLibraryData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [fetchedPlaylists, fetchedLiked, fetchedUploaded] = await Promise.all([
                PlaylistsApi.getUserPlaylists(),
                PlaylistsApi.getLikedSongs(),
                SongsApi.getMySongs(),
            ]);
            setPlaylists(fetchedPlaylists);
            setLikedSongs(fetchedLiked);
            setUploadedSongs(fetchedUploaded);
        } catch (err) {
            console.error('Failed to fetch library data', err);
            setError('Failed to load library');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchLibraryData();
        }, [fetchLibraryData])
    );

    const createPlaylist = async (name: string) => {
        try {
            await PlaylistsApi.createPlaylist(name);
            fetchLibraryData(); // Refresh
        } catch (err) {
            console.error('Failed to create playlist', err);
            throw err;
        }
    };

    const deletePlaylist = async (id: string) => {
        try {
            await PlaylistsApi.deletePlaylist(id);
            // Optimistic update
            setPlaylists(prev => prev.filter(p => p.id !== id && p.playlist_id !== id));
        } catch (err) {
            console.error('Failed to delete playlist', err);
            fetchLibraryData(); // Revert on fail
        }
    };

    return {
        playlists,
        likedSongs,
        uploadedSongs,
        isLoading,
        error,
        createPlaylist,
        deletePlaylist,
        refresh: fetchLibraryData
    };
};
