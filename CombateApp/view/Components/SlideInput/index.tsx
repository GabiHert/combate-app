import {
  AddIcon,
  Box,
  FormControl,
  HStack,
  IconButton,
  MinusIcon,
  Slider,
  WarningOutlineIcon,
} from "native-base";
import React, { memo, useCallback, useState } from "react";
import { appConfig } from "../../../view/app/config/app-config";
import { Theme } from "../../../view/app/theme/theme";

function SlideInput(props: {
  disabled: boolean;
  step: number;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  onChangeEnd: (value: number) => void;
  title: string;
  unit?: string;
  errorMessage?: string;
}) {
  const [value, setValue] = useState<number>(props.defaultValue);
  const onChangeEnd = useCallback(
    (value: number) => {
      setValue(value);
      props.onChangeEnd(value);
    },
    [setValue]
  );

  const minusCallback = useCallback(() => {
    let aux = value - props.step;

    if (aux < props.minValue) {
      aux = props.minValue;
    }
    setValue(aux);
    props.onChangeEnd(aux);
  }, [value]);

  const addCallback = useCallback(() => {
    let aux = value + props.step;
    if (aux > props.maxValue) {
      aux = props.maxValue;
    }
    setValue(aux);
    props.onChangeEnd(aux);
  }, [value]);
  return (
    <FormControl
      isDisabled={props.disabled}
      alignItems={"center"}
      isInvalid={props.errorMessage && props.errorMessage != ""}
    >
      <Box w={"60%"}>
        <FormControl.Label
          _text={{
            fontWeight: "bold",
            fontSize: Theme().font.size.m(appConfig.screen),
          }}
        >
          {props.title}
        </FormControl.Label>
      </Box>

      <FormControl.Label
        textAlign={"center"}
        _text={{
          fontWeight: "normal",
          fontSize: Theme().font.size.m(appConfig.screen),
        }}
      >
        {Math.max(value).toFixed(2)}
        {props.unit ? " " + props.unit.toString() : ""}
      </FormControl.Label>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
        {props.errorMessage}
      </FormControl.ErrorMessage>

      <HStack w="70%" justifyContent={"center"} alignItems="center">
        <IconButton
          onPress={minusCallback}
          icon={<MinusIcon />}
          size={Theme().font.size.l(appConfig.screen)}
          _icon={{ color: Theme().color.b500 }}
          mr={4}
          background={Theme().color.sError}
          h={Theme().font.size.l(appConfig.screen) * 1.5}
          w={Theme().font.size.l(appConfig.screen) * 1.5}
          _pressed={{ opacity: 0.8 }}
        />
        <Slider
          size={"lg"}
          w="60%"
          onChange={setValue}
          onChangeEnd={onChangeEnd}
          defaultValue={props.defaultValue}
          minValue={props.minValue}
          maxValue={props.maxValue}
          step={props.step}
          isDisabled={props.disabled}
        >
          <Slider.Track>
            <Slider.FilledTrack bgColor={Theme().color.b200} />
          </Slider.Track>
          <Slider.Thumb bgColor={Theme().color.b200} />
        </Slider>

        <IconButton
          onPress={addCallback}
          icon={<AddIcon />}
          size={Theme().font.size.l(appConfig.screen)}
          _icon={{ color: Theme().color.b500 }}
          ml={4}
          background={Theme().color.sOk}
          h={Theme().font.size.l(appConfig.screen) * 1.5}
          w={Theme().font.size.l(appConfig.screen) * 1.5}
          _pressed={{ opacity: 0.8 }}
        />
      </HStack>
    </FormControl>
  );
}

export default memo(SlideInput);
