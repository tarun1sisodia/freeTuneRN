import { useAuthStore } from '../../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export const useProfile = () => {
    const { user, logout } = useAuthStore();
    const navigation = useNavigation();

    // Mock stats for now
    const stats = {
        played: 0,
        favorites: 0,
        playlists: 0,
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        // Navigation reset is handled by App.tsx observing useAuthStore
                    }
                }
            ]
        );
    };

    const clearCache = () => {
        Alert.alert('Clear Cache', 'Cache cleared successfully.');
    };

    return {
        user,
        stats,
        handleLogout,
        clearCache
    };
};
