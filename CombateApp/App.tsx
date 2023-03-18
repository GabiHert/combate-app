import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { AAsyncStorage } from './src/api/core/adapter/async-storage-adapter';
import { PRepository } from './src/api/core/port/repository-port';
import { AConfig } from './src/api/core/adapter/config';
import ConfigScreen from './src/Screens/ConfigScreen';
import ExecutionScreen from './src/Screens/ExecutionScreen';
import HomeScreen from './src/Screens/HomeScreen';
import PreExecutionScreen from './src/Screens/PreExecutionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ExecutionScreen" component={ExecutionScreen} />
          <Stack.Screen name="ConfigScreen" component={ConfigScreen} />
          <Stack.Screen name="PreExecutionScreen" component={PreExecutionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
