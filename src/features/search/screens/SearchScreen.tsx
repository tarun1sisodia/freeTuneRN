import React from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSearch } from '../hooks/useSearch';
import { usePlayerStore } from '../../../store/usePlayerStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { AppColors } from '../../../app/theme/app_colors';
import { useNavigation } from '@react-navigation/native';
import { API_CONFIG } from '../../../utils/constants/config';

const BrowseCategory = ({ title, color }: { title: string; color: string }) => (
    <View
        className="h-24 w-[48%] rounded-md mb-4 p-3 relative overflow-hidden"
        style={{ backgroundColor: color }}
    >
        <Text className="text-white font-bold text-lg">{title}</Text>
        {/* Decorative circle */}
        <View className="absolute -right-3 -bottom-2 w-16 h-16 rounded-full bg-white opacity-20 transform rotate-12" />
    </View>
);

const SongListItem = ({ song, onPress }: { song: any; onPress: (song: any) => void }) => {
    return (
        <TouchableOpacity
            className="flex-row items-center p-3"
            onPress={() => onPress(song)}
        >
            <Image
                source={{ uri: song.album_art_url || 'https://via.placeholder.com/50' }}
                className="w-12 h-12 rounded bg-gray-700"
            />
            <View className="ml-3 flex-1">
                <Text className="text-white font-bold text-base" numberOfLines={1}>
                    {song.title}
                </Text>
                <Text className="text-gray-400 text-sm" numberOfLines={1}>
                    {song.artist}
                </Text>
            </View>
            <Icon name="more-vert" size={24} color="#9ca3af" />
        </TouchableOpacity>
    );
};

export const SearchScreen = () => {
    const { query, searchResults, isLoading, setQuery } = useSearch();
    const { playTrack } = usePlayerStore();
    const token = useAuthStore((state) => state.token);
    // const navigation = useNavigation(); // If we need to navigate explicity

    const handleSongPress = async (song: any) => {
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
        // Optionally navigate to Player? The global player usually stays visible or opens up.
    };

    const renderBrowseAll = () => (
        <ScrollView className="flex-1 px-4 pt-4">
            <Text className="text-white font-bold text-xl mb-4">Browse all</Text>
            <View className="flex-row flex-wrap justify-between">
                <BrowseCategory title="Pop" color="#EF4444" />
                <BrowseCategory title="Rock" color="#F97316" />
                <BrowseCategory title="Hip Hop" color="#EAB308" />
                <BrowseCategory title="Jazz" color="#22C55E" />
                <BrowseCategory title="Electronic" color="#3B82F6" />
                <BrowseCategory title="Classical" color="#A855F7" />
            </View>
        </ScrollView>
    );

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="p-4" style={{ backgroundColor: AppColors.darkBackground }}>
                <Text className="text-white font-bold text-3xl mb-4">Search</Text>
                <View className="flex-row items-center bg-white rounded-lg px-3 py-2 h-12">
                    <Icon name="search" size={24} color={AppColors.darkBackground} />
                    <TextInput
                        className="flex-1 ml-2 text-black text-base"
                        placeholder="What do you want to listen to?"
                        placeholderTextColor={AppColors.grey}
                        value={query}
                        onChangeText={setQuery}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery('')}>
                            <Icon name="close" size={20} color={AppColors.darkBackground} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color={AppColors.primary} />
                </View>
            ) : query.length > 0 ? (
                searchResults.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-gray-400 text-lg">No songs found</Text>
                    </View>
                ) : (
                    <FlatList
                        data={searchResults}
                        renderItem={({ item }) => <SongListItem song={item} onPress={handleSongPress} />}
                        keyExtractor={(item, index) => item.song_id || item.id || index.toString()}
                        contentContainerStyle={{ paddingBottom: 100 }} // Space for mini player
                    />
                )
            ) : (
                renderBrowseAll()
            )}
        </SafeAreaView>
    );
};
