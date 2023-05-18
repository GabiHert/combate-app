import { Button, Center, HStack, Stack, Text } from 'native-base';
import React, { memo, useCallback, useState } from 'react';
import { appConfig } from '../../../../app/config/app-config';
import { Instance } from '../../../../app/instance/instance';
import { Theme } from '../../../../app/theme/theme';

function PoisonAmountSelector(props: { onPresetPressed: (amount: number) => Promise<void> }) {
  function resetButtons() {
    setLoadingButtons({
      P1: false,
      P2: false,
      P3: false,
      P4: false,
      P5: false,
      P6: false,
    });
    setEnabledButtons({
      P1: false,
      P2: false,
      P3: false,
      P4: false,
      P5: false,
      P6: false,
    });
  }

  const onPreset1Pressed = useCallback(async () => {
    try {
      setEnabledButtons({
        P1: true,
        P2: false,
        P3: false,
        P4: false,
        P5: false,
        P6: false,
      });
      setLoadingButtons({
        P1: true,
        P2: false,
        P3: false,
        P4: false,
        P5: false,
        P6: false,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P1.DOSE_AMOUNT
      );

      resetButtons();
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, []);

  const onPreset2Pressed = useCallback(async () => {
    try {
      setEnabledButtons({
        P1: false,
        P2: true,
        P3: false,
        P4: false,
        P5: false,
        P6: false,
      });
      setLoadingButtons({
        P1: false,
        P2: true,
        P3: false,
        P4: false,
        P5: false,
        P6: false,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P2.DOSE_AMOUNT
      );

      resetButtons();
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, []);
  const onPreset3Pressed = useCallback(async () => {
    try {
      setEnabledButtons({
        P1: false,
        P2: false,
        P3: true,
        P4: false,
        P5: false,
        P6: false,
      });
      setLoadingButtons({
        P1: false,
        P2: false,
        P3: true,
        P4: false,
        P5: false,
        P6: false,
      });

      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P3.DOSE_AMOUNT
      );

      resetButtons();
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, []);

  const onPreset4Pressed = useCallback(async () => {
    try {
      setEnabledButtons({
        P1: false,
        P2: false,
        P3: false,
        P4: true,
        P5: false,
        P6: false,
      });
      setLoadingButtons({
        P1: false,
        P2: false,
        P3: false,
        P4: true,
        P5: false,
        P6: false,
      });

      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P4.DOSE_AMOUNT
      );

      resetButtons();
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, []);

  const onPreset5Pressed = useCallback(async () => {
    try {
      setEnabledButtons({
        P1: false,
        P2: false,
        P3: false,
        P4: false,
        P5: true,
        P6: false,
      });
      setLoadingButtons({
        P1: false,
        P2: false,
        P3: false,
        P4: false,
        P5: true,
        P6: false,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P5.DOSE_AMOUNT
      );

      resetButtons();
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, []);

  const onPreset6Pressed = useCallback(async () => {
    try {
      setEnabledButtons({
        P1: false,
        P2: false,
        P3: false,
        P4: false,
        P5: false,
        P6: true,
      });
      setLoadingButtons({
        P1: false,
        P2: false,
        P3: false,
        P4: false,
        P5: false,
        P6: true,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P6.DOSE_AMOUNT
      );

      resetButtons();
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, []);

  const [enabledButtons, setEnabledButtons] = useState({
    P1: true,
    P2: true,
    P3: true,
    P4: true,
    P5: true,
    P6: true,
  });

  const [loadingButtons, setLoadingButtons] = useState({
    P1: false,
    P2: false,
    P3: false,
    P4: false,
    P5: false,
    P6: false,
  });

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
            isDisabled={!enabledButtons.P1}
            isLoading={loadingButtons.P1}
            isLoadingText="Dosando"
            onPress={onPreset1Pressed}
            marginBottom={5}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {Instance.GetInstance().configCache.getCache().PRESETS.P1.NAME}
          </Button>
          <Button
            isDisabled={!enabledButtons.P2}
            isLoading={loadingButtons.P2}
            isLoadingText="Dosando"
            onPress={onPreset2Pressed}
            marginBottom={5}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {Instance.GetInstance().configCache.getCache().PRESETS.P2.NAME}
          </Button>
          <Button
            isDisabled={!enabledButtons.P3}
            isLoading={loadingButtons.P3}
            isLoadingText="Dosando"
            onPress={onPreset3Pressed}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {Instance.GetInstance().configCache.getCache().PRESETS.P3.NAME}
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
            isDisabled={!enabledButtons.P4}
            isLoading={loadingButtons.P4}
            isLoadingText="Dosando"
            onPress={onPreset4Pressed}
            marginBottom={5}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {Instance.GetInstance().configCache.getCache().PRESETS.P4.NAME}
          </Button>
          <Button
            isDisabled={!enabledButtons.P5}
            isLoading={loadingButtons.P5}
            isLoadingText="Dosando"
            onPress={onPreset5Pressed}
            marginBottom={5}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {Instance.GetInstance().configCache.getCache().PRESETS.P5.NAME}
          </Button>
          <Button
            isDisabled={!enabledButtons.P6}
            isLoading={loadingButtons.P6}
            isLoadingText="Dosando"
            onPress={onPreset6Pressed}
            borderRadius={20}
            bgColor={Theme().color.b200}
            width="90%"
            height={'30%'}
            _text={{ color: 'black', fontSize: Theme().font.size.m(appConfig.screen) }}
            _pressed={{ opacity: 0.8 }}
          >
            {Instance.GetInstance().configCache.getCache().PRESETS.P6.NAME}
          </Button>
        </Stack>
      </HStack>
    </Center>
  );
}

export default memo(PoisonAmountSelector);
