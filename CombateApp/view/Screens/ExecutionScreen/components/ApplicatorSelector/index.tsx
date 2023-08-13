import { useFocusEffect } from "@react-navigation/native";
import { Box, Button, Stack, Text } from "native-base";
import React, { memo, useState } from "react";
import { SeverityEnum } from "../../../../../src/internal/core/enum/severity";
import { appConfig } from "../../../../app/config/app-config";
import { Theme } from "../../../../app/theme/theme";
import { ShowToast as showToast } from "../../../../Components/AlertToast";

function ApplicatorSelector(props: {
  leftApplicatorActive: boolean;
  centerApplicatorActive: boolean;
  rightApplicatorActive: boolean;
  leftApplicatorAvailable: boolean;
  centerApplicatorAvailable: boolean;
  rightApplicatorAvailable: boolean;
  onLeftApplicatorSelected: (state: boolean) => void;
  onRightApplicatorSelected: (state: boolean) => void;
  onCenterApplicatorSelected: (state: boolean) => void;
  changeCallback: () => Promise<void>;
}) {
  const [leftApplicatorActive, setLeftApplicatorActive] = useState<boolean>(
    props.leftApplicatorActive
  );
  const [centerApplicatorActive, setCenterApplicatorActive] = useState<boolean>(
    props.centerApplicatorActive
  );
  const [rightApplicatorActive, setRightApplicatorActive] = useState<boolean>(
    props.rightApplicatorActive
  );

  useFocusEffect(() => {
    setCenterApplicatorActive(props.centerApplicatorActive);
    setRightApplicatorActive(props.rightApplicatorActive);
    setLeftApplicatorActive(props.leftApplicatorActive);
  });
  async function onLeftApplicatorPress() {
    if (props.leftApplicatorAvailable) {
      await props.changeCallback();
      showToast({
        durationMs: 5000,
        title: "Somente dosador esquerdo selecionado",
        severity: SeverityEnum.WARN,
      });
      setLeftApplicatorActive(true);
      setRightApplicatorActive(false);
      setCenterApplicatorActive(false);
      props.onLeftApplicatorSelected(true);
      props.onRightApplicatorSelected(false);
      props.onCenterApplicatorSelected(false);
    }
  }

  async function onRightApplicatorPress() {
    await props.changeCallback();

    if (props.rightApplicatorAvailable) {
      showToast({
        durationMs: 5000,
        title: "Somente dosador direito selecionado",
        severity: SeverityEnum.WARN,
      });
      setLeftApplicatorActive(false);
      setRightApplicatorActive(true);
      setCenterApplicatorActive(false);
      props.onLeftApplicatorSelected(false);
      props.onRightApplicatorSelected(true);
      props.onCenterApplicatorSelected(false);
    }
  }

  async function onCenterApplicatorPress() {
    await props.changeCallback();

    if (props.centerApplicatorAvailable) {
      showToast({
        durationMs: 5000,
        title: "Somente dosador central selecionado",
        severity: SeverityEnum.WARN,
      });
      setLeftApplicatorActive(false);
      setRightApplicatorActive(false);
      setCenterApplicatorActive(true);
      props.onLeftApplicatorSelected(false);
      props.onRightApplicatorSelected(false);
      props.onCenterApplicatorSelected(true);
    }
  }

  function getButtonColor(isActive: boolean, isAvailable: boolean): string {
    if (!isAvailable) {
      return Theme().color.b200;
    }
    return isActive ? Theme().color.sOk : Theme().color.sError;
  }
  return (
    <>
      <Box
        width="85%"
        borderRadius={20}
        height="95%"
        bgColor={Theme().color.b400}
      >
        <Text alignSelf={"center"} color="white" position={"absolute"}>
          Dosadores
        </Text>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent="center"
          width="100%"
          paddingTop={"2"}
        >
          <Box
            width={"30%"}
            height="95%"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              width={"92%"}
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                isDisabled={!props.leftApplicatorAvailable}
                onPress={onLeftApplicatorPress}
                _disabled={{ opacity: 0.5 }}
                bgColor={getButtonColor(
                  leftApplicatorActive,
                  props.leftApplicatorAvailable
                )}
                width="100%"
                height={"70%"}
                _text={{
                  color: "white",
                  fontSize: Theme().font.size.m(appConfig.screen),
                }}
                borderRadius={50}
                _pressed={{ opacity: 0.8 }}
              >
                Esquerdo
              </Button>
            </Box>
          </Box>

          <Box
            width={"30%"}
            height="95%"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              width={"92%"}
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                isDisabled={!props.centerApplicatorAvailable}
                onPress={onCenterApplicatorPress}
                _disabled={{ opacity: 0.5 }}
                bgColor={getButtonColor(
                  centerApplicatorActive,
                  props.centerApplicatorAvailable
                )}
                width="100%"
                height={"70%"}
                borderRadius={50}
                _text={{
                  color: "white",
                  fontSize: Theme().font.size.m(appConfig.screen),
                }}
                _pressed={{ opacity: 0.8 }}
              >
                Central
              </Button>
            </Box>
          </Box>

          <Box
            width={"30%"}
            height="95%"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              width={"92%"}
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                isDisabled={!props.rightApplicatorAvailable}
                onPress={onRightApplicatorPress}
                _disabled={{ opacity: 0.5 }}
                bgColor={getButtonColor(
                  rightApplicatorActive,
                  props.rightApplicatorAvailable
                )}
                width="100%"
                height={"70%"}
                borderRadius={50}
                _text={{
                  color: "white",
                  fontSize: Theme().font.size.m(appConfig.screen),
                }}
                _pressed={{ opacity: 0.8 }}
              >
                Direito
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default memo(ApplicatorSelector);
