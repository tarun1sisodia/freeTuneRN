import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'songs',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'artist', type: 'string' },
                { name: 'remote_url', type: 'string' },
                { name: 'local_path', type: 'string', isOptional: true },
                { name: 'thumbnail', type: 'string', isOptional: true },
                { name: 'duration', type: 'number', isOptional: true },
                { name: 'created_at', type: 'number' },
            ]
        }),
    ]
})
