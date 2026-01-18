import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BasicAppBar } from '../../../components/BasicAppBar';
import { BasicAppButton } from '../../../components/BasicAppButton';
import { useAuth } from '../hooks/useAuth';

export const RegisterScreen = () => {
    const navigation = useNavigation<any>();
    const { register, isLoading } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const success = await register(email, password, name);
        if (success) {
            // If auto-login is not enabled in hook, navigate to Login
            // navigation.navigate('Login');
        }
    };

    return (
        <View className="flex-1 bg-black px-6">
            <BasicAppBar
                title={<ImagePlaceholder />}
                hideBack={false}
            />

            <View className="mt-12 space-y-8">
                <Text className="text-white text-3xl font-bold text-center">Register</Text>

                <View className="mt-8 space-y-4">
                    <TextInput
                        className="bg-transparent border border-gray-600 rounded-[30px] px-6 py-4 text-white text-lg"
                        placeholder="Full Name"
                        placeholderTextColor="#888"
                        value={name}
                        onChangeText={setName}
                    />

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

                <View className="mt-8">
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#42C83C" />
                    ) : (
                        <BasicAppButton title="Create Account" onPress={handleRegister} />
                    )}
                </View>

                <View className="flex-row justify-center mt-10">
                    <Text className="text-white text-base">Do You Have An Account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="text-blue-500 text-base font-bold">Sign In</Text>
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
