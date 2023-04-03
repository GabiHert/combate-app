import { Box, FormControl, HStack, Slider, View, VStack } from 'native-base';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { appConfig } from '../../app/config/app-config';
import { Theme } from '../../app/theme/theme';

function SlideInput(props: {
  disabled: boolean;
  step: number;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  onChangeEnd: (value: number) => void;
  title: string;
  unit?: string;
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
    <FormControl isDisabled={props.disabled} justifyContent={'center'} alignItems={'center'}>
      <FormControl.Label
        _text={{ fontWeight: 'bold', fontSize: Theme().font.size.m(appConfig.screen) }}
      >
        {props.title}
      </FormControl.Label>
      <FormControl.Label
        textAlign={'center'}
        _text={{ fontWeight: 'normal', fontSize: Theme().font.size.m(appConfig.screen) }}
      >
        {value}
        {props.unit ? ' ' + props.unit.toString() : ''}
      </FormControl.Label>
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
