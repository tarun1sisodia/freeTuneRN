import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useProfile } from '../hooks/useProfile';
import { AppColors } from '../../../shared/theme/app_colors';
import { BasicAppBar } from '../../../shared/components/BasicAppBar';

const StatItem = ({ label, value }: { label: string; value: string | number }) => (
    <View className="items-center">
        <Text className="text-white font-bold text-xl">{value}</Text>
        <Text className="text-gray-400 text-xs mt-1">{label}</Text>
    </View>
);

const SectionHeader = ({ title }: { title: string }) => (
    <Text className="text-white font-bold text-lg px-4 mb-3 mt-6">{title}</Text>
);

const BasicListTile = ({
    icon,
    title,
    subtitle,
    onTap,
    trailing,
    iconColor = AppColors.white
}: {
    icon: string;
    title: string;
    subtitle?: string;
    onTap?: () => void;
    trailing?: React.ReactNode;
    iconColor?: string;
}) => (
    <TouchableOpacity
        onPress={onTap}
        disabled={!onTap}
        className="flex-row items-center px-4 py-3 active:bg-gray-900"
    >
        <Icon name={icon} size={24} color={iconColor} />
        <View className="ml-4 flex-1">
            <Text className="text-white text-base">{title}</Text>
            {subtitle && <Text className="text-gray-400 text-xs mt-0.5">{subtitle}</Text>}
        </View>
        {trailing}
    </TouchableOpacity>
);

export const ProfileScreen = () => {
    const { user, stats, handleLogout, clearCache } = useProfile();

    return (
        <SafeAreaView className="flex-1 bg-black">
            <BasicAppBar title="Profile" hideBack={false} />
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="items-center py-6">
                    <View className="w-24 h-24 rounded-full bg-gray-800 items-center justify-center mb-4 overflow-hidden border-2 border-green-500">
                        {user?.avatarUrl ? (
                            <Image source={{ uri: user.avatarUrl }} className="w-full h-full" />
                        ) : (
                            <Text className="text-white text-3xl font-bold">
                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </Text>
                        )}
                    </View>
                    <Text className="text-white font-bold text-2xl">{user?.username || 'User'}</Text>
                    <Text className="text-gray-400 text-sm mt-1">{user?.email}</Text>
                </View>

                {/* Stats */}
                <View className="flex-row justify-around py-4 border-b border-gray-800">
                    <StatItem label="Played" value={stats.played} />
                    <View className="w-[1px] h-8 bg-gray-800" />
                    <StatItem label="Favorites" value={stats.favorites} />
                    <View className="w-[1px] h-8 bg-gray-800" />
                    <StatItem label="Playlists" value={stats.playlists} />
                </View>

                {/* Settings */}
                <SectionHeader title="Settings" />
                <BasicListTile
                    icon="high-quality"
                    title="Audio Quality"
                    subtitle="High (320 kbps)"
                    onTap={() => { }}
                />
                <BasicListTile
                    icon="palette"
                    title="Theme"
                    subtitle="Dark"
                    onTap={() => { }}
                />
                <BasicListTile
                    icon="notifications"
                    title="Notifications"
                    subtitle="Enabled"
                    trailing={<Switch value={true} trackColor={{ true: AppColors.primary }} thumbColor="white" />}
                />

                {/* Creator */}
                <SectionHeader title="Creator" />
                <BasicListTile
                    icon="upload-file"
                    title="Upload Song"
                    iconColor={AppColors.primary}
                    onTap={() => { /* Navigate to Upload */ }}
                />

                {/* Account */}
                <SectionHeader title="Account" />
                <BasicListTile
                    icon="lock-outline"
                    title="Change Password"
                    onTap={() => { }}
                />
                <BasicListTile
                    icon="delete-sweep"
                    title="Clear Cache"
                    subtitle="Free up space"
                    onTap={clearCache}
                />

                {/* Logout */}
                <View className="p-4 mt-8 pb-10">
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="border border-white rounded-full py-4 items-center"
                    >
                        <Text className="text-white font-bold tracking-widest text-base">LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
