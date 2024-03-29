import { Box, Button, IconButton, Image, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CONSTANTS } from '../../../src/internal/config/config';
import { appConfig } from '../../app/config/app-config';
import { Instance } from '../../app/instance/instance';
import { Theme } from '../../app/theme/theme';
import LoginModal from '../../Components/LoginModal';
const backgroundImage = require('../../app/assets/homebackground.png');
const combate = require('../../app/assets/COMBATE.png');

function HomeScreen(props: { navigation: any; route: any }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  function onStartButtonPressed() {
    props.navigation.navigate('PreExecutionScreen');
  }

  function onSettingsButtonPressed() {
    setIsLoginOpen(true);
  }

  useEffect(() => {
    const execute = async () => {
      try {
        await Instance.GetInstance().combateApp.permissions();
      } catch (err) {
        await Instance.GetInstance().errorHandler.handle(err);
      }
    };
    execute();
  }, []);

  function loginValidator(loginProps: { user: string; password: string }): boolean {
    let valid = true;
    if(loginProps.user != CONSTANTS.CONFIG_LOGIN.USER ||  loginProps.password != CONSTANTS.CONFIG_LOGIN.PASSWORD){
      valid = false;
    }

    if (valid) {
      props.navigation.navigate('ConfigScreen');
    }
    return valid;
  }
  return (
    <SafeAreaView>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={{ alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center' }}
      >
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
          <Image
            resizeMode="contain"
            alt="Combate logo"
            source={combate}
            style={{ width: 150, height: 42, position: 'absolute', top: -20, left: 10 }}
          />

          <Button
            _pressed={{ opacity: 0.8 }}
            bgColor={Theme().color.b200}
            _text={{
              color: 'black',
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
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
