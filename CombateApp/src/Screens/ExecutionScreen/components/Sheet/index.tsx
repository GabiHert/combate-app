import { Box, Button, Spacer, Stack, Text } from 'native-base';
import React, { memo, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { min } from 'react-native-reanimated';
import { AConfig } from '../../../../api/core/adapter/config';
import { Severity } from '../../../../api/core/enum/severity';
import { ILocation } from '../../../../api/interface/location';
import { Theme } from '../../../../app/theme/theme';

export interface IApplicatorsPercentage {
  left: { percentage: number; severity: Severity };
  right: { percentage: number; severity: Severity };
  center: { percentage: number; severity: Severity };
}

function Sheet(props: {
  config: AConfig;
  onFinishPressed: () => void;
  location: ILocation;
  applicatorsLoadPercentage: IApplicatorsPercentage;
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
    <Box alignItems="center" justifyContent="flex-end" paddingTop={1}>
      <Box height={'90%'}>
        <Box
          height={props.blockHeight}
          width="100%"
          alignItems="center"
          justifyContent="center"
          mt={3}
          paddingLeft={2}
          paddingRight={2}
        >
          <Stack direction={'row'}>
            <Box
              background={Theme().color.b200}
              width="45%"
              height={'100%'}
              marginRight={2}
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
            >
              Tempo em execução
              <Text fontSize={35} fontWeight="bold">
                {formatExecutionTime(executionTimeHours, executionTimeMinutes)}
              </Text>
            </Box>
            <Box
              background={Theme().color.b200}
              width="55%"
              height={'100%'}
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
            >
              Latitude
              <Text fontSize={20} marginBottom={2} fontWeight="bold">
                {props.location.latitude}
              </Text>
              Longitude
              <Text fontSize={20} marginBottom={2} fontWeight="bold">
                {props.location.longitude}
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box h={props.spaceBetweenBlocksHeight} />
        <Box
          height={props.blockHeight}
          width="100%"
          alignItems="center"
          justifyContent="center"
          paddingLeft={2}
          paddingRight={2}
        >
          <Stack direction={'row'}>
            <Box
              background={Theme().color.b200}
              width="45%"
              height={'100%'}
              marginRight={2}
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
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
                    props.appliedDoses * props.config.getCache().APPLICATION.DOSE_WEIGHT_KG * 1000
                  )}
                </Text>
                <Text fontSize={10}>g</Text>
              </Stack>
            </Box>
            <Box
              background={Theme().color.b200}
              width="55%"
              height={'100%'}
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
            >
              <Text>Reservatórios</Text>
              <Stack direction={'row'} alignItems="center" justifyContent="center" height={'75%'}>
                <Box
                  borderRadius={20}
                  bgColor={props.applicatorsLoadPercentage.left.severity.color}
                  width="30%"
                  alignItems="center"
                  justifyContent="center"
                  marginRight={1}
                >
                  <Text fontSize={10}>Esquerdo</Text>
                  <Text fontSize={20} fontWeight="bold">
                    {props.applicatorsLoadPercentage.left.percentage}%
                  </Text>
                </Box>

                <Box
                  borderRadius={20}
                  bgColor={props.applicatorsLoadPercentage.center.severity.color}
                  width="30%"
                  alignItems="center"
                  justifyContent="center"
                  marginRight={1}
                >
                  <Text fontSize={10}>Central</Text>
                  <Text fontSize={20} fontWeight="bold">
                    {props.applicatorsLoadPercentage.center.percentage}%
                  </Text>
                </Box>

                <Box
                  borderRadius={20}
                  bgColor={props.applicatorsLoadPercentage.right.severity.color}
                  width="30%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={10}>Direito</Text>
                  <Text fontSize={20} fontWeight="bold">
                    {props.applicatorsLoadPercentage.right.percentage}%
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box height={12} justifyContent="center" alignItems="center" width={'100%'} marginBottom={1}>
        <Button
          borderRadius={10}
          onPress={props.onFinishPressed}
          width="60%"
          height="100%"
          _pressed={{ opacity: 0.8 }}
          backgroundColor={Theme().color.sError}
        >
          Encerrar
        </Button>
      </Box>
    </Box>
  );
}

export default memo(Sheet);
