import { Box, Button, Stack, Text } from 'native-base';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Theme } from '../../../../app/theme/theme';
import { Applicator } from '../../types/applicator';

function ApplicatorSelector(props: {
  leftApplicator: Applicator;
  centerApplicator: Applicator;
  rightApplicator: Applicator;
  onLeftApplicatorSelected: (state: boolean) => void;
  onRightApplicatorSelected: (state: boolean) => void;
  onCenterApplicatorSelected: (state: boolean) => void;
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

  useEffect(() => {
    setCenterApplicatorActive(props.centerApplicator.active);
    setRightApplicatorActive(props.rightApplicator.active);
    setLeftApplicatorActive(props.leftApplicator.active);
  }, [props.leftApplicator.active, props.rightApplicator.active, props.centerApplicator.active]);

  function onLeftApplicatorPress() {
    if (props.leftApplicator.available) {
      setLeftApplicatorActive(!leftApplicatorActive);
      props.onLeftApplicatorSelected(!leftApplicatorActive);
    }
  }

  function onRightApplicatorPress() {
    if (props.rightApplicator.available) {
      setRightApplicatorActive(!rightApplicatorActive);
      props.onRightApplicatorSelected(!rightApplicatorActive);
    }
  }

  function onCenterApplicatorPress() {
    if (props.centerApplicator.available) {
      setCenterApplicatorActive(!centerApplicatorActive);
      props.onCenterApplicatorSelected(!centerApplicatorActive);
    }
  }

  function getButtonColor(isActive: boolean, isAvailable: boolean): string {
    if (!isAvailable) {
      return Theme().color.b200;
    }
    return isActive ? Theme().color.sOk : Theme().color.sError;
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
                onPress={onLeftApplicatorPress}
                _disabled={{ opacity: 0.5 }}
                bgColor={getButtonColor(leftApplicatorActive, props.leftApplicator.available)}
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
                onPress={onCenterApplicatorPress}
                _disabled={{ opacity: 0.5 }}
                bgColor={getButtonColor(centerApplicatorActive, props.centerApplicator.available)}
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
                onPress={onRightApplicatorPress}
                _disabled={{ opacity: 0.5 }}
                bgColor={getButtonColor(rightApplicatorActive, props.rightApplicator.available)}
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
