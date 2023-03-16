import { Box, Button, IconButton, Text } from 'native-base';
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CONSTANTS } from '../../api/config/config';
import { AConfig } from '../../api/core/adapter/config';
import { Theme } from '../../app/theme/theme';
import LoginModal from '../../Components/LoginModal';
import style from './style';
const image = require('../../app/assets/homebackground.png');

function HomeScreen(props: { navigation: any; route: any }) {
  const config: AConfig = props.route.params.config;
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  function onStartButtonPressed() {
    props.navigation.navigate('PreExecutionScreen');
  }

  function onSettingsButtonPressed() {
    setIsLoginOpen(true);
  }

  function loginValidator(loginProps: { user: string; password: string }): boolean {
    const valid = true;
    if (valid) {
      props.navigation.navigate('ConfigScreen');
    }
    return valid;
  }
  return (
    <SafeAreaView>
      <ImageBackground resizeMode="cover" source={image} style={style.container}>
        <LoginModal
          onClose={() => {
            setIsLoginOpen(false);
          }}
          isOpen={isLoginOpen}
          loginValidator={loginValidator}
        />
        <IconButton
          style={{ alignSelf: 'flex-end' }}
          _icon={{ as: Icon, name: 'settings', size: 30, color: 'white' }}
          _pressed={{ opacity: 0.8 }}
          onPress={() => {
            onSettingsButtonPressed();
          }}
          background="transparent"
        ></IconButton>

        <Box width={'100%'} height={'90%'} justifyContent="center" alignItems="center">
          <Button
            _pressed={{ opacity: 0.8 }}
            bgColor={Theme().color.b200}
            _text={{ color: 'black', fontSize: 25 }}
            onPress={() => {
              onStartButtonPressed();
            }}
            width="40%"
            height="15%"
            borderRadius={50}
          >
            Iniciar
          </Button>
        </Box>

        <Box width={'100%'} height={'5%'} justifyContent="center" alignItems="center">
          <Text color="white" fontSize={20}>
            {CONSTANTS.APPLICATION.VERSION}
          </Text>
        </Box>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default HomeScreen;
