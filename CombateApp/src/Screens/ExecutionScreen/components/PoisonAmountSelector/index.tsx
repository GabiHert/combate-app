import { Button, Center, HStack, Stack } from 'native-base';
import React, { memo, useCallback, useState } from 'react';
import { appConfig } from '../../../../app/config/app-config';
import { Instance } from '../../../../app/instance/instance';
import { Theme } from '../../../../app/theme/theme';

function PoisonAmountSelector(props: {
  onPresetPressed: (amount: {NAME:string,DOSE_AMOUNT:number}, callback: () => void) => Promise<void>;
}) {
  const [loadingButtons, setLoadingButtons] = useState({
    P1: false,
    P2: false,
    P3: false,
    P4: false,
    P5: false,
    P6: false,
  });

  const resetButtons = useCallback(() => {
    setLoadingButtons({
      P1: false,
      P2: false,
      P3: false,
      P4: false,
      P5: false,
      P6: false,
    });
  }, [loadingButtons]);

  const onPreset1Pressed = useCallback(async () => {
    try {
      setLoadingButtons({
        P1: true,
        P2: false,
        P3: false,
        P4: false,
        P5: false,
        P6: false,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P1,
        resetButtons
      );
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, [loadingButtons]);

  const onPreset2Pressed = useCallback(async () => {
    try {
      setLoadingButtons({
        P1: false,
        P2: true,
        P3: false,
        P4: false,
        P5: false,
        P6: false,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P2,
        resetButtons
      );
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, [loadingButtons]);
  const onPreset3Pressed = useCallback(async () => {
    try {
      setLoadingButtons({
        P1: false,
        P2: false,
        P3: true,
        P4: false,
        P5: false,
        P6: false,
      });

      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P3,
        resetButtons
      );

      resetButtons();
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, [loadingButtons]);

  const onPreset4Pressed = useCallback(async () => {
    try {
      setLoadingButtons({
        P1: false,
        P2: false,
        P3: false,
        P4: true,
        P5: false,
        P6: false,
      });

      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P4,
        resetButtons
      );

      resetButtons();
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, [loadingButtons]);

  const onPreset5Pressed = useCallback(async () => {
    try {
      setLoadingButtons({
        P1: false,
        P2: false,
        P3: false,
        P4: false,
        P5: true,
        P6: false,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P5,
        resetButtons
      );

      resetButtons();
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, [loadingButtons]);

  const onPreset6Pressed = useCallback(async () => {
    try {
      setLoadingButtons({
        P1: false,
        P2: false,
        P3: false,
        P4: false,
        P5: false,
        P6: true,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P6,
        resetButtons
      );

      resetButtons();
    } catch (err) {
      resetButtons();
      throw err;
    }
  }, [loadingButtons]);

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
        <Stack
          direction={'column'}
          alignItems="center"
          justifyContent="center"
          height="85%"
          width="50%"
        >
          <Button
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
