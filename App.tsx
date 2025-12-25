import "./src/global.css";
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import { useAuthStore } from './src/features/auth/store';
import { AuthStack } from './src/navigation/AuthStack';
import { MainStack } from './src/navigation/MainStack';

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
