// service.js
import TrackPlayer, { Event } from 'react-native-track-player';

module.exports = async function () {
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

    TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());

    TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());

    TrackPlayer.addEventListener(Event.RemoteSeek, (event) => TrackPlayer.seekTo(event.position));

    TrackPlayer.addEventListener(Event.RemoteDuck, async (e) => {
        if (e.paused) {
            // Interrupted (e.g. phone call), pause
            await TrackPlayer.pause();
        } else {
            // Interruption over, resume
            await TrackPlayer.play();
        }
    });

    TrackPlayer.addEventListener(Event.PlaybackQueueEnded, (event) => {
        // Optional: Handle queue end
    });
};
