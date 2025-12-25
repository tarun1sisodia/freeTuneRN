import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../theme/app_colors';

interface BasicAppButtonProps {
    onPress: () => void;
    title: String;
    height?: number;
    width?: number; // Optional, defaults to auto/flex
    textSize?: number;
    weight?: 'normal' | 'bold' | '500';
}

export const BasicAppButton = ({
    onPress,
    title,
    height = 80,
    textSize = 22,
    weight = '500',
}: BasicAppButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ height: height }}
            className="w-full bg-[#42C83C] rounded-[30px] items-center justify-center"
        >
            <Text
                style={{ fontSize: textSize }}
                className="text-white font-medium"
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};
