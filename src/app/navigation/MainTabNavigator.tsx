import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../../features/home/screens/HomeScreen';
import { PlayerScreen } from '../../features/player/screens/PlayerScreen';
import { SearchScreen } from '../../features/search/screens/SearchScreen';
import { LibraryScreen } from '../../features/library/screens/LibraryScreen';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../../app/theme/app_colors';

const Tab = createBottomTabNavigator();

// Placeholder screens for now
const PlayerPlaceholder = () => (
    <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white">Player Screen (Use Modal)</Text>
    </View>
);

const SearchPlaceholder = () => (
    <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white">Search Screen</Text>
    </View>
);

const LibraryPlaceholder = () => (
    <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white">Library Screen</Text>
    </View>
);

export const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                tabBarActiveTintColor: AppColors.primary,
                tabBarInactiveTintColor: AppColors.grey,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Player"
                component={PlayerScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="play-circle" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="search" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="library" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};
