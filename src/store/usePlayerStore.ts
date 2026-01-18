import { create } from 'zustand';
import TrackPlayer, { State, RepeatMode, Track, Capability } from 'react-native-track-player';

interface PlayerState {
    currentTrack: Track | null;
    isPlaying: boolean;
    isShuffle: boolean;
    repeatMode: RepeatMode;
    queue: Track[];

    // Actions
    setupPlayer: () => Promise<void>;
    playTrack: (track: Track) => Promise<void>;
    pause: () => Promise<void>;
    resume: () => Promise<void>;
    skipToNext: () => Promise<void>;
    skipToPrevious: () => Promise<void>;
    toggleShuffle: () => void;
    setRepeatMode: (mode: RepeatMode) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    currentTrack: null,
    isPlaying: false,
    isShuffle: false,
    repeatMode: RepeatMode.Off,
    queue: [],

    setupPlayer: async () => {
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.SeekTo,
                ],
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                ],
                notificationCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ],
            });
        } catch (e) {
            // Player might already be set up, ignore error or handle gracefully
            console.log('Player setup error or already setup', e);
        }
    },

    playTrack: async (track) => {
        await TrackPlayer.reset();
        await TrackPlayer.add(track);
        await TrackPlayer.play();
        set({ currentTrack: track, isPlaying: true });
    },

    pause: async () => {
        await TrackPlayer.pause();
        set({ isPlaying: false });
    },

    resume: async () => {
        await TrackPlayer.play();
        set({ isPlaying: true });
    },

    skipToNext: async () => {
        await TrackPlayer.skipToNext();
    },

    skipToPrevious: async () => {
        await TrackPlayer.skipToPrevious();
    },

    toggleShuffle: () => {
        // TODO: Implement Shuffle Logic with Queue
        set((state) => ({ isShuffle: !state.isShuffle }));
    },

    setRepeatMode: (mode) => {
        TrackPlayer.setRepeatMode(mode);
        set({ repeatMode: mode });
    }
}));
