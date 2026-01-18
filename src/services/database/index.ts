import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { mySchema } from './schema'
import Song from './models/Song'

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema: mySchema,
    // (You might want to comment out migrations if you don't have any yet)
    // migrations, 
    // dbName: 'myapp', // optional database name or file system path
    // jsi: true, /* Platform.OS === 'ios' */ // optional, experimental JSI support (faster, but tighter requirements)
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
        console.error('Database setup failed', error)
    }
})

// Then, make a Watermelon database from it!
export const database = new Database({
    adapter,
    modelClasses: [
        Song,
    ],
})
