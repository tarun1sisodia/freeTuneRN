import { useState, useCallback, useRef } from 'react';
import { SongsApi } from '../../../services/api/songs';
// Use the raw shape for now as we might handle mapping differently
// or import Song from '../../../data/models/Song';

interface UseSearchResult {
    query: string;
    searchResults: any[];
    isLoading: boolean;
    error: string | null;
    setQuery: (text: string) => void;
    clearSearch: () => void;
}

export const useSearch = (): UseSearchResult => {
    const [query, setQueryState] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const search = async (text: string) => {
        if (!text.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const results = await SongsApi.search(text);
            setSearchResults(results);
        } catch (err) {
            setError('Failed to search songs');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const setQuery = useCallback((text: string) => {
        setQueryState(text);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (text.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        debounceTimer.current = setTimeout(() => {
            search(text);
        }, 500);
    }, []);

    const clearSearch = useCallback(() => {
        setQueryState('');
        setSearchResults([]);
        setError(null);
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
    }, []);

    return {
        query,
        searchResults,
        isLoading,
        error,
        setQuery,
        clearSearch,
    };
};
