import { Box, Button, Center, HStack, Stack } from "native-base";
import React, { memo, useCallback, useRef, useState } from "react";
import { appConfig } from "../../../../app/config/app-config";
import { Instance } from "../../../../app/instance/instance";
import { Theme } from "../../../../app/theme/theme";

function PoisonAmountSelector(props: {
  onPresetPressed: (
    amount: { NAME: string; DOSE_AMOUNT: number },
    callback: () => void
  ) => Promise<void>;
}) {
  const [loadingButtons, setLoadingButtons] = useState({
    P1: false,
    P2: false,
    P3: false,
    P4: false,
    P5: false,
    P6: false,
    EXTRA: false,
  });

  const loadingButtonsRef = useRef(loadingButtons);

  function setLoadingButtonsRef(value) {
    loadingButtonsRef.current = value;
    setLoadingButtons(loadingButtonsRef.current);
  }

  const onPreset1Pressed = useCallback(async () => {
    try {
      setLoadingButtonsRef({
        ...loadingButtonsRef.current,
        P1: true,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P1,
        () => {
          const aux = { ...loadingButtonsRef.current };
          aux.P1 = false;
          setLoadingButtonsRef(aux);
        }
      );
    } catch (err) {
      const aux = { ...loadingButtonsRef.current };
      aux.P1 = false;
      setLoadingButtonsRef(aux);
      throw err;
    }
  }, []);

  const onPreset2Pressed = useCallback(async () => {
    try {
      setLoadingButtonsRef({
        ...loadingButtonsRef.current,
        P2: true,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P2,
        () => {
          const aux = { ...loadingButtonsRef.current };
          aux.P2 = false;
          setLoadingButtonsRef(aux);
        }
      );
    } catch (err) {
      const aux = { ...loadingButtonsRef.current };
      aux.P2 = false;
      setLoadingButtonsRef(aux);
      throw err;
    }
  }, []);
  const onPreset3Pressed = useCallback(async () => {
    try {
      setLoadingButtonsRef({
        ...loadingButtonsRef.current,
        P3: true,
      });

      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P3,
        () => {
          const aux = { ...loadingButtonsRef.current };
          aux.P3 = false;
          setLoadingButtonsRef(aux);
        }
      );
    } catch (err) {
      const aux = { ...loadingButtonsRef.current };
      aux.P3 = false;
      setLoadingButtonsRef(aux);
      throw err;
    }
  }, []);

  const onPreset4Pressed = useCallback(async () => {
    try {
      setLoadingButtonsRef({
        ...loadingButtonsRef.current,
        P4: true,
      });

      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P4,
        () => {
          const aux = { ...loadingButtonsRef.current };
          aux.P4 = false;
          setLoadingButtonsRef(aux);
        }
      );
    } catch (err) {
      const aux = { ...loadingButtonsRef.current };
      aux.P4 = false;
      setLoadingButtonsRef(aux);
      throw err;
    }
  }, []);

  const onPreset5Pressed = useCallback(async () => {
    try {
      setLoadingButtonsRef({
        ...loadingButtonsRef.current,
        P5: true,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P5,
        () => {
          const aux = { ...loadingButtonsRef.current };
          aux.P5 = false;
          setLoadingButtonsRef(aux);
        }
      );
    } catch (err) {
      const aux = { ...loadingButtonsRef.current };
      aux.P5 = false;
      setLoadingButtonsRef(aux);
      throw err;
    }
  }, []);

  const onPreset6Pressed = useCallback(async () => {
    try {
      setLoadingButtonsRef({
        ...loadingButtonsRef.current,
        P6: true,
      });
      await props.onPresetPressed(
        Instance.GetInstance().configCache.getCache().PRESETS.P6,
        () => {
          const aux = { ...loadingButtonsRef.current };
          aux.P6 = false;
          setLoadingButtonsRef(aux);
        }
      );
    } catch (err) {
      const aux = { ...loadingButtonsRef.current };
      aux.P6 = false;
      setLoadingButtonsRef(aux);
      throw err;
    }
  }, []);

  const onExtraPressed = useCallback(async () => {
    try {
      setLoadingButtonsRef({
        ...loadingButtonsRef,
        EXTRA: true,
      });

      await props.onPresetPressed(
        { NAME: "Dose Extra", DOSE_AMOUNT: 10 },
        () => {
          const aux = { ...loadingButtonsRef.current };
          aux.EXTRA = false;
          setLoadingButtonsRef(aux);
        }
      );
    } catch (err) {
      const aux = { ...loadingButtonsRef.current };
      aux.EXTRA = false;
      setLoadingButtonsRef(aux);
      throw err;
    }
  }, [loadingButtonsRef]);

  return (
    <>
      <Center>
        <HStack
          borderRadius={20}
          backgroundColor={Theme().color.b300}
          width="94%"
          alignItems={"center"}
          justifyContent={"center"}
          height="95%"
        >
          <Stack
            direction={"column"}
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
              height={"30%"}
              _text={{
                color: "black",
                fontSize: Theme().font.size.m(appConfig.screen),
              }}
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
              height={"30%"}
              _text={{
                color: "black",
                fontSize: Theme().font.size.m(appConfig.screen),
              }}
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
              height={"30%"}
              _text={{
                color: "black",
                fontSize: Theme().font.size.m(appConfig.screen),
              }}
              _pressed={{ opacity: 0.8 }}
            >
              {Instance.GetInstance().configCache.getCache().PRESETS.P3.NAME}
            </Button>
          </Stack>

          <Stack
            direction={"column"}
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
              height={"30%"}
              _text={{
                color: "black",
                fontSize: Theme().font.size.m(appConfig.screen),
              }}
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
              height={"30%"}
              _text={{
                color: "black",
                fontSize: Theme().font.size.m(appConfig.screen),
              }}
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
              height={"30%"}
              _text={{
                color: "black",
                fontSize: Theme().font.size.m(appConfig.screen),
              }}
              _pressed={{ opacity: 0.8 }}
            >
              {Instance.GetInstance().configCache.getCache().PRESETS.P6.NAME}
            </Button>
          </Stack>
        </HStack>
      </Center>
      <Box width={"100%"} paddingX={5}>
        <Button
          isLoadingText="Conectando"
          _pressed={{ opacity: 0.8 }}
          background={Theme().color.b400}
          borderRadius={10}
          onPress={onExtraPressed}
        >
          Extra
        </Button>
      </Box>
    </>
  );
}

export default memo(PoisonAmountSelector);
