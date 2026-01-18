export const API_CONFIG = {
    BASE_URL: 'http://localhost:3000/api/v1',
    TIMEOUTS: {
        RECEIVE: 120000, // 120 seconds
        CONNECTION: 30000, // 30 seconds
        SEND: 120000, // 120 seconds
    },
    ENDPOINTS: {
        HEALTHCHECK: '/healthcheck',
        AUTH: {
            REGISTER: '/auth/register',
            LOGIN: '/auth/login',
            LOGOUT: '/auth/logout',
            REFRESH: '/auth/refresh',
            FORGOT_PASSWORD: '/auth/forgot-password',
            RESET_PASSWORD: '/auth/reset-password',
            VERIFY_EMAIL: '/auth/verify-email',
            RESEND_VERIFICATION: '/auth/resend-verification',
            ME: '/auth/me',
            PROFILE: '/auth/profile',
            CHANGE_PASSWORD: '/auth/change-password',
        },
        SONGS: {
            BASE: '/songs',
            UPLOAD: '/songs/upload',
            GET: (id: string) => `/songs/${id}`,
            UPDATE: (id: string) => `/songs/${id}`,
            DELETE: (id: string) => `/songs/${id}`,
            SEARCH: '/songs/search',
            POPULAR: '/songs/popular',
            RECENT: '/songs/recent',
            FAVORITES: '/songs/favorites',
            ADD_FAVORITE: (id: string) => `/songs/${id}/favorite`,
            REMOVE_FAVORITE: (id: string) => `/songs/${id}/favorite`,
            STREAM: (id: string) => `/songs/${id}/stream`,
            PLAY: (id: string) => `/songs/${id}/play`,
        },
        PLAYLISTS: {
            BASE: '/playlists',
            CREATE: '/playlists',
            GET: (id: string) => `/playlists/${id}`,
            UPDATE: (id: string) => `/playlists/${id}`,
            DELETE: (id: string) => `/playlists/${id}`,
            ADD_SONG: (id: string) => `/playlists/${id}/songs`,
            REMOVE_SONG: (playlistId: string, songId: string) => `/playlists/${playlistId}/songs/${songId}`,
        },
        RECOMMENDATIONS: {
            BASE: '/recommendations',
            SIMILAR: (songId: string) => `/recommendations/similar/${songId}`,
            MOOD: (mood: string) => `/recommendations/mood/${mood}`,
            TRENDING: '/recommendations/trending',
        },
        ANALYTICS: {
            TRACK: '/analytics/track',
            STATS: '/analytics/stats',
            TOP_SONGS: '/analytics/top-songs',
            TIME_PATTERNS: '/analytics/time-patterns',
            GENRE_PREFERENCES: '/analytics/genre-preferences',
            MOOD_PREFERENCES: '/analytics/mood-preferences',
            TRENDING: '/analytics/trending',
        },
    },
};
