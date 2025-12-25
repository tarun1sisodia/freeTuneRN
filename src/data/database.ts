import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';

import { schema } from './schema';
import Song from './models/Song';
import User from './models/User';
import Playlist from './models/Playlist';
import UserInteraction from './models/UserInteraction';

const adapter = new LokiJSAdapter({
    schema,
    // migrations, // (optional)
    useWebWorker: false,
    useIncrementalIndexedDB: true,
    // dbName: 'freeTuneDB', // optional, defaults to 'watermelon'
    // onQuotaExceededError: (error) => { ... } // (optional)
});

export const database = new Database({
    adapter,
    modelClasses: [
        Song,
        Playlist,
        User,
        UserInteraction,
    ],
});
