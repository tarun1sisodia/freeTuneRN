import { useState, useCallback } from 'react';
import { SongsApi } from '../../../shared/api/songs';
import { Alert } from 'react-native';

export const useFavorites = () => {
    // We can maintain a local set of favorite IDs for quick lookup
    // In a real app, this should be initialized from the user's profile or library
    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

    const isFavorite = useCallback((id: string) => {
        return favoriteIds.has(id);
    }, [favoriteIds]);

    const toggleFavorite = async (id: string) => {
        const isCurrentlyFavorite = favoriteIds.has(id);

        // Optimistic update
        setFavoriteIds(prev => {
            const next = new Set(prev);
            if (isCurrentlyFavorite) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });

        try {
            if (isCurrentlyFavorite) {
                await SongsApi.removeFavorite(id);
            } else {
                await SongsApi.addFavorite(id);
            }
        } catch (error) {
            console.error('Failed to toggle favorite', error);
            // Revert on failure
            setFavoriteIds(prev => {
                const next = new Set(prev);
                if (isCurrentlyFavorite) {
                    next.add(id);
                } else {
                    next.delete(id);
                }
                return next;
            });
            Alert.alert('Error', 'Failed to update favorite status');
        }
    };

    // Helper to initialize favorites from a list (e.g. at app start)
    const setFavorites = useCallback((ids: string[]) => {
        setFavoriteIds(new Set(ids));
    }, []);

    return {
        isFavorite,
        toggleFavorite,
        setFavorites
    };
};
