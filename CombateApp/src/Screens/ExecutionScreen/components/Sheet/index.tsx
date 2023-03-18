import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
  WarningIcon,
  WarningOutlineIcon,
  WarningTwoIcon,
} from 'native-base';
import React, { memo, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Severity } from '../../../../api/core/enum/severity';
import { config } from '../../../../api/core/port/config-port';
import { Theme } from '../../../../app/theme/theme';

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

  return (
    <VStack height={props.sheetHeight - 30} alignItems="center" space={4}>
      <Box
        width="100%"
        alignItems="center"
        justifyContent="center"
        mt={30}
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
            _text={{ fontSize: 20 }}
          >
            Tempo em execução
            <Text fontSize={35} fontWeight="bold">
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
            _text={{ fontSize: 20 }}
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
            _text={{ fontSize: 20 }}
          >
            Total aplicado
            <Stack direction={'row'} alignItems="baseline" justifyContent="center">
              <Text fontSize={35} fontWeight="bold">
                {props.appliedDoses}
              </Text>
              <Text fontSize={10}>Doses</Text>
            </Stack>
            <Stack direction={'row'} alignItems="baseline" justifyContent="center">
              <Text fontSize={35} fontWeight="bold">
                {Math.trunc(
                  props.appliedDoses * config.getCache().APPLICATION.DOSE_WEIGHT_KG * 1000
                )}
              </Text>
              <Text fontSize={10}>g</Text>
            </Stack>
          </Box>

          <Button
            background={Theme().color.sWarning}
            width="50%"
            height={'100%'}
            _pressed={{ opacity: 0.8 }}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
          >
            <Center>
              <Text mb={2} fontSize={20}>
                Sinalizar Evento
              </Text>
              <WarningOutlineIcon size={50} color={'black'} />
            </Center>
          </Button>
        </Stack>
      </Box>
      <Button
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={10}
        onPress={props.onFinishPressed}
        width="50%"
        height={props.blockHeight / 2}
        _pressed={{ opacity: 0.8 }}
        _text={{ fontSize: 20 }}
        backgroundColor={Theme().color.sError}
      >
        Finalizar
      </Button>
    </VStack>
  );
}

export default memo(Sheet);
