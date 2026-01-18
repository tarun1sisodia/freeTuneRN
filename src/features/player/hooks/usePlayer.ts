import { useRef } from 'react';
import { usePlayerStore } from '../../../store/usePlayerStore';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { SongRepository } from '../../../services/database/repositories/SongRepository';

export const usePlayer = () => {
    const store = usePlayerStore();
    const progress = useProgress();

    // Override playTrack from store to check for local file
    const playTrack = async (track: any) => {
        let url = track.url;
        try {
            const offlineSong = await SongRepository.findSongByRemoteUrl(url);
            if (offlineSong && offlineSong.localPath) {
                console.log('Playing from local cache:', offlineSong.localPath);
                url = offlineSong.localPath;
            }
        } catch (e) {
            console.error('Error checking offline song', e);
        }

        await store.playTrack({ ...track, url });
    };

    return {
        ...store,
        playTrack, // Expose our wrapped function
        position: progress.position,
        duration: progress.duration,
        buffered: progress.buffered,

        seekTo: async (seconds: number) => {
            await TrackPlayer.seekTo(seconds);
        }
    };
};
