import { Box, Button, Divider, FormControl, Input, ScrollView, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import FormInput from '../../Components/FormInput';
import { Theme } from '../../app/theme/theme';
import { ShowToast } from '../../Components/AlertToast';
import { SeverityEnum } from '../../api/core/enum/severity';
import { config } from '../../api/core/port/config-port';
import SlideInput from '../../Components/SlideInput';
import { CONSTANTS } from '../../api/config/config';
import ScrollItems from '../../Components/ScrollItems';

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
  const [rightTankMaxLoad, setRightTankMaxLoad] = useState<number>(
    config.getCache().APPLICATION.RIGHT_TANK_MAX_LOAD
  );
  const [centerTankMaxLoad, setCenterTankMaxLoad] = useState<number>(
    config.getCache().APPLICATION.CENTER_TANK_MAX_LOAD
  );
  const [leftTankMaxLoad, setLeftTankMaxLoad] = useState<number>(
    config.getCache().APPLICATION.LEFT_TANK_MAX_LOAD
  );
  const [doseWeightKg, setDoseWeightKg] = useState<number>(
    config.getCache().APPLICATION.DOSE_WEIGHT_KG
  );
  const [preset1, setPreset1] = useState<IPreset>({
    doseAmount: config.getCache().PRESETS.P1.DOSE_AMOUNT,
    name: config.getCache().PRESETS.P1.NAME,
  });
  const [preset2, setPreset2] = useState<IPreset>({
    doseAmount: config.getCache().PRESETS.P2.DOSE_AMOUNT,
    name: config.getCache().PRESETS.P2.NAME,
  });
  const [preset3, setPreset3] = useState<IPreset>({
    doseAmount: config.getCache().PRESETS.P3.DOSE_AMOUNT,
    name: config.getCache().PRESETS.P3.NAME,
  });
  const [preset4, setPreset4] = useState<IPreset>({
    doseAmount: config.getCache().PRESETS.P4.DOSE_AMOUNT,
    name: config.getCache().PRESETS.P4.NAME,
  });
  const [preset5, setPreset5] = useState<IPreset>({
    doseAmount: config.getCache().PRESETS.P5.DOSE_AMOUNT,
    name: config.getCache().PRESETS.P5.NAME,
  });
  const [preset6, setPreset6] = useState<IPreset>({
    doseAmount: config.getCache().PRESETS.P6.DOSE_AMOUNT,
    name: config.getCache().PRESETS.P6.NAME,
  });

  const [rightTankMaxLoadError, setRightTankMaxLoadError] = useState<string>();
  const [centerTankMaxLoadError, setCenterTankMaxLoadError] = useState<string>();
  const [leftTankMaxLoadError, setLeftTankMaxLoadError] = useState<string>();
  const [doseWeightKgError, setDoseWeightKgError] = useState<string>();
  const [preset1NameError, setPreset1NameError] = useState<string>();
  const [preset2NameError, setPreset2NameError] = useState<string>();
  const [preset3NameError, setPreset3NameError] = useState<string>();
  const [preset4NameError, setPreset4NameError] = useState<string>();
  const [preset5NameError, setPreset5NameError] = useState<string>();
  const [preset6NameError, setPreset6NameError] = useState<string>();

  const [preset1DoseError, setPreset1DoseError] = useState<string>();
  const [preset2DoseError, setPreset2DoseError] = useState<string>();
  const [preset3DoseError, setPreset3DoseError] = useState<string>();
  const [preset4DoseError, setPreset4DoseError] = useState<string>();
  const [preset5DoseError, setPreset5DoseError] = useState<string>();
  const [preset6DoseError, setPreset6DoseError] = useState<string>();

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
  const onPreset5NameChange = useCallback(
    (text: string) => {
      const aux = preset5;
      aux.name = text;
      setPreset5(aux);
    },
    [preset5]
  );
  const onPreset6NameChange = useCallback(
    (text: string) => {
      const aux = preset6;
      aux.name = text;
      setPreset6(aux);
    },
    [preset6]
  );

  const onPreset1DoseChange = useCallback(
    (doses: number) => {
      const aux = preset1;
      aux.doseAmount = doses;
      setPreset1(aux);
    },
    [preset1]
  );
  const onPreset2DoseChange = useCallback(
    (doses: number) => {
      const aux = preset2;
      aux.doseAmount = doses;
      setPreset2(aux);
    },
    [preset2]
  );
  const onPreset3DoseChange = useCallback(
    (doses: number) => {
      const aux = preset3;
      aux.doseAmount = doses;
      setPreset3(aux);
    },
    [preset3]
  );
  const onPreset4DoseChange = useCallback(
    (doses: number) => {
      const aux = preset4;
      aux.doseAmount = doses;
      setPreset4(aux);
    },
    [preset4]
  );
  const onPreset5DoseChange = useCallback(
    (doses: number) => {
      const aux = preset5;
      aux.doseAmount = doses;
      setPreset5(aux);
    },
    [preset5]
  );
  const onPreset6DoseChange = useCallback(
    (doses: number) => {
      const aux = preset6;
      aux.doseAmount = doses;
      setPreset6(aux);
    },
    [preset6]
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
        preset5NameError: '',
        preset6NameError: '',

        preset1DoseError: '',
        preset2DoseError: '',
        preset3DoseError: '',
        preset4DoseError: '',
        preset5DoseError: '',
        preset6DoseError: '',
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
        setPreset5NameError(result.preset5NameError);
        setPreset6NameError(result.preset6NameError);

        setPreset1DoseError(result.preset1DoseError);
        setPreset2DoseError(result.preset2DoseError);
        setPreset3DoseError(result.preset3DoseError);
        setPreset4DoseError(result.preset4DoseError);
        setPreset4DoseError(result.preset4DoseError);
        setPreset4DoseError(result.preset4DoseError);

        setDoseWeightKgError(result.doseWeightKgError);
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

  return (
    <Box justifyContent={'center'} alignItems={'center'} h="100%">
      <ScrollView w="100%">
        <VStack space={4} justifyContent={'center'} alignItems={'center'} overflow={'hidden'}>
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
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
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
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
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
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
          <SlideInput
            onChangeEnd={onPreset1DoseChange}
            step={0.5}
            title={'Doses'}
            defaultValue={config.getCache().PRESETS.P1.DOSE_AMOUNT}
            disabled={false}
            maxValue={config.getCache().APPLICATION.MAX_DOSES}
            minValue={config.getCache().APPLICATION.MIN_DOSES}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
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
          <SlideInput
            onChangeEnd={onPreset2DoseChange}
            step={0.5}
            title={'Doses'}
            defaultValue={config.getCache().PRESETS.P2.DOSE_AMOUNT}
            disabled={false}
            maxValue={config.getCache().APPLICATION.MAX_DOSES}
            minValue={config.getCache().APPLICATION.MIN_DOSES}
          />
          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
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
          <SlideInput
            onChangeEnd={onPreset3DoseChange}
            step={0.5}
            title={'Doses'}
            defaultValue={config.getCache().PRESETS.P3.DOSE_AMOUNT}
            disabled={false}
            maxValue={config.getCache().APPLICATION.MAX_DOSES}
            minValue={config.getCache().APPLICATION.MIN_DOSES}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
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
          <SlideInput
            onChangeEnd={onPreset4DoseChange}
            step={0.5}
            title={'Doses'}
            defaultValue={config.getCache().PRESETS.P4.DOSE_AMOUNT}
            disabled={false}
            maxValue={config.getCache().APPLICATION.MAX_DOSES}
            minValue={config.getCache().APPLICATION.MIN_DOSES}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
            Preset 5
          </FormControl.Label>
          <FormInput
            title="Nome preset"
            description="Preencha este campo com o nome do preset 5"
            errorMessage={preset4NameError}
            defaultValue={config.getCache().PRESETS.P5.NAME}
            placeholder="Quadrante"
            onChangeText={onPreset5NameChange}
          />

          <SlideInput
            onChangeEnd={onPreset5DoseChange}
            step={0.5}
            title={'Doses'}
            defaultValue={config.getCache().PRESETS.P5.DOSE_AMOUNT}
            disabled={false}
            maxValue={config.getCache().APPLICATION.MAX_DOSES}
            minValue={config.getCache().APPLICATION.MIN_DOSES}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
            Preset 6
          </FormControl.Label>
          <FormInput
            title="Nome preset"
            description="Preencha este campo com o nome do preset 6"
            errorMessage={preset4NameError}
            defaultValue={config.getCache().PRESETS.P6.NAME}
            placeholder="Quadrante"
            onChangeText={onPreset6NameChange}
          />
          <SlideInput
            onChangeEnd={onPreset6DoseChange}
            step={0.5}
            title={'Doses'}
            defaultValue={config.getCache().PRESETS.P6.DOSE_AMOUNT}
            disabled={false}
            maxValue={config.getCache().APPLICATION.MAX_DOSES}
            minValue={config.getCache().APPLICATION.MIN_DOSES}
          />

          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
            Dose Sistemática
          </FormControl.Label>
          <SlideInput
            onChangeEnd={() => {}}
            step={0.5}
            title={'Metros entre cada dose'}
            unit={'metros'}
            defaultValue={config.getCache().SYSTEMATIC_DOSE.METERS_BETWEEN_DOSE}
            disabled={false}
            maxValue={10}
            minValue={0}
          />
          <SlideInput
            onChangeEnd={() => {}}
            step={0.5}
            title={'Quantidade de doses'}
            unit={'doses'}
            defaultValue={config.getCache().SYSTEMATIC_DOSE.DOSE_AMOUNT}
            disabled={false}
            maxValue={10}
            minValue={0}
          />
          <Divider w="80%" />
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
            Motivos de Parada
          </FormControl.Label>

          <ScrollItems
            maxH={'80'}
            items={[
              { label: 'TESTE', value: {} },
              { label: 'TESTE', value: {} },
              { label: 'TESTE', value: {} },
              { label: 'TESTE', value: {} },
              { label: 'TESTE', value: {} },
              { label: 'TESTE', value: {} },
              { label: 'TESTE', value: {} },
            ]}
            w={'80%'}
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
    </Box>
  );
}

export default ConfigScreen;
