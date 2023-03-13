import { Box, Button, Divider, FormControl, Input, ScrollView, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import FormInput from '../../Components/FormInput';
import { Theme } from '../../app/theme/theme';
import { ShowToast } from '../../Components/AlertToast';
import { SeverityEnum } from '../../api/core/enum/severity';

interface Preset {
  name: string;
  doseAmount: number;
}

function ConfigScreen(props: { navigation: any }) {
  const [rightTankMaxLoad, setRightTankMaxLoad] = useState<number>();
  const [centerTankMaxLoad, setCenterTankMaxLoad] = useState<number>();
  const [leftTankMaxLoad, setLeftTankMaxLoad] = useState<number>();
  const [doseWeightKg, setDoseWeightKg] = useState<number>();
  const [preset1, setPreset1] = useState<Preset>();
  const [preset2, setPreset2] = useState<Preset>();
  const [preset3, setPreset3] = useState<Preset>();
  const [preset4, setPreset4] = useState<Preset>();

  function onRightTankMaxLoadChange(text: string) {
    setRightTankMaxLoad(Number(text));
  }
  function onLeftTankMaxLoadChange(text: string) {
    setLeftTankMaxLoad(Number(text));
  }
  function onCenterTankMaxLoadChange(text: string) {
    setCenterTankMaxLoad(Number(text));
  }
  function onDoseWeightChange(text: string) {
    const g = Number(text);
    const kg = Math.trunc(g * 1000);
    setDoseWeightKg(kg);
  }

  const onPreset1NameChange = useCallback((text: string) => {}, [preset1]);
  const onPreset2NameChange = useCallback((text: string) => {}, [preset2]);
  const onPreset3NameChange = useCallback((text: string) => {}, [preset3]);
  const onPreset4NameChange = useCallback((text: string) => {}, [preset4]);

  const onPreset1DoseChange = useCallback((text: string) => {}, [preset1]);
  const onPreset2DoseChange = useCallback((text: string) => {}, [preset2]);
  const onPreset3DoseChange = useCallback((text: string) => {}, [preset3]);
  const onPreset4DoseChange = useCallback((text: string) => {}, [preset4]);

  const onSavePressed = useCallback(() => {
    ShowToast({
      title: 'Alterações salvas com sucesso',
      severity: SeverityEnum.OK,
      durationMs: 2000,
    });
  }, []);

  return (
    <Box justifyContent={'center'} alignItems={'center'} h="100%">
      <ScrollView w="100%">
        <VStack space={4} justifyContent={'center'} alignItems={'center'} overflow={'hidden'}>
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Capacidade Reservatórios
          </FormControl.Label>
          <FormInput
            title="Reservatório direito"
            description="Preencha este campo com a capacidade máxima do reservatório direito (Kg)"
            errorMessage={''}
            placeholder="25"
            onChangeText={onRightTankMaxLoadChange}
            keyboardType={'numeric'}
          />
          <FormInput
            title="Reservatório central"
            description="Preencha este campo com a capacidade máxima do reservatório central (Kg)"
            errorMessage={''}
            placeholder="25"
            onChangeText={onCenterTankMaxLoadChange}
            keyboardType={'numeric'}
          />
          <FormInput
            title="Reservatório esquerdo"
            description="Preencha este campo com a capacidade máxima do reservatório esquerdo (Kg)"
            errorMessage={''}
            placeholder="25"
            onChangeText={onLeftTankMaxLoadChange}
            keyboardType={'numeric'}
          />
          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Informações Dosagem
          </FormControl.Label>
          <FormInput
            title="Peso dose"
            description="Preencha este campo com o peso de cada dose (g)"
            errorMessage={''}
            placeholder="25"
            onChangeText={onDoseWeightChange}
            keyboardType={'numeric'}
          />
          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Preset 1
          </FormControl.Label>
          <FormInput
            title="Nome preset"
            description="Preencha este campo com o nome do preset 1"
            errorMessage={''}
            placeholder="Quadrante"
            onChangeText={() => {}}
          />
          <FormInput
            title="Doses"
            description="Preencha este campo com a quantidade de doses do Preset 1"
            errorMessage={''}
            placeholder="10"
            onChangeText={() => {}}
            keyboardType={'numeric'}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Preset 2
          </FormControl.Label>
          <FormInput
            title="Nome preset"
            description="Preencha este campo com o nome do preset 2"
            errorMessage={''}
            placeholder="Quadrante"
            onChangeText={() => {}}
          />
          <FormInput
            title="Doses"
            description="Preencha este campo com a quantidade de doses do Preset 2"
            errorMessage={''}
            placeholder="10"
            onChangeText={() => {}}
            keyboardType={'numeric'}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Preset 3
          </FormControl.Label>
          <FormInput
            title="Nome preset"
            description="Preencha este campo com o nome do preset 3"
            errorMessage={''}
            placeholder="Quadrante"
            onChangeText={() => {}}
          />
          <FormInput
            title="Doses"
            description="Preencha este campo com a quantidade de doses do Preset 3"
            errorMessage={''}
            placeholder="10"
            onChangeText={() => {}}
            keyboardType={'numeric'}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Preset 4
          </FormControl.Label>
          <FormInput
            title="Nome preset"
            description="Preencha este campo com o nome do preset 4"
            errorMessage={''}
            placeholder="Quadrante"
            onChangeText={() => {}}
          />
          <FormInput
            title="Doses"
            description="Preencha este campo com a quantidade de doses do Preset 4"
            errorMessage={''}
            placeholder="10"
            onChangeText={() => {}}
            keyboardType={'numeric'}
          />
        </VStack>

        <Box w="20%" h="60px" />
      </ScrollView>

      <Box
        position={'absolute'}
        bottom={2}
        right={2}
        bgColor={Theme().color.b500}
        borderRadius={20}
        w="20%"
        h="60px"
      />
      <Button
        onPress={onSavePressed}
        position={'absolute'}
        bottom={2}
        right={2}
        bgColor={Theme().color.b300}
        borderRadius={20}
        _pressed={{ opacity: 0.8 }}
        w="20%"
        h="60px"
      >
        Salvar
      </Button>
    </Box>
  );
}

export default ConfigScreen;
