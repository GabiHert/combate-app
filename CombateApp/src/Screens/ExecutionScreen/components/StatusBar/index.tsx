import { Box, Stack } from 'native-base';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Severity } from '../../../../api/core/enum/severity';
import { Theme } from '../../../../app/theme/theme';

function StatusBar(props: {
  applicatorStatusChange: () => Severity;
  gpsStatus: Severity;
  bluetoothStatus: Severity;
  velocity: number;
}) {
  const [applicatorStatus, setApplicatorStatus] = useState(props.applicatorStatusChange());
  const [gpsStatus, setGpsStatus] = useState(props.gpsStatus);
  const [bluetoothStatus, setBluetoothStatus] = useState(props.bluetoothStatus);

  useEffect(() => {
    console.log(props.applicatorStatusChange().name);
    setApplicatorStatus(props.applicatorStatusChange());
  }, [props.applicatorStatusChange]);

  useEffect(() => {
    setGpsStatus(props.gpsStatus);
  }, [props.gpsStatus]);

  useEffect(() => {
    setBluetoothStatus(props.bluetoothStatus);
  }, [props.bluetoothStatus]);

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
              bgColor={applicatorStatus.color}
              borderRadius={50}
              alignItems="center"
              justifyContent="center"
              width="100%"
              height={'70%'}
            >
              {applicatorStatus.message}
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
              bgColor={gpsStatus.color}
              borderRadius={50}
              alignItems="center"
              justifyContent="center"
              width="100%"
              height={'70%'}
            >
              {gpsStatus.message}
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
              bgColor={bluetoothStatus.color}
              borderRadius={50}
              alignItems="center"
              justifyContent="center"
              width="100%"
              height={'70%'}
            >
              {bluetoothStatus.message}
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
