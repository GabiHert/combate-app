import { Box, Button, Center, Stack, Text, VStack, WarningOutlineIcon } from 'native-base';
import React, { memo, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Severity } from '../../../../api/core/enum/severity';
import { config } from '../../../../api/core/port/config-port';
import { AppConfig } from '../../../../app/config/app-config';
import { Theme } from '../../../../app/theme/theme';
import EventRegisterModal from '../EventRegisterModal';
import FinishExecutionModal from '../FinishExecutionModal';

export interface IApplicatorsPercentage {
  left: { percentage: number; severity: Severity };
  right: { percentage: number; severity: Severity };
  center: { percentage: number; severity: Severity };
}

function Sheet(props: {
  onFinishPressed: () => void;
  appliedDoses: number;
  sheetHeight: number;
  blockHeight: number;
  spaceBetweenBlocksHeight: number;
}) {
  const [executionTimeMinutes, setExecutionTimeMinutes] = useState<number>(0);
  const [executionTimeHours, setExecutionTimeHours] = useState<number>(0);
  const [eventRegisterVisible, setEventRegisterVisible] = useState(false);
  const [finishExecutionModalVisible, setFinishExecutionModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (executionTimeMinutes + 1 > 59) {
        setExecutionTimeMinutes(0);
        setExecutionTimeHours(executionTimeHours + 1);
      } else {
        setExecutionTimeMinutes(executionTimeMinutes + 1);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [executionTimeHours, executionTimeMinutes, setExecutionTimeMinutes, setExecutionTimeHours]);

  const formatExecutionTime = useCallback(
    (hours: number, minutes: number) => {
      const formatted =
        (hours < 10 ? `0${hours}` : hours.toString()) +
        ':' +
        (minutes < 10 ? `0${minutes}` : minutes.toString());
      return formatted;
    },
    [executionTimeHours, executionTimeMinutes]
  );

  const onFinishExecutionModalClose = useCallback(() => {
    setFinishExecutionModalVisible(false);
  }, [setEventRegisterVisible]);

  const onEventRegisterPress = useCallback(() => {
    setEventRegisterVisible(true);
  }, [setEventRegisterVisible]);

  const onEventRegisterClose = useCallback(() => {
    setEventRegisterVisible(false);
  }, [setEventRegisterVisible]);

  const onSheetFinishPressed = useCallback(() => {
    setFinishExecutionModalVisible(true);
  }, []);

  const onModalFinishPressed = useCallback(() => {
    onFinishExecutionModalClose();
    props.onFinishPressed();
  }, []);
  return (
    <VStack height={props.sheetHeight - 30} alignItems="center" space={4}>
      <EventRegisterModal isOpen={eventRegisterVisible} onClose={onEventRegisterClose} />
      <FinishExecutionModal
        isOpen={finishExecutionModalVisible}
        onClose={onFinishExecutionModalClose}
        onFinishExecutionPress={onModalFinishPressed}
      />
      <Box
        width="100%"
        alignItems="center"
        justifyContent="center"
        mt={props.spaceBetweenBlocksHeight}
        paddingLeft={2}
        paddingRight={2}
      >
        <Stack direction={'row'} space={3}>
          <Box
            background={Theme().color.b200}
            width="40%"
            height={props.blockHeight}
            marginRight={2}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
            _text={{ fontSize: Theme().font.size.m(AppConfig.screen.width) }}
          >
            Tempo em execução
            <Text fontSize={Theme().font.size.xxxl(AppConfig.screen.width)} fontWeight="bold">
              {formatExecutionTime(executionTimeHours, executionTimeMinutes)}
            </Text>
          </Box>
          <Box
            background={Theme().color.b200}
            width="50%"
            height={props.blockHeight}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
            _text={{ fontSize: Theme().font.size.m(AppConfig.screen.width) }}
          >
            TALVEZ COLOCAR BOTAO DE EVENTO
          </Box>
        </Stack>
      </Box>
      <Box
        width="100%"
        alignItems="center"
        justifyContent="center"
        paddingLeft={2}
        paddingRight={2}
      >
        <Stack direction={'row'} space={3}>
          <Box
            background={Theme().color.b200}
            width="40%"
            height={props.blockHeight}
            marginRight={2}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
            _text={{ fontSize: Theme().font.size.m(AppConfig.screen.width) }}
          >
            Total aplicado
            <Stack direction={'row'} alignItems="baseline" justifyContent="center">
              <Text fontSize={Theme().font.size.xxxl(AppConfig.screen.width)} fontWeight="bold">
                {props.appliedDoses}
              </Text>
              <Text fontSize={Theme().font.size.s(AppConfig.screen.width)}>Doses</Text>
            </Stack>
            <Stack direction={'row'} alignItems="baseline" justifyContent="center">
              <Text fontSize={Theme().font.size.xxxl(AppConfig.screen.width)} fontWeight="bold">
                {Math.trunc(
                  props.appliedDoses * config.getCache().APPLICATION.DOSE_WEIGHT_KG * 1000
                )}
              </Text>
              <Text fontSize={Theme().font.size.s(AppConfig.screen.width)}>g</Text>
            </Stack>
          </Box>

          <Button
            background={Theme().color.sWarning}
            width="50%"
            height={'100%'}
            onPress={onEventRegisterPress}
            _pressed={{ opacity: 0.8 }}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
          >
            <Center>
              <Text mb={2} fontSize={Theme().font.size.l(AppConfig.screen.width)}>
                Sinalizar Evento
              </Text>
              <WarningOutlineIcon
                size={Theme().font.size.xxxxl(AppConfig.screen.width)}
                color={'black'}
              />
            </Center>
          </Button>
        </Stack>
      </Box>
      <Button
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={10}
        onPress={onSheetFinishPressed}
        width="50%"
        height={props.blockHeight / 2}
        _pressed={{ opacity: 0.8 }}
        _text={{ fontSize: Theme().font.size.m(AppConfig.screen.width) }}
        backgroundColor={Theme().color.sError}
      >
        Finalizar
      </Button>
    </VStack>
  );
}

export default memo(Sheet);
