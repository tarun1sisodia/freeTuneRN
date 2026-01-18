import { useState } from 'react';
import { Alert } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { SongsApi } from '../../../services/api/songs';
import { useNavigation } from '@react-navigation/native';

export const useUpload = () => {
    const navigation = useNavigation();
    const [isUploading, setIsUploading] = useState(false);
    const [selectedSong, setSelectedSong] = useState<DocumentPickerResponse | null>(null);
    const [selectedImage, setSelectedImage] = useState<DocumentPickerResponse | null>(null);

    const pickSong = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.audio],
            });
            setSelectedSong(res);
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                console.error('Error picking song', err);
                Alert.alert('Error', 'Failed to pick song file');
            }
        }
    };

    const pickImage = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            });
            setSelectedImage(res);
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                console.error('Error picking image', err);
                Alert.alert('Error', 'Failed to pick image');
            }
        }
    };

    const upload = async (title: string, artist: string, album: string) => {
        if (!selectedSong) {
            Alert.alert('Error', 'Please select a song file');
            return;
        }
        if (!title.trim() || !artist.trim()) {
            Alert.alert('Error', 'Please enter title and artist');
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('artist', artist);
            formData.append('album', album);

            // Append song file
            formData.append('audio', {
                uri: selectedSong.uri,
                type: selectedSong.type,
                name: selectedSong.name,
            } as any);

            // Append image file if selected
            if (selectedImage) {
                formData.append('image', {
                    uri: selectedImage.uri,
                    type: selectedImage.type,
                    name: selectedImage.name,
                } as any);
            }

            await SongsApi.upload(formData);
            Alert.alert('Success', 'Song uploaded successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Upload failed', error);
            Alert.alert('Error', 'Failed to upload song');
        } finally {
            setIsUploading(false);
        }
    };

    return {
        isUploading,
        selectedSong,
        selectedImage,
        pickSong,
        pickImage,
        upload
    };
};
