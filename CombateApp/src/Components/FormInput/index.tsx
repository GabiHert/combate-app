import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import React, { memo } from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { Theme } from '../../app/theme/theme';

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
}) {
  return (
    <FormControl
      width={props.w ? props.w : '60%'}
      isInvalid={props.isInvalid || (props.errorMessage != undefined && props.errorMessage != '')}
    >
      <FormControl.Label _text={{ bold: true, fontSize: 15 }}>{props.title}</FormControl.Label>
      <Input
        type={props.isPassword ? 'password' : 'text'}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        borderRadius={20}
        placeholder={props.placeholder}
        _invalid={{ borderColor: Theme().color.sError, borderWidth: 3 }}
        borderWidth={1.5}
      />
      {props.errorMessage ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
          {props.errorMessage}
        </FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText _text={{ fontSize: 'xs' }}>
          {props.description}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
}

export default FormInput;
