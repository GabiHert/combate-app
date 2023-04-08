import { Box, Button, Center, HStack, IconButton, Stack, Text } from 'native-base';
import React, { memo } from 'react';
import { config } from '../../../../internal/core/port/config-port';
import { appConfig } from '../../../../app/config/app-config';
import { Theme } from '../../../../app/theme/theme';

function PoisonAmountSelector(props: { onPresetPressed: (amount: number) => void }) {
  function onPreset1Pressed() {
    props.onPresetPressed(config.getCache().PRESETS.P1.DOSE_AMOUNT);
  }

  function onPreset2Pressed() {
    props.onPresetPressed(config.getCache().PRESETS.P2.DOSE_AMOUNT);
  }

  function onPreset3Pressed() {
    props.onPresetPressed(config.getCache().PRESETS.P3.DOSE_AMOUNT);
  }

  function onPreset4Pressed() {
    props.onPresetPressed(config.getCache().PRESETS.P4.DOSE_AMOUNT);
  }
  function onPreset5Pressed() {
    props.onPresetPressed(config.getCache().PRESETS.P5.DOSE_AMOUNT);
  }
  function onPreset6Pressed() {
    props.onPresetPressed(config.getCache().PRESETS.P6.DOSE_AMOUNT);
  }

  return (
    <Center>
      <HStack
        borderRadius={20}
        backgroundColor={Theme().color.b300}
        width="94%"
        alignItems={'center'}
        justifyContent={'center'}
        height="95%"
      >
        <Text
          style={{
            color: Theme().color.b500,
            fontSize: Theme().font.size.m(appConfig.screen),
            textAlign: 'center',
          }}
          position={'absolute'}
          top={1}
        >
          Presets
        </Text>
        <Stack
          direction={'column'}
          alignItems="center"
          justifyContent="center"
          height="85%"
          width="50%"
        >
          <Button
            onPress={onPreset1Pressed}
            marginBottom={5}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {config.getCache().PRESETS.P1.NAME}
          </Button>
          <Button
            onPress={onPreset2Pressed}
            marginBottom={5}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {config.getCache().PRESETS.P2.NAME}
          </Button>
          <Button
            onPress={onPreset3Pressed}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {config.getCache().PRESETS.P3.NAME}
          </Button>
        </Stack>

        <Stack
          direction={'column'}
          alignItems="center"
          justifyContent="center"
          height="85%"
          width="50%"
        >
          <Button
            onPress={onPreset4Pressed}
            marginBottom={5}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {config.getCache().PRESETS.P4.NAME}
          </Button>
          <Button
            onPress={onPreset5Pressed}
            marginBottom={5}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {config.getCache().PRESETS.P5.NAME}
          </Button>
          <Button
            onPress={onPreset6Pressed}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {config.getCache().PRESETS.P6.NAME}
          </Button>
        </Stack>
      </HStack>
    </Center>
  );
}

export default memo(PoisonAmountSelector);
