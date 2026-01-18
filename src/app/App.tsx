import "../global.css";
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { AuthStack } from './navigation/AuthStack';
import { MainStack } from './navigation/MainStack';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          {isAuthenticated ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
