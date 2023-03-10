import { FormControl, Slider } from 'native-base';
import React, { memo, useMemo, useState } from 'react';
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
  const [value, setValue] = useState<number>(0);

  return (
    <FormControl isDisabled={props.disabled} justifyContent={'center'} alignItems={'center'}>
      <FormControl.Label _text={{ fontWeight: 'bold', fontSize: 15 }}>
        {props.title}
      </FormControl.Label>
      <FormControl.Label textAlign={'center'} _text={{ fontWeight: 'normal', fontSize: 12 }}>
        {value}
        {props.unit ? ' ' + props.unit.toString() : ''}
      </FormControl.Label>
      <Slider
        w="60%"
        onChange={setValue}
        onChangeEnd={props.onChangeEnd}
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
