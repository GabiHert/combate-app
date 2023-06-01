import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import 'react-native-get-random-values';
import { appConfig } from './src/app/config/app-config';
import ConfigScreen from './src/Screens/ConfigScreen';
import ExecutionScreen from './src/Screens/ExecutionScreen';
import HomeScreen from './src/Screens/HomeScreen';
import PreExecutionScreen from './src/Screens/PreExecutionScreen';

const Stack = createNativeStackNavigator();

//Instance.GetInstance().configCache.update(DEFAULT_CONFIG);
//Instance.GetInstance().preExecutionConfigCache.update(DEFAULT_PRE_EXECUTION_CONFIG);
export default function App() {
  appConfig.screen = {
    ...useWindowDimensions(),
  };
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
