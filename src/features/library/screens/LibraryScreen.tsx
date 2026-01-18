import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image,
    Alert,
    TextInput,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../app/theme/app_colors';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useLibrary } from '../hooks/useLibrary';
import { usePlayerStore } from '../../../store/usePlayerStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { API_CONFIG } from '../../../utils/constants/config';

const TabButton = ({ title, isActive, onPress }: { title: string, isActive: boolean, onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
        className={`px-4 py-2 mr-4 border-b-2 ${isActive ? 'border-primary' : 'border-transparent'}`}
        style={{ borderColor: isActive ? AppColors.primary : 'transparent' }}
    >
        <Text className={`font-bold text-base ${isActive ? 'text-white' : 'text-gray-400'}`}>
            {title}
        </Text>
    </TouchableOpacity>
);

const PlaylistCard = ({ playlist, onPress, onLongPress }: { playlist: any, onPress: () => void, onLongPress: () => void }) => (
    <TouchableOpacity
        onLongPress={onLongPress}
        onPress={onPress}
        className="w-[48%] mb-4"
    >
        <View className="aspect-square bg-gray-800 rounded-md mb-2 items-center justify-center overflow-hidden">
            {playlist.coverUrl ? (
                <Image source={{ uri: playlist.coverUrl }} className="w-full h-full" />
            ) : (
                <Icon name="music-note" size={40} color={AppColors.grey} />
            )}
        </View>
        <Text className="text-white font-bold text-sm" numberOfLines={1}>{playlist.name}</Text>
        <Text className="text-gray-400 text-xs" numberOfLines={1}>
            {playlist.songIds?.length || 0} songs
        </Text>
    </TouchableOpacity>
);

const LikedSongsCard = ({ count, onPress }: { count: number, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} className="w-[48%] mb-4">
        <LinearGradient
            colors={['#4c1d95', '#1e3a8a']} // purple-800 to blue-900
            className="aspect-square rounded-md mb-2 p-4 justify-center"
        >
            <Icon name="favorite" size={32} color="white" />
            <View className="mt-4">
                <Text className="text-white font-bold text-lg">Liked Songs</Text>
                <Text className="text-white/70 text-xs">{count} songs</Text>
            </View>
        </LinearGradient>
    </TouchableOpacity>
);

const SongListItem = ({ song, onPress }: { song: any, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center p-3">
        <Image
            source={{ uri: song.album_art_url || 'https://via.placeholder.com/50' }}
            className="w-12 h-12 rounded bg-gray-800"
        />
        <View className="ml-3 flex-1">
            <Text className="text-white font-bold text-base" numberOfLines={1}>{song.title}</Text>
            <Text className="text-gray-400 text-sm" numberOfLines={1}>{song.artist}</Text>
        </View>
        <Icon name="more-vert" size={24} color={AppColors.grey} />
    </TouchableOpacity>
);

export const LibraryScreen = () => {
    const { playlists, likedSongs, uploadedSongs, createPlaylist, deletePlaylist } = useLibrary();
    const navigation = useNavigation();
    const { playTrack } = usePlayerStore();
    const token = useAuthStore((state) => state.token);
    const [activeTab, setActiveTab] = useState<'Playlists' | 'My Songs'>('Playlists');
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    const handleCreatePlaylist = async () => {
        if (!newPlaylistName.trim()) return;
        try {
            await createPlaylist(newPlaylistName);
            setCreateModalVisible(false);
            setNewPlaylistName('');
        } catch (e) {
            Alert.alert('Error', 'Failed to create playlist');
        }
    };

    const handleDeletePlaylist = (playlist: any) => {
        Alert.alert(
            'Delete Playlist',
            `Are you sure you want to delete "${playlist.name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deletePlaylist(playlist.id || playlist.playlist_id)
                }
            ]
        );
    };

    const renderPlaylists = () => (
        <View className="flex-1 px-4 pt-4">
            <View className="flex-row flex-wrap justify-between">
                <LikedSongsCard count={likedSongs.length} onPress={() => { /* TODO */ }} />
                {playlists.map((playlist, index) => (
                    <PlaylistCard
                        key={playlist.id || index}
                        playlist={playlist}
                        onPress={() => { /* TODO */ }}
                        onLongPress={() => handleDeletePlaylist(playlist)}
                    />
                ))}
            </View>
        </View>
    );

    const handlePlaySong = async (song: any) => {
        const id = song.song_id || song.id || song._id;
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SONGS.STREAM(id)}`;

        await playTrack({
            id: id,
            url: url,
            title: song.title,
            artist: song.artist,
            artwork: song.album_art_url || song.artwork || 'https://via.placeholder.com/150',
            duration: song.duration_ms ? song.duration_ms / 1000 : 0,
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
    };

    const renderMySongs = () => (
        <FlatList
            data={uploadedSongs}
            keyExtractor={(item) => item.id || item.song_id}
            renderItem={({ item }) => <SongListItem song={item} onPress={() => handlePlaySong(item)} />}
            ListEmptyComponent={
                <View className="items-center justify-center py-20">
                    <Text className="text-gray-400 text-lg">No songs uploaded yet</Text>
                </View>
            }
        />
    );

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-row items-center justify-between px-4 py-2" style={{ backgroundColor: AppColors.darkBackground }}>
                <View className="flex-row">
                    <TabButton
                        title="Playlists"
                        isActive={activeTab === 'Playlists'}
                        onPress={() => setActiveTab('Playlists')}
                    />
                    <TabButton
                        title="My Songs"
                        isActive={activeTab === 'My Songs'}
                        onPress={() => setActiveTab('My Songs')}
                    />
                </View>
                <TouchableOpacity onPress={() => {
                    if (activeTab === 'My Songs') {
                        navigation.navigate('Upload' as never);
                    } else {
                        setCreateModalVisible(true);
                    }
                }}>
                    <Icon name="add" size={28} color="white" />
                </TouchableOpacity>
            </View>

            {activeTab === 'Playlists' ? (
                <FlatList
                    data={[]} // Using ListHeaderComponent for grid to allow scrolling
                    renderItem={null}
                    ListHeaderComponent={renderPlaylists}
                />
            ) : (
                renderMySongs()
            )}

            <Modal
                transparent
                visible={isCreateModalVisible}
                animationType="fade"
                onRequestClose={() => setCreateModalVisible(false)}
            >
                <View className="flex-1 bg-black/80 justify-center items-center p-4">
                    <View className="bg-gray-900 w-full rounded-lg p-6">
                        <Text className="text-white text-xl font-bold mb-4">Create Playlist</Text>
                        <TextInput
                            className="text-white border-b border-green-500 mb-6 text-lg py-2"
                            placeholder="Playlist Name"
                            placeholderTextColor={AppColors.grey}
                            value={newPlaylistName}
                            onChangeText={setNewPlaylistName}
                            autoFocus
                        />
                        <View className="flex-row justify-end">
                            <TouchableOpacity onPress={() => setCreateModalVisible(false)} className="mr-6">
                                <Text className="text-white font-bold">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCreatePlaylist}>
                                <Text className="text-green-500 font-bold">Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};
