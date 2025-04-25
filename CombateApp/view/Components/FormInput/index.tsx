import { FormControl, Input, WarningOutlineIcon } from "native-base";
import React, { memo, useCallback, useState } from "react";
import { KeyboardTypeOptions } from "react-native";
import { appConfig } from "../../../view/app/config/app-config";
import { Theme } from "../../../view/app/theme/theme";

function FormInput(props: {
  title: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  isInvalid?: boolean;
  w?: string | number;
  isPassword?: boolean;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string) => void;
  defaultValue?: string;
}) {
  const [defaultValue, setDefaultValue] = useState(props.defaultValue);
  const [inputValue, setInputValue] = useState("");

  const onChangeText = useCallback(
    (text: string) => {
      setDefaultValue(null);
      setInputValue(null);

      let newText = text;
      if (!props.isPassword && props.keyboardType === "default") {
        newText = text
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      }
      setInputValue(text);
      props.onChangeText(newText);
    },
    [setDefaultValue, props.onChangeText, props.isPassword, setInputValue]
  );

  return (
    <FormControl
      width={props.w ? props.w : "60%"}
      isInvalid={
        props.isInvalid ||
        (props.errorMessage != undefined && props.errorMessage != "")
      }
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
        type={props.isPassword ? "password" : "text"}
        onChangeText={onChangeText}
        keyboardType={props.keyboardType}
        borderRadius={20}
        value={inputValue === "" ? defaultValue : inputValue}
        placeholder={props.placeholder}
        _invalid={{ borderColor: Theme().color.sError, borderWidth: 2 }}
        borderWidth={2}
        isDisabled={props.disabled}
      />
      {props.errorMessage ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
          {props.errorMessage}
        </FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText
          _text={{ fontSize: Theme().font.size.s(appConfig.screen) }}
        >
          {props.description}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
}

export default memo(FormInput);
