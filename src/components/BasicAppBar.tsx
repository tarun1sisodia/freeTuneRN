import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BasicAppBarProps {
    title?: React.ReactNode;
    hideBack?: boolean;
    action?: React.ReactNode;
    backgroundColor?: string;
}

export const BasicAppBar = ({
    title,
    hideBack = false,
    action,
    backgroundColor = 'transparent',
}: BasicAppBarProps) => {
    const navigation = useNavigation();

    return (
        <View
            className="flex-row items-center justify-between px-4 py-3 h-[60px]"
            style={{ backgroundColor }}
        >
            {hideBack ? (
                <View className="w-10" />
            ) : (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 items-center justify-center bg-white/10 rounded-full"
                >
                    <Icon name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
            )}

            <View className="flex-1 items-center justify-center">
                {title ? title : null}
            </View>

            <View className="w-10 items-end justify-center">
                {action ? action : null}
            </View>
        </View>
    );
};
