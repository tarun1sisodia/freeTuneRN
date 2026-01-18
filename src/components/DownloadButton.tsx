import React, { useState } from 'react';
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DownloadManager } from '../services/download/DownloadManager';
import { AppColors } from '../app/theme/app_colors';

interface DownloadButtonProps {
    song: any;
    size?: number;
    color?: string;
}

export const DownloadButton = ({ song, size = 24, color = AppColors.grey }: DownloadButtonProps) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        const path = await DownloadManager.downloadSong(song);
        setIsDownloading(false);
        if (path) {
            // Optional: Update UI to show downloaded state (e.g. green check)
            // For now, Alert in Manager handles success feedback
        }
    };

    if (isDownloading) {
        return <ActivityIndicator size="small" color={AppColors.primary} />;
    }

    return (
        <TouchableOpacity onPress={handleDownload}>
            <Icon name="file-download" size={size} color={color} />
        </TouchableOpacity>
    );
};
