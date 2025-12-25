import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { usePlayer } from '../hooks/usePlayer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { AppColors } from '../../../shared/theme/app_colors';

export const PlayerScreen = () => {
    const navigation = useNavigation();
    const { currentTrack, isPlaying, position, duration, pause, resume, skipToNext, skipToPrevious, seekTo } = usePlayer();

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (!currentTrack) {
        return (
            <View className="flex-1 bg-black items-center justify-center">
                <Text className="text-white">No Track Playing</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-black px-6 pt-10 pb-8">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-10">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-down" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-xs tracking-widest">NOW PLAYING</Text>
                <TouchableOpacity>
                    <Icon name="ellipsis-horizontal" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Artwork */}
            <View className="items-center mb-10">
                <View className="w-80 h-80 rounded-lg bg-gray-800 shadow-lg shadow-black/50 overflow-hidden">
                    <Image
                        source={{ uri: currentTrack.artwork || 'https://via.placeholder.com/300' }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>
            </View>

            {/* Info */}
            <View className="mb-8">
                <View className="flex-row justify-between items-center">
                    <View className="flex-1 mr-4">
                        <Text className="text-white text-2xl font-bold mb-1" numberOfLines={1}>
                            {currentTrack.title}
                        </Text>
                        <Text className="text-gray-400 text-lg" numberOfLines={1}>
                            {currentTrack.artist}
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Icon name="heart-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Progress */}
            <View className="mb-6">
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    onSlidingComplete={seekTo}
                    minimumTrackTintColor={AppColors.primary}
                    maximumTrackTintColor="#555"
                    thumbTintColor="white"
                />
                <View className="flex-row justify-between px-2">
                    <Text className="text-xs text-gray-400">{formatTime(position)}</Text>
                    <Text className="text-xs text-gray-400">{formatTime(duration)}</Text>
                </View>
            </View>

            {/* Controls */}
            <View className="flex-row justify-between items-center px-4">
                <TouchableOpacity>
                    <Icon name="shuffle" size={24} color={AppColors.grey} />
                </TouchableOpacity>

                <TouchableOpacity onPress={skipToPrevious}>
                    <Icon name="play-skip-back" size={36} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={isPlaying ? pause : resume}
                    className="w-16 h-16 bg-white rounded-full items-center justify-center"
                >
                    <Icon name={isPlaying ? "pause" : "play"} size={36} color="black" style={{ marginLeft: isPlaying ? 0 : 4 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={skipToNext}>
                    <Icon name="play-skip-forward" size={36} color="white" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="repeat" size={24} color={AppColors.grey} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
