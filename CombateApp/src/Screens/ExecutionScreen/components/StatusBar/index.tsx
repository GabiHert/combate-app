import { Box, Center, HStack, Stack } from 'native-base';
import React, { memo } from 'react';
import { AppConfig } from '../../../../app/config/app-config';
import { Theme } from '../../../../app/theme/theme';
import { IApplicatorsPercentage } from '../Sheet';

function StatusBar(props: { velocity: number; applicatorsLoadPercentage: IApplicatorsPercentage }) {
  return (
    <HStack bgColor={Theme().color.b400} width="98%" borderRadius={50} pl={8} pr={8} height="95%">
      <HStack w={'80%'} space={3}>
        <Center
          width={'28%'}
          height="100%"
          _text={{ color: 'white', fontSize: Theme().font.size.m(AppConfig.screen) }}
        >
          Esquerdo
          <Center
            width="100%"
            borderRadius={50}
            bgColor={props.applicatorsLoadPercentage.left.severity.color}
            height={'60%'}
            _text={{
              fontSize: Theme().font.size.xl(AppConfig.screen),
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
          _text={{ color: 'white', fontSize: Theme().font.size.m(AppConfig.screen) }}
        >
          Central
          <Center
            width="100%"
            borderRadius={50}
            bgColor={props.applicatorsLoadPercentage.center.severity.color}
            height={'60%'}
            _text={{
              fontSize: Theme().font.size.xl(AppConfig.screen),
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
          _text={{ color: 'white', fontSize: Theme().font.size.m(AppConfig.screen) }}
        >
          Direito
          <Center
            width="100%"
            borderRadius={50}
            bgColor={props.applicatorsLoadPercentage.right.severity.color}
            height={'60%'}
            _text={{
              fontSize: Theme().font.size.xl(AppConfig.screen),
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
          _text={{ color: 'white', fontSize: Theme().font.size.s(AppConfig.screen) }}
        >
          Velocidade
          <Center
            width="100%"
            height={'70%'}
            _text={{
              fontSize: Theme().font.size.xxxl(AppConfig.screen),
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
