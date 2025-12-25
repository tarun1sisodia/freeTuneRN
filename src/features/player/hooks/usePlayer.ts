import { usePlayerStore } from '../store';
import TrackPlayer, { useProgress } from 'react-native-track-player';

export const usePlayer = () => {
    const store = usePlayerStore();
    const progress = useProgress();

    return {
        ...store,
        position: progress.position,
        duration: progress.duration,
        buffered: progress.buffered,

        seekTo: async (seconds: number) => {
            await TrackPlayer.seekTo(seconds);
        }
    };
};
