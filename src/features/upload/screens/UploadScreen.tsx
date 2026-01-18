import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUpload } from '../hooks/useUpload';
import { AppColors } from '../../../app/theme/app_colors';
import { BasicAppBar } from '../../../components/BasicAppBar';
import { BasicAppButton } from '../../../components/BasicAppButton';

const InputField = ({
    value,
    onChangeText,
    placeholder,
    icon
}: {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    icon: string;
}) => (
    <View className="flex-row items-center border border-gray-600 rounded-full px-4 py-3 mb-4 bg-transparent focus:border-white">
        <Icon name={icon} size={24} color={AppColors.grey} />
        <TextInput
            className="flex-1 ml-3 text-white text-base"
            placeholder={placeholder}
            placeholderTextColor={AppColors.grey}
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

export const UploadScreen = () => {
    const { isUploading, selectedSong, selectedImage, pickSong, pickImage, upload } = useUpload();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');

    const handleUpload = () => {
        upload(title, artist, album);
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <BasicAppBar title="Upload Song" hideBack={false} />
            <ScrollView className="flex-1 px-5 pt-5">
                {/* Cover Image Selection */}
                <View className="items-center mb-8">
                    <TouchableOpacity
                        onPress={pickImage}
                        className={`w-44 h-44 rounded-2xl border-2 justify-center items-center bg-gray-900 ${selectedImage ? 'border-green-500' : 'border-gray-800'
                            }`}
                        style={{ overflow: 'hidden' }}
                    >
                        {selectedImage ? (
                            <Image source={{ uri: selectedImage.uri }} className="w-full h-full" resizeMode="cover" />
                        ) : (
                            <View className="items-center">
                                <Icon name="image" size={48} color={AppColors.grey} />
                                <Text className="text-gray-400 mt-2 text-sm">Add Cover Art</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Audio File Selection */}
                <TouchableOpacity
                    onPress={pickSong}
                    className={`flex-row items-center p-4 border-2 rounded-2xl mb-8 bg-gray-900 ${selectedSong ? 'border-green-500' : 'border-gray-800'
                        }`}
                >
                    <Icon
                        name={selectedSong ? 'audio-file' : 'cloud-upload'}
                        size={40}
                        color={selectedSong ? AppColors.primary : AppColors.grey}
                    />
                    <View className="flex-1 ml-4 justify-center">
                        <Text className={`text-base font-medium ${selectedSong ? 'text-white' : 'text-gray-400'}`} numberOfLines={1}>
                            {selectedSong ? selectedSong.name : 'Select Audio File'}
                        </Text>
                        {!selectedSong && <Text className="text-gray-600 text-xs mt-1">Tap to choose song</Text>}
                    </View>
                    {selectedSong && <Icon name="check-circle" size={24} color={AppColors.primary} />}
                </TouchableOpacity>

                {/* Form Fields */}
                <InputField
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Song Title"
                    icon="music-note"
                />
                <InputField
                    value={artist}
                    onChangeText={setArtist}
                    placeholder="Artist Name"
                    icon="person"
                />
                <InputField
                    value={album}
                    onChangeText={setAlbum}
                    placeholder="Album Name (Optional)"
                    icon="album"
                />

                <View className="mt-8 mb-10">
                    <BasicAppButton
                        title={isUploading ? 'Uploading...' : 'Upload'}
                        onPress={isUploading ? () => { } : handleUpload}
                    // Loading state could be inside the button if it supports it
                    />
                    {isUploading && (
                        <View className="absolute inset-0 justify-center items-center bg-black/50 rounded-full">
                            <ActivityIndicator color={AppColors.primary} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
