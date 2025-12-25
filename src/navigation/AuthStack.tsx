import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignupOrSigninScreen } from '../features/auth/screens/SignupOrSigninScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'black' }
            }}
        >
            <Stack.Screen name="SignupOrSignin" component={SignupOrSigninScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};
