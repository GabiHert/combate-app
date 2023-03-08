import { Box, Button, Stack, Text } from 'native-base';
import React, { memo, useState } from 'react';
import { ILocation } from '../../../../api/interface/location';
import { Theme } from '../../../../app/theme/theme';

export interface IApplicatorsPercentage {
  left: number;
  right: number;
  center: number;
}

function getLoadPercentageStatusColor(loadPercentage: number): string {
  if (loadPercentage <= 33.33) {
    return Theme().color.sError;
  }
  if (loadPercentage > 33.33 && loadPercentage < 66.66) {
    return Theme().color.sWarning;
  }
  if (loadPercentage >= 66.66) {
    return Theme().color.sOk;
  }
}

function Sheet(props: {
  onFinishPressed: () => void;
  location: ILocation;
  applicatorsLoadPercentage: IApplicatorsPercentage;
}) {
  const [leftLoadPercentageColor] = useState<string>(
    getLoadPercentageStatusColor(props.applicatorsLoadPercentage.left)
  );
  const [rightLoadPercentageColor] = useState<string>(
    getLoadPercentageStatusColor(props.applicatorsLoadPercentage.right)
  );
  const [centerLoadPercentageColor] = useState<string>(
    getLoadPercentageStatusColor(props.applicatorsLoadPercentage.center)
  );

  return (
    <Box alignItems="center" justifyContent="flex-end">
      <Box height={'85%'}>
        <Box
          height={'44%'}
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
              Tempo em execução
              <Text fontSize={35} fontWeight="bold">
                01:29
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
        <Box
          height={'44%'}
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
                  20
                </Text>
                <Text fontSize={10}>Doses</Text>
              </Stack>
              <Stack direction={'row'} alignItems="baseline" justifyContent="center">
                <Text fontSize={35} fontWeight="bold">
                  1000
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
                  bgColor={leftLoadPercentageColor}
                  width="30%"
                  alignItems="center"
                  justifyContent="center"
                  marginRight={1}
                >
                  <Text fontSize={10}>Esquerdo</Text>
                  <Text fontSize={20} fontWeight="bold">
                    {props.applicatorsLoadPercentage.left}%
                  </Text>
                </Box>

                <Box
                  borderRadius={20}
                  bgColor={centerLoadPercentageColor}
                  width="30%"
                  alignItems="center"
                  justifyContent="center"
                  marginRight={1}
                >
                  <Text fontSize={10}>Central</Text>
                  <Text fontSize={20} fontWeight="bold">
                    {props.applicatorsLoadPercentage.center}%
                  </Text>
                </Box>

                <Box
                  borderRadius={20}
                  bgColor={rightLoadPercentageColor}
                  width="30%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={10}>Direito</Text>
                  <Text fontSize={20} fontWeight="bold">
                    {props.applicatorsLoadPercentage.right}%
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box
        height={'15%'}
        justifyContent="center"
        alignItems="center"
        width={'100%'}
        marginBottom={1}
      >
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
