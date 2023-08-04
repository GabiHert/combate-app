import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import React, { memo, useCallback, useState } from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { appConfig } from '../../../view/app/config/app-config';
import { Theme } from '../../../view/app/theme/theme';

function FormInput(props: {
  title: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  isInvalid?: boolean;
  w?: string | number;
  isPassword?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string) => void;
  defaultValue?: string;
}) {
  const [defaultValue, setDefaultValue] = useState(props.defaultValue);

  const onChangeText = useCallback(
    (text: string) => {
      setDefaultValue(null);
      props.onChangeText(text);
    },
    [setDefaultValue, props.onChangeText]
  );

  return (
    <FormControl
      width={props.w ? props.w : '60%'}
      isInvalid={props.isInvalid || (props.errorMessage != undefined && props.errorMessage != '')}
    >
      <FormControl.Label
        _text={{
          bold: true,
          fontSize: Theme().font.size.m(appConfig.screen),
          paddingLeft: 1,
        }}
      >
        {props.title}
      </FormControl.Label>
      <Input
        type={props.isPassword ? 'password' : 'text'}
        onChangeText={onChangeText}
        keyboardType={props.keyboardType}
        borderRadius={20}
        value={defaultValue}
        placeholder={props.placeholder}
        _invalid={{ borderColor: Theme().color.sError, borderWidth: 2 }}
        borderWidth={2}
      />
      {props.errorMessage ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
          {props.errorMessage}
        </FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText _text={{ fontSize: Theme().font.size.s(appConfig.screen) }}>
          {props.description}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
}

export default memo(FormInput);
