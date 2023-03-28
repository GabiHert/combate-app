import { Box, Center, HStack, Stack } from 'native-base';
import React, { memo } from 'react';
import { appConfig } from '../../../../app/config/app-config';
import { Theme } from '../../../../app/theme/theme';
import { IApplicatorsPercentage } from '../Sheet';

function StatusBar(props: { velocity: number; applicatorsLoadPercentage: IApplicatorsPercentage }) {
  return (
    <HStack bgColor={Theme().color.b400} width="98%" borderRadius={50} pl={8} pr={8} height="95%">
      <HStack w={'80%'} space={3}>
        <Center
          width={'28%'}
          height="100%"
          _text={{ color: 'white', fontSize: Theme().font.size.m(appConfig.screen) }}
        >
          Esquerdo
          <Center
            width="100%"
            borderRadius={50}
            bgColor={props.applicatorsLoadPercentage.left.severity.color}
            height={'60%'}
            _text={{
              fontSize: Theme().font.size.xl(appConfig.screen),
              color: 'white',
              textAlign: 'center',
            }}
          >
            {props.applicatorsLoadPercentage.left.percentage.toString() + '%'}
          </Center>
        </Center>
        <Center
          width={'28%'}
          height="100%"
          _text={{ color: 'white', fontSize: Theme().font.size.m(appConfig.screen) }}
        >
          Central
          <Center
            width="100%"
            borderRadius={50}
            bgColor={props.applicatorsLoadPercentage.center.severity.color}
            height={'60%'}
            _text={{
              fontSize: Theme().font.size.xl(appConfig.screen),
              color: 'white',
              textAlign: 'center',
            }}
          >
            {props.applicatorsLoadPercentage.center.percentage.toString() + '%'}
          </Center>
        </Center>
        <Center
          width={'28%'}
          height="100%"
          _text={{ color: 'white', fontSize: Theme().font.size.m(appConfig.screen) }}
        >
          Direito
          <Center
            width="100%"
            borderRadius={50}
            bgColor={props.applicatorsLoadPercentage.right.severity.color}
            height={'60%'}
            _text={{
              fontSize: Theme().font.size.xl(appConfig.screen),
              color: 'white',
              textAlign: 'center',
            }}
          >
            {props.applicatorsLoadPercentage.right.percentage.toString() + '%'}
          </Center>
        </Center>
      </HStack>

      <Box w={'20%'}>
        <Center
          width={'100%'}
          height="100%"
          _text={{ color: 'white', fontSize: Theme().font.size.s(appConfig.screen) }}
        >
          Velocidade
          <Center
            width="100%"
            height={'70%'}
            _text={{
              fontSize: Theme().font.size.xxxl(appConfig.screen),
              color: 'white',
              textAlign: 'center',
            }}
          >
            {props.velocity}
          </Center>
        </Center>
      </Box>
    </HStack>
  );
}

export default memo(StatusBar);
