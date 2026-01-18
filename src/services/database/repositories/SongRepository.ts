import { database } from '../index';
import Song from '../models/Song';
import { Q } from '@nozbe/watermelondb';

export const SongRepository = {
    getCollection: () => database.get<Song>('songs'),

    createOfflineSong: async (songData: any, localPath: string) => {
        const collection = database.get<Song>('songs');
        const existing = await collection.query(Q.where('remote_url', songData.remote_url)).fetch();

        if (existing.length > 0) {
            // Update existing
            return await database.write(async () => {
                await existing[0].update(song => {
                    song.localPath = localPath;
                });
                return existing[0];
            });
        }

        // Create new
        return await database.write(async () => {
            const newSong = await collection.create(song => {
                song.title = songData.title;
                song.artist = songData.artist;
                song.remoteUrl = songData.remote_url || songData.url;
                song.localPath = localPath;
                song.thumbnail = songData.thumbnail || songData.artwork;
                song.duration = songData.duration || 0;
            });
            return newSong;
        });
    },

    findSongByRemoteUrl: async (remoteUrl: string) => {
        const collection = database.get<Song>('songs');
        const results = await collection.query(Q.where('remote_url', remoteUrl)).fetch();
        return results.length > 0 ? results[0] : null;
    },

    getAllDownloadedSongs: async () => {
        const collection = database.get<Song>('songs');
        // Filter where local_path is not null/empty
        return await collection.query(Q.where('local_path', Q.notEq(null))).fetch();
    }
};
