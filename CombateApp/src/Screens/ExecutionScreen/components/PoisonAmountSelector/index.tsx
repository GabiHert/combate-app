import { Box, Button, IconButton, Stack, Text } from 'native-base';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Config } from '../../../../app/config/config';
import { Theme } from '../../../../app/theme/theme';

function PoisonAmountSelector(props: {
  onDoseAmountChange: (amount: number) => void;
  doseAmount: number;
}) {
  const [doseAmount, setDoseAmount] = useState<number>(props.doseAmount);

  function onUpPressed() {
    if (doseAmount < Config().APPLICATION.MAX_DOSES) {
      setDoseAmount(doseAmount + 1);
    }
  }

  function onDownPressed() {
    if (doseAmount > Config().APPLICATION.MIN_DOSES) {
      setDoseAmount(doseAmount - 1);
    }
  }

  function onPreset1Pressed() {
    setDoseAmount(Config().PRESETS.P1);
  }

  function onPreset2Pressed() {
    setDoseAmount(Config().PRESETS.P2);
  }

  function onPreset3Pressed() {
    setDoseAmount(Config().PRESETS.P3);
  }

  function onPreset4Pressed() {
    setDoseAmount(Config().PRESETS.P4);
  }

  return (
    <Stack
      direction="row"
      width="100%"
      alignItems={'center'}
      justifyContent={'center'}
      height="100%"
    >
      <Box width="40%" height={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Stack
          direction="column"
          width="90%"
          height={'90%'}
          borderRadius={20}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={Theme().color.b300}
          marginLeft={2}
        >
          <Text fontSize={15} height={'20%'} marginBottom={1} color={'black'}>
            Doses
          </Text>
          <IconButton
            onPressOut={onUpPressed}
            width="100%"
            height={'5%'}
            bgColor={'transparent'}
            _pressed={{ opacity: 0.8 }}
            _icon={{ as: Icon, name: 'keyboard-arrow-up', size: 250, color: Theme().color.b200 }}
          />
          <Text fontSize={90} fontWeight="bold" color={'black'}>
            {doseAmount}
          </Text>
          <IconButton
            onPressOut={onDownPressed}
            width="100%"
            height={'20%'}
            bgColor={'transparent'}
            _pressed={{ opacity: 0.8 }}
            _icon={{ as: Icon, name: 'keyboard-arrow-down', size: 250, color: Theme().color.b200 }}
          />
        </Stack>
      </Box>

      <Box
        width="60%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        paddingRight={3}
        paddingLeft={5}
      >
        <Stack
          direction={'column'}
          alignItems="center"
          justifyContent="center"
          height="85%"
          width="100%"
          borderRadius={20}
          backgroundColor={Theme().color.b300}
        >
          <Text style={{ color: 'black', fontSize: 15, textAlign: 'center', marginBottom: 10 }}>
            Presets
          </Text>
          <Button
            onPressOut={onPreset1Pressed}
            marginBottom={5}
            bgColor={Theme().color.b200}
            width="90%"
            height={'15%'}
            _text={{ color: 'black' }}
            _pressed={{ opacity: 0.8 }}
          >
            TESTE
          </Button>
          <Button
            onPressOut={onPreset2Pressed}
            marginBottom={5}
            bgColor={Theme().color.b200}
            width="90%"
            height={'15%'}
            _text={{ color: 'black' }}
            _pressed={{ opacity: 0.8 }}
          >
            TESTE
          </Button>
          <Button
            onPressOut={onPreset3Pressed}
            marginBottom={5}
            bgColor={Theme().color.b200}
            width="90%"
            height={'15%'}
            _text={{ color: 'black' }}
            _pressed={{ opacity: 0.8 }}
          >
            TESTE
          </Button>
          <Button
            onPressOut={onPreset4Pressed}
            bgColor={Theme().color.b200}
            width="90%"
            height={'15%'}
            _text={{ color: 'black' }}
          >
            TESTE
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}

export default PoisonAmountSelector;
