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
import { IConfigsProps } from './src/api/interface/config-props';

const Stack = createNativeStackNavigator();

const repository: PRepository = new AAsyncStorage();
const initialConfig: IConfigsProps = {
  APPLICATION: {
    TOTAL_LOAD_KG: 0,
    VERSION: '',
    MAX_DOSES: 0,
    MIN_DOSES: 0,
    DOSE_WEIGHT_KG: 0,
    REQUEST_INTERVAL_MS: 0,
  },
  PRESETS: {
    P1: 0,
    P2: 0,
    P3: 0,
    P4: 0,
  },
};
const config = new AConfig(repository, initialConfig);
export default class App extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              initialParams={{ config, repository }}
            />
            <Stack.Screen
              name="ExecutionScreen"
              component={ExecutionScreen}
              initialParams={{ config, repository }}
            />
            <Stack.Screen
              name="ConfigScreen"
              component={ConfigScreen}
              initialParams={{ config, repository }}
            />
            <Stack.Screen
              name="PreExecutionScreen"
              component={PreExecutionScreen}
              initialParams={{ config, repository }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
}
