import { Box, Button, IconButton, Stack, Text } from 'native-base';
import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Config } from '../../../../app/config/config';
import { Theme } from '../../../../app/theme/theme';

function PoisonAmountSelector(props: {
  onDoseAmountChange: (amount: number) => void;
  onPresetPressed: (amount: number) => void;
  doseAmount: number;
}) {
  const [doseAmount, setDoseAmount] = useState<number>(props.doseAmount);
  const onDoseAmountChangeCallback = useCallback(
    (amount: number) => {
      props.onDoseAmountChange(amount);
    },
    [doseAmount]
  );

  const onUpPressed = useCallback(() => {
    if (doseAmount < Config().APPLICATION.MAX_DOSES) {
      setDoseAmount(doseAmount + 1);
      onDoseAmountChangeCallback(doseAmount + 1);
    }
  }, [doseAmount, setDoseAmount]);

  const onDownPressed = useCallback(() => {
    if (doseAmount > Config().APPLICATION.MIN_DOSES) {
      setDoseAmount(doseAmount - 1);
      onDoseAmountChangeCallback(doseAmount - 1);
    }
  }, [doseAmount, setDoseAmount]);

  const onPreset1Pressed = useCallback(() => {
    setDoseAmount(Config().PRESETS.P1);
    onDoseAmountChangeCallback(Config().PRESETS.P1);
    props.onPresetPressed(Config().PRESETS.P1);
  }, []);

  function onPreset2Pressed() {
    setDoseAmount(Config().PRESETS.P2);
    onDoseAmountChangeCallback(Config().PRESETS.P1);
    props.onPresetPressed(Config().PRESETS.P2);
  }

  function onPreset3Pressed() {
    setDoseAmount(Config().PRESETS.P3);
    onDoseAmountChangeCallback(Config().PRESETS.P3);
    props.onPresetPressed(Config().PRESETS.P3);
  }

  function onPreset4Pressed() {
    setDoseAmount(Config().PRESETS.P4);
    onDoseAmountChangeCallback(Config().PRESETS.P4);
    props.onPresetPressed(Config().PRESETS.P4);
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
            onPress={onUpPressed}
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
            onPress={onDownPressed}
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
            onPress={onPreset1Pressed}
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
            onPress={onPreset2Pressed}
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
            onPress={onPreset3Pressed}
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
            onPress={onPreset4Pressed}
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
