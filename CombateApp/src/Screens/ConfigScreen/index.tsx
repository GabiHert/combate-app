import { Box, Button, Divider, FormControl, Input, ScrollView, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import FormInput from '../../Components/FormInput';
import { Theme } from '../../app/theme/theme';
import { ShowToast } from '../../Components/AlertToast';
import { SeverityEnum } from '../../api/core/enum/severity';
import { AConfig } from '../../api/core/adapter/config';

interface IPreset {
  name: string;
  doseAmount: number;
}

interface IConfigValidationResult {
  isValid: boolean;
  rightTankMaxLoadError: string;
  centerTankMaxLoadError: string;
  leftTankMaxLoadError: string;
  doseWeightKgError: string;
  preset1NameError: string;
  preset2NameError: string;
  preset3NameError: string;
  preset4NameError: string;
  preset1DoseError: string;
  preset2DoseError: string;
  preset3DoseError: string;
  preset4DoseError: string;
}

function ConfigScreen(props: { navigation: any; route: any }) {
  const config: AConfig = props.route.params.config;

  const [rightTankMaxLoad, setRightTankMaxLoad] = useState<number>();
  const [centerTankMaxLoad, setCenterTankMaxLoad] = useState<number>();
  const [leftTankMaxLoad, setLeftTankMaxLoad] = useState<number>();
  const [doseWeightKg, setDoseWeightKg] = useState<number>();
  const [preset1, setPreset1] = useState<IPreset>();
  const [preset2, setPreset2] = useState<IPreset>();
  const [preset3, setPreset3] = useState<IPreset>();
  const [preset4, setPreset4] = useState<IPreset>();

  const [rightTankMaxLoadError, setRightTankMaxLoadError] = useState<string>();
  const [centerTankMaxLoadError, setCenterTankMaxLoadError] = useState<string>();
  const [leftTankMaxLoadError, setLeftTankMaxLoadError] = useState<string>();
  const [doseWeightKgError, setDoseWeightKgError] = useState<string>();
  const [preset1NameError, setPreset1NameError] = useState<string>();
  const [preset2NameError, setPreset2NameError] = useState<string>();
  const [preset3NameError, setPreset3NameError] = useState<string>();
  const [preset4NameError, setPreset4NameError] = useState<string>();
  const [preset1DoseError, setPreset1DoseError] = useState<string>();
  const [preset2DoseError, setPreset2DoseError] = useState<string>();
  const [preset3DoseError, setPreset3DoseError] = useState<string>();
  const [preset4DoseError, setPreset4DoseError] = useState<string>();

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

  const onPreset1NameChange = useCallback(
    (text: string) => {
      const aux = preset1;
      aux.name = text;
      setPreset1(aux);
    },
    [preset1]
  );
  const onPreset2NameChange = useCallback(
    (text: string) => {
      const aux = preset2;
      aux.name = text;
      setPreset2(aux);
    },
    [preset2]
  );
  const onPreset3NameChange = useCallback(
    (text: string) => {
      const aux = preset3;
      aux.name = text;
      setPreset3(aux);
    },
    [preset3]
  );
  const onPreset4NameChange = useCallback(
    (text: string) => {
      const aux = preset4;
      aux.name = text;
      setPreset4(aux);
    },
    [preset4]
  );

  const onPreset1DoseChange = useCallback(
    (text: string) => {
      const aux = preset1;
      const doses = Math.trunc(Number(text));
      aux.doseAmount = doses;
      setPreset1(aux);
    },
    [preset1]
  );
  const onPreset2DoseChange = useCallback(
    (text: string) => {
      const aux = preset2;
      const doses = Math.trunc(Number(text));
      aux.doseAmount = doses;
      setPreset2(aux);
    },
    [preset2]
  );
  const onPreset3DoseChange = useCallback(
    (text: string) => {
      const aux = preset3;
      const doses = Math.trunc(Number(text));
      aux.doseAmount = doses;
      setPreset3(aux);
    },
    [preset3]
  );
  const onPreset4DoseChange = useCallback(
    (text: string) => {
      const aux = preset4;
      const doses = Math.trunc(Number(text));
      aux.doseAmount = doses;
      setPreset4(aux);
    },
    [preset4]
  );

  const onSavePressed = useCallback(async () => {
    //todo: call validation
    try {
      const result = {
        isValid: true,
        rightTankMaxLoadError: '',
        centerTankMaxLoadError: '',
        leftTankMaxLoadError: '',
        doseWeightKgError: '',
        preset1NameError: '',
        preset2NameError: '',
        preset3NameError: '',
        preset4NameError: '',
        preset1DoseError: '',
        preset2DoseError: '',
        preset3DoseError: '',
        preset4DoseError: '',
      };

      if (!result.isValid) {
        ShowToast({
          title: 'Erro ao salvar alterações',
          severity: SeverityEnum.ERROR,
          durationMs: 2000,
        });
        setRightTankMaxLoadError(result.rightTankMaxLoadError);
        setLeftTankMaxLoadError(result.leftTankMaxLoadError);
        setCenterTankMaxLoadError(result.centerTankMaxLoadError);
        setPreset1NameError(result.preset1NameError);
        setPreset2NameError(result.preset2NameError);
        setPreset3NameError(result.preset3NameError);
        setPreset4NameError(result.preset4NameError);
        setPreset1DoseError(result.preset1DoseError);
        setPreset2DoseError(result.preset2DoseError);
        setPreset3DoseError(result.preset3DoseError);
        setPreset4DoseError(result.preset4DoseError);
      } else {
        const data = {
          rightTankMaxLoad,
          centerTankMaxLoad,
          leftTankMaxLoad,
          doseWeightKg,
          preset1,
          preset2,
          preset3,
          preset4,
        };

        const cache = config.getCache();

        cache.APPLICATION.DOSE_WEIGHT_KG = data.doseWeightKg;
        cache.APPLICATION.RIGHT_TANK_MAX_LOAD = data.rightTankMaxLoad;
        cache.APPLICATION.CENTER_TANK_MAX_LOAD = data.centerTankMaxLoad;
        cache.APPLICATION.LEFT_TANK_MAX_LOAD = data.leftTankMaxLoad;
        cache.APPLICATION.DOSE_WEIGHT_KG = data.doseWeightKg;
        cache.PRESETS.P1.DOSE_AMOUNT = preset1.doseAmount;
        cache.PRESETS.P1.NAME = preset1.name;
        cache.PRESETS.P2.DOSE_AMOUNT = preset2.doseAmount;
        cache.PRESETS.P2.NAME = preset2.name;
        cache.PRESETS.P3.DOSE_AMOUNT = preset3.doseAmount;
        cache.PRESETS.P3.NAME = preset3.name;
        cache.PRESETS.P4.DOSE_AMOUNT = preset4.doseAmount;
        cache.PRESETS.P4.NAME = preset4.name;

        ShowToast({
          title: 'Aguarde, alterações sendo salvas...',
          severity: SeverityEnum.WARN,
          durationMs: 2000,
        });

        await config.update(cache);

        ShowToast({
          title: 'Alterações salvas com sucesso',
          severity: SeverityEnum.OK,
          durationMs: 2000,
        });
      }
    } catch (err) {
      ShowToast({
        title: 'Erro ao salvar alterações',
        severity: SeverityEnum.ERROR,
        message: err.message,
        durationMs: 2000,
      });
    }
  }, []);

  const onBackPressed = useCallback(() => {
    props.navigation.navigate('HomeScreen');
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
            errorMessage={rightTankMaxLoadError}
            placeholder="25"
            defaultValue={config.getCache().APPLICATION.RIGHT_TANK_MAX_LOAD.toString()}
            onChangeText={onRightTankMaxLoadChange}
            keyboardType={'numeric'}
          />
          <FormInput
            title="Reservatório central"
            description="Preencha este campo com a capacidade máxima do reservatório central (Kg)"
            errorMessage={centerTankMaxLoadError}
            placeholder="25"
            defaultValue={config.getCache().APPLICATION.CENTER_TANK_MAX_LOAD.toString()}
            onChangeText={onCenterTankMaxLoadChange}
            keyboardType={'numeric'}
          />
          <FormInput
            title="Reservatório esquerdo"
            description="Preencha este campo com a capacidade máxima do reservatório esquerdo (Kg)"
            errorMessage={leftTankMaxLoadError}
            placeholder="25"
            defaultValue={config.getCache().APPLICATION.LEFT_TANK_MAX_LOAD.toString()}
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
            errorMessage={doseWeightKgError}
            defaultValue={(config.getCache().APPLICATION.DOSE_WEIGHT_KG * 1000).toString()}
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
            errorMessage={preset1NameError}
            defaultValue={config.getCache().PRESETS.P1.NAME}
            placeholder="Quadrante"
            onChangeText={onPreset1NameChange}
          />
          <FormInput
            title="Doses"
            description="Preencha este campo com a quantidade de doses do Preset 1"
            errorMessage={preset1DoseError}
            placeholder="10"
            defaultValue={config.getCache().PRESETS.P1.DOSE_AMOUNT.toString()}
            onChangeText={onPreset1DoseChange}
            keyboardType={'numeric'}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Preset 2
          </FormControl.Label>
          <FormInput
            title="Nome preset"
            description="Preencha este campo com o nome do preset 2"
            errorMessage={preset2NameError}
            defaultValue={config.getCache().PRESETS.P2.NAME}
            placeholder="Quadrante"
            onChangeText={onPreset2NameChange}
          />
          <FormInput
            title="Doses"
            description="Preencha este campo com a quantidade de doses do Preset 2"
            errorMessage={preset2DoseError}
            defaultValue={config.getCache().PRESETS.P2.DOSE_AMOUNT.toString()}
            placeholder="10"
            onChangeText={onPreset2DoseChange}
            keyboardType={'numeric'}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Preset 3
          </FormControl.Label>
          <FormInput
            title="Nome preset"
            description="Preencha este campo com o nome do preset 3"
            errorMessage={preset3NameError}
            defaultValue={config.getCache().PRESETS.P3.NAME}
            placeholder="Quadrante"
            onChangeText={onPreset3NameChange}
          />
          <FormInput
            title="Doses"
            description="Preencha este campo com a quantidade de doses do Preset 3"
            errorMessage={preset3DoseError}
            defaultValue={config.getCache().PRESETS.P3.DOSE_AMOUNT.toString()}
            placeholder="10"
            onChangeText={onPreset3DoseChange}
            keyboardType={'numeric'}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Preset 4
          </FormControl.Label>
          <FormInput
            title="Nome preset"
            description="Preencha este campo com o nome do preset 4"
            errorMessage={preset4NameError}
            defaultValue={config.getCache().PRESETS.P4.NAME}
            placeholder="Quadrante"
            onChangeText={onPreset4NameChange}
          />
          <FormInput
            title="Doses"
            description="Preencha este campo com a quantidade de doses do Preset 4"
            errorMessage={preset4DoseError}
            defaultValue={config.getCache().PRESETS.P4.DOSE_AMOUNT.toString()}
            placeholder="10"
            onChangeText={onPreset4DoseChange}
            keyboardType={'numeric'}
          />
        </VStack>

        <Box w="20%" h="70px" />
      </ScrollView>

      <Box
        position={'absolute'}
        bottom={2}
        right={2}
        bgColor={Theme().color.b500}
        borderRadius={20}
        w="25%"
        h="60px"
      />
      <Box
        position={'absolute'}
        bottom={2}
        left={2}
        bgColor={Theme().color.b500}
        borderRadius={20}
        w="25%"
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
        w="25%"
        h="60px"
      >
        Salvar
      </Button>

      <Button
        onPress={onBackPressed}
        position={'absolute'}
        bottom={2}
        left={2}
        bgColor={Theme().color.sError}
        borderRadius={20}
        _pressed={{ opacity: 0.8 }}
        w="25%"
        h="60px"
      >
        Cancelar
      </Button>
    </Box>
  );
}

export default ConfigScreen;
