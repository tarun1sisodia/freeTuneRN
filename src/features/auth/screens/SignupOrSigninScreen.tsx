import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BasicAppButton } from '../../../components/BasicAppButton';
import { BasicAppBar } from '../../../components/BasicAppBar';
// import { AppImages } from '../../../assets/images'; // Placeholder

export const SignupOrSigninScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <View className="flex-1 bg-black">
            <BasicAppBar hideBack />

            {/* Background Decor (Corner Gradients Placeholder) */}
            <View className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-[100px]" />
            <View className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-tl-[100px]" />

            <View className="flex-1 items-center justify-center px-8">
                {/* Logo Placeholder */}
                <View className="w-20 h-20 bg-green-500 rounded-full mb-12 items-center justify-center">
                    <Text className="text-black font-bold text-xl">FT</Text>
                </View>

                <Text className="text-white font-bold text-3xl text-center mb-5">
                    Enjoy Listening To Music
                </Text>

                <Text className="text-gray-400 text-lg text-center mb-10">
                    FreeTune is a proprietary audio streaming and media services provider
                </Text>

                <View className="flex-row w-full items-center justify-between mt-8">
                    <View className="flex-1 mr-4">
                        <BasicAppButton
                            title="Register"
                            onPress={() => navigation.navigate('Register')}
                        />
                    </View>

                    <View className="flex-1 ml-4 justify-center items-center">
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            className="text-white text-xl font-medium"
                        >
                            Sign In
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
