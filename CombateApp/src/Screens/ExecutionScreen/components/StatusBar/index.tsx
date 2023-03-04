import { Box, Stack } from 'native-base';
import React, { memo } from 'react';
import { Severity } from '../../../../api/core/enum/severity';
import { Theme } from '../../../../app/theme/theme';

function StatusBar(props: {
  applicatorStatus: Severity;
  gpsStatus: Severity;
  bluetoothStatus: Severity;
  velocity: number;
}) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        bgColor={Theme().color.b400}
        width="100%"
        borderRadius={50}
        height="95%"
      >
        <Box width={'22%'} height="95%" alignItems="center" justifyContent="center">
          <Box
            width={'90%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
            _text={{ color: 'white' }}
          >
            Dosadores
            <Box
              bgColor={props.applicatorStatus.color}
              borderRadius={50}
              alignItems="center"
              justifyContent="center"
              width="100%"
              height={'70%'}
            >
              USO
            </Box>
          </Box>
        </Box>

        <Box width={'22%'} height="95%" alignItems="center" justifyContent="center">
          <Box
            width={'90%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
            _text={{ color: 'white' }}
          >
            GPS
            <Box
              bgColor={props.gpsStatus.color}
              borderRadius={50}
              alignItems="center"
              justifyContent="center"
              width="100%"
              height={'70%'}
            >
              OK
            </Box>
          </Box>
        </Box>

        <Box width={'22%'} height="95%" alignItems="center" justifyContent="center">
          <Box
            width={'90%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
            _text={{ color: 'white' }}
          >
            Bluetooth
            <Box
              bgColor={props.bluetoothStatus.color}
              borderRadius={50}
              alignItems="center"
              justifyContent="center"
              width="100%"
              height={'70%'}
            >
              ERROR
            </Box>
          </Box>
        </Box>

        <Box width={'22%'} height="95%" alignItems="center" justifyContent="center">
          <Box
            width={'90%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
            _text={{ color: 'white' }}
          >
            Velocidade
            <Box
              alignItems="center"
              justifyContent="center"
              width="100%"
              height={'70%'}
              _text={{ fontSize: 50, color: 'white', textAlign: 'center' }}
            >
              {props.velocity}
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export default memo(StatusBar);
