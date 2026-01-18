import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface RecentlyPlayedCardProps {
    name: string;
    image: string;
    onPress: () => void;
    borderRadius?: number;
}

export const RecentlyPlayedCard = ({ name, image, onPress, borderRadius = 5 }: RecentlyPlayedCardProps) => {
    return (
        <TouchableOpacity onPress={onPress} className="mr-4 w-28 space-y-2">
            <View
                className="w-28 h-28 bg-gray-800"
                style={{ borderRadius: borderRadius }}
            >
                <Image
                    source={{ uri: image }}
                    className="w-full h-full"
                    style={{ borderRadius: borderRadius }}
                    resizeMode="cover"
                />
            </View>
            <Text
                numberOfLines={2}
                className="text-white font-medium text-xs text-center mt-1"
            >
                {name}
            </Text>
        </TouchableOpacity>
    );
};
