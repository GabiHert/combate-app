import { useFocusEffect } from '@react-navigation/native';
import { Box, Button, Center, Stack, Text, VStack, WarningOutlineIcon } from 'native-base';
import React, { memo, useCallback, useState } from 'react';
import { appConfig } from '../../../../app/config/app-config';
import { instance } from '../../../../app/instance/instance';
import { Theme } from '../../../../app/theme/theme';
import { Severity } from '../../../../internal/core/enum/severity';
import EventRegisterModal from '../EventRegisterModal';
import FinishExecutionModal from '../FinishExecutionModal';

export interface IApplicatorsPercentage {
  left: { percentage: number; severity: Severity };
  right: { percentage: number; severity: Severity };
  center: { percentage: number; severity: Severity };
}

function formatDate(date: Date): string {
  const day = date.getDate();

  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year} ${
    hours < 10 ? '0' + hours : hours
  }:${minutes < 10 ? '0' + minutes : minutes}`;
}
function Sheet(props: {
  applicatorsLoad: {
    leftApplicatorLoad: number;
    rightApplicatorLoad: number;
    centerApplicatorLoad: number;
  };
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
  const [date, setDate] = useState(new Date());

  useFocusEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
      if (executionTimeMinutes + 1 > 59) {
        setExecutionTimeMinutes(0);
        setExecutionTimeHours(executionTimeHours + 1);
      } else {
        setExecutionTimeMinutes(executionTimeMinutes + 1);
      }
    }, 60000);

    return () => clearInterval(interval);
  });

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
    //todo: show another modal asking about subBosque
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
            _text={{ fontSize: Theme().font.size.m(appConfig.screen) }}
          >
            Tempo em execução
            <Text fontSize={Theme().font.size.xxxl(appConfig.screen)} fontWeight="bold">
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
            _text={{ fontSize: Theme().font.size.m(appConfig.screen) }}
          >
            Data
            <Text fontSize={Theme().font.size.l(appConfig.screen)} fontWeight="bold">
              {formatDate(date)}
            </Text>
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
            _text={{ fontSize: Theme().font.size.m(appConfig.screen) }}
          >
            Total aplicado
            <Stack direction={'row'} alignItems="baseline" justifyContent="center">
              <Text fontSize={Theme().font.size.xl(appConfig.screen)} fontWeight="bold">
                {props.appliedDoses}
              </Text>
              <Text fontSize={Theme().font.size.s(appConfig.screen)}>Doses</Text>
            </Stack>
            <Stack direction={'row'} alignItems="baseline" justifyContent="center">
              <Text fontSize={Theme().font.size.xl(appConfig.screen)} fontWeight="bold">
                {Math.trunc(
                  props.appliedDoses *
                    instance.configCache.getCache().APPLICATION.DOSE_WEIGHT_KG *
                    1000
                )}
              </Text>
              <Text fontSize={Theme().font.size.s(appConfig.screen)}>g</Text>
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
              <Text mb={2} fontSize={Theme().font.size.l(appConfig.screen)}>
                Sinalizar Evento
              </Text>
              <WarningOutlineIcon size={Theme().font.size.xxxl(appConfig.screen)} color={'black'} />
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
        _text={{ fontSize: Theme().font.size.m(appConfig.screen) }}
        backgroundColor={Theme().color.sError}
      >
        Finalizar
      </Button>
    </VStack>
  );
}

export default memo(Sheet);
