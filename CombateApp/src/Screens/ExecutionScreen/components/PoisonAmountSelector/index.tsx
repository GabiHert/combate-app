import { Box, Button, IconButton, Stack, Text } from 'native-base';
import React, { useCallback, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AConfig } from '../../../../api/core/adapter/config';
import { Theme } from '../../../../app/theme/theme';

function PoisonAmountSelector(props: {
  config: AConfig;
  onDoseAmountChange: (amount: number) => void;
  onPresetPressed: (amount: number) => void;
  doseAmount: number;
  w: number;
}) {
  function getIconSize(width: number): number {
    return width >= 400 ? 300 : 230;
  }
  const [doseAmount, setDoseAmount] = useState<number>(props.doseAmount);
  const onDoseAmountChangeCallback = useCallback(
    (amount: number) => {
      props.onDoseAmountChange(amount);
    },
    [doseAmount]
  );
  const onUpPressed = useCallback(() => {
    if (doseAmount < props.config.getCache().APPLICATION.MAX_DOSES) {
      setDoseAmount(doseAmount + 1);
      onDoseAmountChangeCallback(doseAmount + 1);
    }
  }, [doseAmount, setDoseAmount]);

  const onDownPressed = useCallback(() => {
    if (doseAmount > props.config.getCache().APPLICATION.MIN_DOSES) {
      setDoseAmount(doseAmount - 1);
      onDoseAmountChangeCallback(doseAmount - 1);
    }
  }, [doseAmount, setDoseAmount]);

  function onPreset1Pressed() {
    setDoseAmount(props.config.getCache().PRESETS.P1.DOSE_AMOUNT);
    onDoseAmountChangeCallback(props.config.getCache().PRESETS.P1.DOSE_AMOUNT);
    props.onPresetPressed(props.config.getCache().PRESETS.P1.DOSE_AMOUNT);
  }

  function onPreset2Pressed() {
    setDoseAmount(props.config.getCache().PRESETS.P2.DOSE_AMOUNT);
    onDoseAmountChangeCallback(props.config.getCache().PRESETS.P2.DOSE_AMOUNT);
    props.onPresetPressed(props.config.getCache().PRESETS.P2.DOSE_AMOUNT);
  }

  function onPreset3Pressed() {
    setDoseAmount(props.config.getCache().PRESETS.P3.DOSE_AMOUNT);
    onDoseAmountChangeCallback(props.config.getCache().PRESETS.P3.DOSE_AMOUNT);
    props.onPresetPressed(props.config.getCache().PRESETS.P3.DOSE_AMOUNT);
  }

  function onPreset4Pressed() {
    setDoseAmount(props.config.getCache().PRESETS.P4.DOSE_AMOUNT);
    onDoseAmountChangeCallback(props.config.getCache().PRESETS.P4.DOSE_AMOUNT);
    props.onPresetPressed(props.config.getCache().PRESETS.P4.DOSE_AMOUNT);
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
          <Text fontSize={15} top={1} position={'absolute'} marginBottom={1} color={'black'}>
            Doses
          </Text>
          <IconButton
            onPress={onUpPressed}
            width="100%"
            height={'3%'}
            mt={5}
            bgColor={'transparent'}
            _pressed={{ opacity: 0.8 }}
            _icon={{
              as: Icon,
              name: 'keyboard-arrow-up',
              size: getIconSize(props.w),
              color: Theme().color.b200,
            }}
          />
          <Text fontSize={90} mt={2} mb={2} fontWeight="bold" color={'black'}>
            {doseAmount}
          </Text>
          <IconButton
            onPress={onDownPressed}
            width="100%"
            height={'3%'}
            bgColor={'transparent'}
            _pressed={{ opacity: 0.8 }}
            _icon={{
              as: Icon,
              name: 'keyboard-arrow-down',
              size: getIconSize(props.w),
              color: Theme().color.b200,
            }}
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
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              textAlign: 'center',
            }}
            position={'absolute'}
            top={1}
          >
            Presets
          </Text>
          <Button
            onPress={onPreset1Pressed}
            marginBottom={5}
            mt={4}
            bgColor={Theme().color.b200}
            width="90%"
            height={'15%'}
            _text={{ color: 'black' }}
            _pressed={{ opacity: 0.8 }}
          >
            {props.config.getCache().PRESETS.P1.NAME}
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
            {props.config.getCache().PRESETS.P2.NAME}
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
            {props.config.getCache().PRESETS.P3.NAME}
          </Button>
          <Button
            onPress={onPreset4Pressed}
            bgColor={Theme().color.b200}
            width="90%"
            height={'15%'}
            _text={{ color: 'black' }}
          >
            {props.config.getCache().PRESETS.P4.NAME}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}

export default PoisonAmountSelector;
