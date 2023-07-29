import { FormControl, Select, WarningOutlineIcon } from 'native-base';
import React, { memo } from 'react';
import { IItem } from '../../../src/internal/interface/item';
import { appConfig } from '../../../view/app/config/app-config';
import { Theme } from '../../../view/app/theme/theme';

function SelectInput(props: {
  title: string;
  errorMessage?: string;
  placeholder: string;
  items?: Array<IItem>;
  onItemSelected: (value: string) => void;
  w?: string | number;
  h?: string | number;
  isRequired?: boolean;
  defaultValue?: string;
}) {
  return (
    <FormControl
      w={props.w ? props.w : '60%'}
      isRequired={props.isRequired}
      isInvalid={props.errorMessage != undefined && props.errorMessage != ''}
    >
      <FormControl.Label
        _text={{ fontWeight: 'bold', fontSize: Theme().font.size.m(appConfig.screen) }}
      >
        {props.title}
      </FormControl.Label>
      <Select
        borderRadius={20}
        borderWidth={2}
        h={props.h}
        onValueChange={props.onItemSelected}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        mt="1"
      >
        {props.items
          ? props.items.map((item) => {
              return <Select.Item key={item.id} label={item.name} value={item.name} />;
            })
          : ''}
      </Select>
      {props.errorMessage != undefined && props.errorMessage != '' ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {props.errorMessage}
        </FormControl.ErrorMessage>
      ) : (
        ''
      )}
    </FormControl>
  );
}

export default memo(SelectInput);
