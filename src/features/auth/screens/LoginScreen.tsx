import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BasicAppBar } from '../../../components/BasicAppBar';
import { BasicAppButton } from '../../../components/BasicAppButton';
import { useAuth } from '../hooks/useAuth';

export const LoginScreen = () => {
    const navigation = useNavigation<any>();
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const success = await login(email, password);
        // Note: Navigation to 'Home' happens automatically via AuthStack logic in App.tsx typically
        // but for now we rely on state change.
    };

    return (
        <View className="flex-1 bg-black px-6">
            <BasicAppBar
                title={<ImagePlaceholder />}
                hideBack={false}
            />

            <View className="mt-12 space-y-8">
                <Text className="text-white text-3xl font-bold text-center">Sign In</Text>

                <View className="mt-8 space-y-4">
                    <TextInput
                        className="bg-transparent border border-gray-600 rounded-[30px] px-6 py-4 text-white text-lg"
                        placeholder="Enter Username Or Email"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />

                    <TextInput
                        className="bg-transparent border border-gray-600 rounded-[30px] px-6 py-4 text-white text-lg"
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity className="items-start">
                    <Text className="text-gray-400 text-base">Forgot Password?</Text>
                </TouchableOpacity>

                <View className="mt-8">
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#42C83C" />
                    ) : (
                        <BasicAppButton title="Sign in" onPress={handleLogin} />
                    )}
                </View>

                <View className="flex-row justify-center mt-10">
                    <Text className="text-white text-base">Not A Member? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text className="text-blue-500 text-base font-bold">Register Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const ImagePlaceholder = () => (
    <View className="w-10 h-10 bg-green-500 rounded-full items-center justify-center">
        <Text className="font-bold">FT</Text>
    </View>
);
