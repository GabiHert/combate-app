import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import React, { memo } from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { Theme } from '../../app/theme/theme';

function FormInput(props: {
  title: string;
  description: string;
  errorMessage: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string) => void;
}) {
  return (
    <FormControl
      width={'60%'}
      isInvalid={props.errorMessage != undefined && props.errorMessage != ''}
    >
      <FormControl.Label _text={{ bold: true, fontSize: 15 }}>{props.title}</FormControl.Label>
      <Input
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
