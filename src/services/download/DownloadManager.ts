import ReactNativeBlobUtil from 'react-native-blob-util';
import { SongRepository } from '../database/repositories/SongRepository';
import { Alert, Platform } from 'react-native';

class DownloadManagerService {
    async downloadSong(song: any) {
        const { dirs } = ReactNativeBlobUtil.fs;
        const fileName = `${song.id || song.song_id}_${Date.now()}.mp3`;
        const path = `${dirs.DocumentDir}/${fileName}`;
        const url = song.downloadUrl || song.url || song.remote_url; // Adapt based on actual API response

        if (!url) {
            console.error('No download URL for song', song);
            return;
        }

        try {
            const res = await ReactNativeBlobUtil
                .config({
                    path: path,
                    fileCache: true,
                })
                .fetch('GET', url);

            const localPath = res.path();
            console.log('File downloaded to:', localPath);

            // Save to DB
            await SongRepository.createOfflineSong(song, `file://${localPath}`);
            Alert.alert('Success', 'Song downloaded successfully!');
            return localPath;

        } catch (error) {
            console.error('Download failed', error);
            Alert.alert('Error', 'Failed to download song');
            return null;
        }
    }
}

export const DownloadManager = new DownloadManagerService();
