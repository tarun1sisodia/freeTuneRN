import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/Ionicons';

import { useAuthStore } from '../../auth/store';
import { usePlayer } from '../hooks/usePlayer';
import { RecentlyPlayedCard } from '../../../shared/components/RecentlyPlayedCard';
import { SongsApi } from '../../../shared/api/songs';
import { API_CONFIG } from '../../../shared/constants/config';

export const HomeScreen = () => {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const { playTrack } = usePlayer();
    const navigation = useNavigation();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const { data: recentSongs, isLoading: isLoadingRecent } = useQuery({
        queryKey: ['songs', 'recent'],
        queryFn: SongsApi.getRecent,
    });

    const { data: popularSongs, isLoading: isLoadingPopular } = useQuery({
        queryKey: ['songs', 'popular'],
        queryFn: SongsApi.getPopular,
    });

    const handlePlay = (song: any) => {
        const id = song.id || song.song_id || song._id; // Adapt to API response
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SONGS.STREAM(id)}`;

        const track = {
            id: id,
            url: url,
            title: song.title,
            artist: song.artist,
            artwork: song.album_art_url || song.artwork || 'https://via.placeholder.com/150',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        };

        playTrack(track);
    };

    const renderLoading = () => (
        <View className="h-40 items-center justify-center">
            <ActivityIndicator color="white" />
        </View>
    );

    return (
        <View className="flex-1 bg-black pb-20">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <View className="flex-row justify-between items-center px-4 pt-10 pb-5">
                    <View className="flex-1">
                        <Text className="text-white text-2xl font-bold">{getGreeting()}</Text>
                        {user?.username && <Text className="text-gray-400 text-lg">{user.username}</Text>}
                    </View>
                    <View className="flex-row space-x-4">
                        <TouchableOpacity><Icon name="notifications-outline" size={24} color="white" /></TouchableOpacity>
                        <TouchableOpacity className="ml-4"><Icon name="time-outline" size={24} color="white" /></TouchableOpacity>
                        <TouchableOpacity className="ml-4" onPress={() => navigation.navigate('Profile' as never)}>
                            <Icon name="settings-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recently Played */}
                <View className="px-4 mt-4">
                    <Text className="text-white text-xl font-bold mb-4">Recently played</Text>
                    {isLoadingRecent ? renderLoading() : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {recentSongs?.map((song: any) => (
                                <RecentlyPlayedCard
                                    key={song.id || song.song_id || Math.random().toString()}
                                    name={song.title}
                                    image={song.album_art_url || song.artwork}
                                    onPress={() => handlePlay(song)}
                                    borderRadius={5}
                                />
                            ))}
                            {(!recentSongs || recentSongs.length === 0) && (
                                <Text className="text-gray-500">No recently played songs.</Text>
                            )}
                        </ScrollView>
                    )}
                </View>

                {/* Made For You (Reusing Popular for now or separate endpoint if available) */}
                <View className="px-4 mt-8">
                    <Text className="text-white text-xl font-bold mb-4">Made For You</Text>
                    {isLoadingPopular ? renderLoading() : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {popularSongs?.slice(0, 5).map((song: any) => (
                                <RecentlyPlayedCard
                                    key={`mfy-${song.id || song.song_id || Math.random().toString()}`}
                                    name={song.artist}
                                    image={song.album_art_url || song.artwork}
                                    onPress={() => handlePlay(song)}
                                    borderRadius={50} // Circle
                                />
                            ))}
                            {(!popularSongs || popularSongs.length === 0) && (
                                <Text className="text-gray-500">No recommendations yet.</Text>
                            )}
                        </ScrollView>
                    )}
                </View>

                {/* Popular (Grid) */}
                <View className="px-4 mt-8">
                    <Text className="text-white text-xl font-bold mb-4">Popular</Text>
                    {isLoadingPopular ? renderLoading() : (
                        <View className="flex-row flex-wrap justify-between">
                            {popularSongs?.map((song: any, idx: number) => (
                                <TouchableOpacity
                                    key={`pop-${song.id || song.song_id || idx}`}
                                    className="w-[48%] bg-gray-900 rounded-md p-2 mb-4 flex-row items-center"
                                    onPress={() => handlePlay(song)}
                                >
                                    <Image
                                        source={{ uri: song.album_art_url || song.artwork || 'https://via.placeholder.com/50' }}
                                        className="w-12 h-12 rounded bg-gray-700"
                                    />
                                    <Text className="text-white font-medium ml-2 flex-1" numberOfLines={1}>{song.title}</Text>
                                </TouchableOpacity>
                            ))}
                            {(!popularSongs || popularSongs.length === 0) && (
                                <Text className="text-gray-500">No popular songs found.</Text>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};
