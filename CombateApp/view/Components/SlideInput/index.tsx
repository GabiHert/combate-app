import { Box, FormControl, HStack, Slider, View, VStack, WarningOutlineIcon } from 'native-base';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { appConfig } from '../../../view/app/config/app-config';
import { Theme } from '../../../view/app/theme/theme';

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

  return (
    <FormControl
      isDisabled={props.disabled}
      justifyContent={'center'}
      alignItems={'center'}
      isInvalid={props.errorMessage && props.errorMessage != ''}
    >
      <FormControl.Label
        _text={{ fontWeight: 'bold', fontSize: Theme().font.size.m(appConfig.screen) }}
      >
        {props.title}
      </FormControl.Label>
      <FormControl.Label
        textAlign={'center'}
        _text={{ fontWeight: 'normal', fontSize: Theme().font.size.m(appConfig.screen) }}
      >
        {Math.max(value).toFixed(2)}
        {props.unit ? ' ' + props.unit.toString() : ''}
      </FormControl.Label>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
        {props.errorMessage}
      </FormControl.ErrorMessage>
      <Slider
        size={'lg'}
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
    </FormControl>
  );
}

export default memo(SlideInput);
