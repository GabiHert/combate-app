import { Box, Button, Stack, Text } from 'native-base';
import React, { useState } from 'react';
import { Theme } from '../../../../app/theme/theme';
import { Applicator } from '../../types/applicator';

function ApplicatorSelector(props: {
  leftApplicator: Applicator;
  centerApplicator: Applicator;
  rightApplicator: Applicator;
}) {
  const [leftApplicatorActive, setLeftApplicatorActive] = useState<boolean>(
    props.leftApplicator.active
  );
  const [centerApplicatorActive, setCenterApplicatorActive] = useState<boolean>(
    props.centerApplicator.active
  );
  const [rightApplicatorActive, setRightApplicatorActive] = useState<boolean>(
    props.rightApplicator.active
  );

  function onLeftApplicatorPress() {
    if (props.leftApplicator.available) {
      setLeftApplicatorActive(!leftApplicatorActive);
    }
  }

  function onRightApplicatorPress() {
    if (props.rightApplicator.available) {
      setRightApplicatorActive(!rightApplicatorActive);
    }
  }

  function onCenterApplicatorPress() {
    if (props.centerApplicator.available) {
      setCenterApplicatorActive(!centerApplicatorActive);
    }
  }

  return (
    <>
      <Box width="85%" borderRadius={20} height="95%" bgColor={Theme().color.b400}>
        <Text alignSelf={'center'} color="white" position={'absolute'}>
          Dosadores
        </Text>
        <Stack
          direction={'row'}
          alignItems="center"
          justifyContent="center"
          width="100%"
          paddingTop={'2'}
        >
          <Box width={'30%'} height="95%" alignItems="center" justifyContent="center">
            <Box
              width={'90%'}
              height="100%"
              alignItems="center"
              justifyContent="center"
              _text={{ color: 'white' }}
            >
              <Button
                isDisabled={!props.leftApplicator.available}
                onPressOut={onLeftApplicatorPress}
                _disabled={{ opacity: 0.5 }}
                bgColor={leftApplicatorActive ? Theme().color.sOk : Theme().color.b200}
                width="100%"
                height={'70%'}
                _text={{ color: 'black' }}
                borderRadius={50}
                _pressed={{ opacity: 0.8 }}
              >
                Esquerdo
              </Button>
            </Box>
          </Box>

          <Box width={'30%'} height="95%" alignItems="center" justifyContent="center">
            <Box
              width={'90%'}
              height="100%"
              alignItems="center"
              justifyContent="center"
              _text={{ color: 'white' }}
            >
              <Button
                isDisabled={!props.centerApplicator.available}
                onPressOut={onCenterApplicatorPress}
                _disabled={{ opacity: 0.5 }}
                bgColor={centerApplicatorActive ? Theme().color.sOk : Theme().color.b200}
                width="100%"
                height={'70%'}
                borderRadius={50}
                _text={{ color: 'black' }}
                _pressed={{ opacity: 0.8 }}
              >
                Central
              </Button>
            </Box>
          </Box>

          <Box width={'30%'} height="95%" alignItems="center" justifyContent="center">
            <Box
              width={'90%'}
              height="100%"
              alignItems="center"
              justifyContent="center"
              _text={{ color: 'white' }}
            >
              <Button
                isDisabled={!props.rightApplicator.available}
                onPressOut={onRightApplicatorPress}
                _disabled={{ opacity: 0.5 }}
                bgColor={rightApplicatorActive ? Theme().color.sOk : Theme().color.b200}
                width="100%"
                height={'70%'}
                borderRadius={50}
                _text={{ color: 'black' }}
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

export default ApplicatorSelector;
