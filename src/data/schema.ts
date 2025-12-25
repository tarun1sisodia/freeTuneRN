import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'songs',
            columns: [
                { name: 'song_id', type: 'string', isIndexed: true },
                { name: 'title', type: 'string' },
                { name: 'artist', type: 'string' },
                { name: 'album', type: 'string', isOptional: true },
                { name: 'album_art_url', type: 'string', isOptional: true },
                { name: 'duration_ms', type: 'number' },
                { name: 'r2_key', type: 'string' },
                { name: 'file_sizes_json', type: 'string' }, // Stored as JSON string
                { name: 'play_count', type: 'number' },
                { name: 'popularity_score', type: 'number' },
                { name: 'is_favorite', type: 'boolean', isOptional: true },
                { name: 'is_popular', type: 'boolean', isOptional: true },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number', isOptional: true },
            ],
        }),
        tableSchema({
            name: 'users',
            columns: [
                { name: 'user_id', type: 'string', isIndexed: true },
                { name: 'email', type: 'string' },
                { name: 'username', type: 'string', isOptional: true },
                { name: 'full_name', type: 'string', isOptional: true },
                { name: 'profile_image_url', type: 'string', isOptional: true },
                { name: 'email_verified', type: 'boolean', isOptional: true },
            ],
        }),
        tableSchema({
            name: 'playlists',
            columns: [
                { name: 'playlist_id', type: 'string', isIndexed: true },
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string', isOptional: true },
                { name: 'user_id', type: 'string' },
                { name: 'song_ids_json', type: 'string' }, // JSON for list of strings
                { name: 'auto_generated', type: 'boolean', isOptional: true },
                { name: 'is_public', type: 'boolean', isOptional: true },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number', isOptional: true },
            ]
        }),
        tableSchema({
            name: 'user_interactions',
            columns: [
                { name: 'interaction_id', type: 'string', isIndexed: true },
                { name: 'user_id', type: 'string' },
                { name: 'song_id', type: 'string' },
                { name: 'action_type', type: 'string' },
                { name: 'session_id', type: 'string', isOptional: true },
                { name: 'created_at', type: 'number' },
            ],
        }),
    ],
});
