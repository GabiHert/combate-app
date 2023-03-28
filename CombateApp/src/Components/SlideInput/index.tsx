import { Box, FormControl, HStack, View, VStack } from 'native-base';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { appConfig } from '../../app/config/app-config';
import { Theme } from '../../app/theme/theme';
import Slider from 'react-native-a11y-slider';
import { Text } from 'react-native-svg';

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
    <FormControl
      w={'90%'}
      isDisabled={props.disabled}
      justifyContent={'center'}
      alignItems={'center'}
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
        {value}
        {props.unit ? ' ' + props.unit.toString() : ''}
      </FormControl.Label>
      <Slider
        showLabel={false}
        onSlidingComplete={onChangeEnd}
        increment={props.step}
        min={props.minValue}
        values={[props.defaultValue]}
        max={props.maxValue}
        value={value}
        onValueChange={(value) => setValue(value)}
      />
    </FormControl>
  );
}

export default SlideInput;

/**
 *     <FormControl isDisabled={props.disabled} justifyContent={'center'} alignItems={'center'}>
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
      </FormControl.Label>
    </FormControl>
 */
