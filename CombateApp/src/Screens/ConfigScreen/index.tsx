import { Box, Button, Divider, FormControl, ScrollView, VStack } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { v1 } from 'uuid';
import { appConfig } from '../../app/config/app-config';
import { Instance } from '../../app/instance/instance';
import { itemArrayToMapString } from '../../app/parser/item-array-to-map-string';
import { mapStringToItemArray } from '../../app/parser/map-string-to-item-array';
import { Theme } from '../../app/theme/theme';
import { Validator } from '../../cmd/formvalidator/form-validator';
import { ShowToast } from '../../Components/AlertToast';
import FormInput from '../../Components/FormInput';
import SelectInput from '../../Components/SelectInput';
import SlideInput from '../../Components/SlideInput';
import { CONSTANTS } from '../../internal/config/config';
import { poisonItems } from '../../internal/core/enum/poison';
import { SeverityEnum } from '../../internal/core/enum/severity';
import { IConfigFormResult } from '../../internal/interface/config-form-result';
import { IConfigsProps } from '../../internal/interface/config-props';
import ItemListInput from './components/ItemListInput';
import ItemRegisterModal from './components/ItemRegisterModal';

interface IPreset {
  name: string;
  doseAmount: number;
}

function ConfigScreen(props: { navigation: any; route: any }) {
  const [rightTankMaxLoad, setRightTankMaxLoad] = useState<number>(
    Instance.GetInstance().configCache.getCache().APPLICATION.RIGHT_TANK_MAX_LOAD
  );
  const [centerTankMaxLoad, setCenterTankMaxLoad] = useState<number>(
    Instance.GetInstance().configCache.getCache().APPLICATION.CENTER_TANK_MAX_LOAD
  );
  const [leftTankMaxLoad, setLeftTankMaxLoad] = useState<number>(
    Instance.GetInstance().configCache.getCache().APPLICATION.LEFT_TANK_MAX_LOAD
  );
  const [doseWeightG, setDoseWeightG] = useState<number>(
    Instance.GetInstance().configCache.getCache().APPLICATION.DOSE_WEIGHT_G
  );
  const [metersBetweenDose, setMetersBetweenDose] = useState<number>(
    Instance.GetInstance().configCache.getCache().SYSTEMATIC_DOSE.METERS_BETWEEN_DOSE
  );

  useEffect(()=>{

  },[metersBetweenDose])

  const [filePath, setFilePath] = useState(Instance.GetInstance().configCache.getCache().FILE_PATH);
  const [preset1, setPreset1] = useState<IPreset>({
    doseAmount: Instance.GetInstance().configCache.getCache().PRESETS.P1.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P1.NAME,
  });
  const [preset2, setPreset2] = useState<IPreset>({
    doseAmount: Instance.GetInstance().configCache.getCache().PRESETS.P2.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P2.NAME,
  });
  const [preset3, setPreset3] = useState<IPreset>({
    doseAmount: Instance.GetInstance().configCache.getCache().PRESETS.P3.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P3.NAME,
  });
  const [preset4, setPreset4] = useState<IPreset>({
    doseAmount: Instance.GetInstance().configCache.getCache().PRESETS.P4.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P4.NAME,
  });
  const [preset5, setPreset5] = useState<IPreset>({
    doseAmount: Instance.GetInstance().configCache.getCache().PRESETS.P5.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P5.NAME,
  });
  const [preset6, setPreset6] = useState<IPreset>({
    doseAmount: Instance.GetInstance().configCache.getCache().PRESETS.P6.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P6.NAME,
  });
  const [maxVelocity, setMaxVelocity] = useState<number>(Instance.GetInstance().configCache.getCache().APPLICATION.MAX_VELOCITY);
  const [lineSpacing, setLineSpacing] = useState<number>(Instance.GetInstance().configCache.getCache().LINE_SPACING);

  const [errors, setErrors] = useState<IConfigFormResult>({
    valid: true,
    maxVelocity: { errorMessage: undefined },
    centerTankMaxLoad: { errorMessage: undefined },
    doseWeightG: { errorMessage: undefined },
    leftTankMaxLoad: { errorMessage: undefined },
    preset1Dose: { errorMessage: undefined },
    preset1Name: { errorMessage: undefined },
    preset2Dose: { errorMessage: undefined },
    preset2Name: { errorMessage: undefined },
    preset3Dose: { errorMessage: undefined },
    preset3Name: { errorMessage: undefined },
    preset4Dose: { errorMessage: undefined },
    preset4Name: { errorMessage: undefined },
    events: { errorMessage: undefined },
    farms: { errorMessage: undefined },
    filePath: { errorMessage: undefined },
    plots: { errorMessage: undefined },
    poisonType: { errorMessage: undefined },
    preset5Dose: { errorMessage: undefined },
    preset5Name: { errorMessage: undefined },
    preset6Dose: { errorMessage: undefined },
    preset6Name: { errorMessage: undefined },
    lineSpacing: { errorMessage: undefined },
    metersBetweenDose: { errorMessage: undefined },
    stopReasonEvent: { errorMessage: undefined },
    rightTankMaxLoad: { errorMessage: undefined },
  });

  const [stopReasons, setStopReasons] = useState<Array<{ id: string; name: string }>>(
    mapStringToItemArray(Instance.GetInstance().configCache.getCache().STOP_REASONS_EVENTS)
  );
  const [events, setEvents] = useState<Array<{ id: string; name: string }>>(
    mapStringToItemArray(Instance.GetInstance().configCache.getCache().EVENTS)
  );

  const [farms, setFarms] = useState<Array<{ id: string; name: string }>>(
    mapStringToItemArray(Instance.GetInstance().configCache.getCache().FARMS)
  );

  const [plots, setPlots] = useState<Array<{ id: string; name: string }>>(
    mapStringToItemArray(Instance.GetInstance().configCache.getCache().PLOTS)
  );

  const [poison, setPoison] = useState(Instance.GetInstance().configCache.getCache().POISON_TYPE);

  const [addReasonModalVisible, setAddReasonModalVisible] = useState(false);
  const [addEventModalVisible, setAddEventModalVisible] = useState(false);
  const [addFarmModalVisible, setAddFarmModalVisible] = useState(false);
  const [addPlotModalVisible, setAddPlotModalVisible] = useState(false);

  function onRightTankMaxLoadChange(text: string) {
    setRightTankMaxLoad(Number(text));
  }
  function onLeftTankMaxLoadChange(text: string) {
    setLeftTankMaxLoad(Number(text));
  }
  function onCenterTankMaxLoadChange(text: string) {
    setCenterTankMaxLoad(Number(text));
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

  const onAddEventPress = useCallback(() => {
    setAddEventModalVisible(true);
  }, [setAddEventModalVisible]);
  const onAddEventModalClose = useCallback(() => {
    setAddEventModalVisible(false);
  }, [setAddEventModalVisible]);
  const onAddEventRequested = useCallback(
    (name: string) => {
      let cache = Instance.GetInstance().configCache.getCache();
      const id = v1();
      cache.EVENTS[id] = name;
      Instance.GetInstance().configCache.update(cache);
      setEvents(mapStringToItemArray(cache.EVENTS));
    },
    [setEvents]
  );
  const onDeleteEventRequested = useCallback(
    (id: string) => {
      let cache = Instance.GetInstance().configCache.getCache();
      delete cache.EVENTS[id];
      Instance.GetInstance().configCache.update(cache);
      setEvents(mapStringToItemArray(cache.EVENTS));
    },
    [setEvents]
  );

  const onAddFarmPress = useCallback(() => {
    setAddFarmModalVisible(true);
  }, [setAddFarmModalVisible]);
  const onAddFarmModalClose = useCallback(() => {
    setAddFarmModalVisible(false);
  }, [setAddFarmModalVisible]);
  const onAddFarmRequested = useCallback(
    (name: string) => {
      let cache = Instance.GetInstance().configCache.getCache();
      const id = v1();
      cache.FARMS[id] = name;
      Instance.GetInstance().configCache.update(cache);
      setFarms(mapStringToItemArray(cache.FARMS));
    },
    [setFarms, farms]
  );
  const onDeleteFarmRequested = useCallback(
    async (id: string) => {
      let cache = Instance.GetInstance().configCache.getCache();
      delete cache.FARMS[id];
      Instance.GetInstance().configCache.update(cache);
      setFarms(mapStringToItemArray(cache.FARMS));
    },
    [setFarms, farms]
  );

  const onAddPlotPress = useCallback(() => {
    setAddPlotModalVisible(true);
  }, [setAddPlotModalVisible]);

  const onAddPlotModalClose = useCallback(() => {
    setAddPlotModalVisible(false);
  }, [setAddPlotModalVisible]);

  const onAddPlotRequested = useCallback(
    (name: string) => {
      let cache = Instance.GetInstance().configCache.getCache();
      const id = v1();
      cache.PLOTS[id] = name;
      Instance.GetInstance().configCache.update(cache);
      setPlots(mapStringToItemArray(cache.PLOTS));
    },
    [setPlots, plots]
  );

  const onDeletePlotRequested = useCallback(
    (id: string) => {
      let cache = Instance.GetInstance().configCache.getCache();
      delete cache.PLOTS[id];
      Instance.GetInstance().configCache.update(cache);
      setPlots(mapStringToItemArray(cache.PLOTS));
    },
    [setPlots, plots]
  );

  const onAddStopReasonPress = useCallback(() => {
    setAddReasonModalVisible(true);
  }, [setAddReasonModalVisible]);

  const onAddReasonModalClose = useCallback(() => {
    setAddReasonModalVisible(false);
  }, [setAddReasonModalVisible]);

  const onAddStopReasonRequested = useCallback((name: string) => {
    let cache = Instance.GetInstance().configCache.getCache();
    const id = v1();
    cache.STOP_REASONS_EVENTS[id] = name;
    Instance.GetInstance().configCache.update(cache);
    setStopReasons(mapStringToItemArray(cache.STOP_REASONS_EVENTS));
  }, []);

  const onDeleteStopReasonRequested = useCallback(
    (id: string) => {
      let cache = Instance.GetInstance().configCache.getCache();
      delete cache.STOP_REASONS_EVENTS[id];
      Instance.GetInstance().configCache.update(cache);
      setStopReasons(mapStringToItemArray(cache.STOP_REASONS_EVENTS));
    },
    [setStopReasons]
  );

  const onSavePressed = useCallback(async () => {
    try {
      const data: IConfigsProps = {
        EVENTS: itemArrayToMapString(events),
        FARMS: itemArrayToMapString(farms),
        PLOTS: itemArrayToMapString(plots),
        STOP_REASONS_EVENTS: itemArrayToMapString(stopReasons),
        APPLICATION: {
          MAX_VELOCITY: maxVelocity,
          CENTER_TANK_MAX_LOAD: centerTankMaxLoad,
          DOSE_WEIGHT_G: doseWeightG,
          LEFT_TANK_MAX_LOAD: leftTankMaxLoad,
          RIGHT_TANK_MAX_LOAD: rightTankMaxLoad,
        },
        PRESETS: {
          P1: { NAME: preset1.name, DOSE_AMOUNT: preset1.doseAmount },
          P2: { NAME: preset2.name, DOSE_AMOUNT: preset2.doseAmount },
          P3: { NAME: preset3.name, DOSE_AMOUNT: preset3.doseAmount },
          P4: { NAME: preset4.name, DOSE_AMOUNT: preset4.doseAmount },
          P5: { NAME: preset5.name, DOSE_AMOUNT: preset5.doseAmount },
          P6: { NAME: preset6.name, DOSE_AMOUNT: preset6.doseAmount },
        },
        FILE_PATH: filePath,
        POISON_TYPE: poison,
        LINE_SPACING: lineSpacing,
        SYSTEMATIC_DOSE: { METERS_BETWEEN_DOSE: metersBetweenDose },
      };

      const result = Instance.GetInstance().validator.validateConfigForm(data);
      setErrors(result);

      if (!result.valid) {
        ShowToast({
          title: 'Erro ao salvar alterações',
          severity: SeverityEnum.ERROR,
          message: 'Revise o formulário',
          durationMs: 2000,
        });
      } else {
        if (data != Instance.GetInstance().configCache.getCache()) {
          const cache = Instance.GetInstance().configCache.getCache();

          cache.APPLICATION.DOSE_WEIGHT_G = doseWeightG;
          cache.APPLICATION.RIGHT_TANK_MAX_LOAD = rightTankMaxLoad;
          cache.APPLICATION.CENTER_TANK_MAX_LOAD = centerTankMaxLoad;
          cache.APPLICATION.LEFT_TANK_MAX_LOAD = leftTankMaxLoad;
          cache.APPLICATION.MAX_VELOCITY = maxVelocity;
          cache.PRESETS.P1.DOSE_AMOUNT = preset1.doseAmount;
          cache.PRESETS.P1.NAME = preset1.name;
          cache.PRESETS.P2.DOSE_AMOUNT = preset2.doseAmount;
          cache.PRESETS.P2.NAME = preset2.name;
          cache.PRESETS.P3.DOSE_AMOUNT = preset3.doseAmount;
          cache.PRESETS.P3.NAME = preset3.name;
          cache.PRESETS.P4.DOSE_AMOUNT = preset4.doseAmount;
          cache.PRESETS.P4.NAME = preset4.name;
          cache.PRESETS.P5.DOSE_AMOUNT = preset5.doseAmount;
          cache.PRESETS.P5.NAME = preset5.name;
          cache.PRESETS.P6.DOSE_AMOUNT = preset6.doseAmount;
          cache.PRESETS.P6.NAME = preset6.name;
          cache.POISON_TYPE = poison;
          cache.LINE_SPACING = lineSpacing;
          cache.SYSTEMATIC_DOSE.METERS_BETWEEN_DOSE = metersBetweenDose;
          cache.FILE_PATH = filePath;

          await Instance.GetInstance().configCache.update(cache);

          ShowToast({
            title: 'Alterações salvas com sucesso',
            severity: SeverityEnum.OK,
            durationMs: 2000,
          });
        } else {
          ShowToast({
            title: 'Nenhuma alteração foi detectada',
            severity: SeverityEnum.OK,
            durationMs: 2000,
          });
        }
      }
    } catch (err) {
     await Instance.GetInstance().errorHandler.handle(err)
    }
  }, [
    doseWeightG,
    rightTankMaxLoad,
    centerTankMaxLoad,
    leftTankMaxLoad,
    preset1,
    preset2,
    preset3,
    preset4,
    preset5,
    preset6,
    poison,
    filePath,
    lineSpacing,
    farms,
    plots,
    errors,
    maxVelocity,
  ]);

  return (
    <Box justifyContent={'center'} alignItems={'center'} h="100%">
      <ItemRegisterModal
        title="Adicionar motivo de parada"
        formTitle="Motivo de parada"
        formDescription="Digite o motivo de parada a ser adicionado"
        onAddPressed={onAddStopReasonRequested}
        isOpen={addReasonModalVisible}
        onClose={onAddReasonModalClose}
        validator={(value) => {
          if (!Validator.BasicStringValidation(value)) {
            return CONSTANTS.ERRORS.STOP_REASON_FORM.INVALID_STOP_REASON;
          }
          let error = undefined;
          Object.keys(Instance.GetInstance().configCache.getCache().STOP_REASONS_EVENTS).forEach((key) => {
            if (value == Instance.GetInstance().configCache.getCache().STOP_REASONS_EVENTS[key]){
              error = CONSTANTS.ERRORS.STOP_REASON_FORM.INVALID_STOP_REASON
            }
          });
          return error;
        }}
      />
      <ItemRegisterModal
        title="Adicionar evento"
        formTitle="Evento"
        formDescription="Digite o evento a ser adicionado"
        onAddPressed={onAddEventRequested}
        isOpen={addEventModalVisible}
        onClose={onAddEventModalClose}
        validator={(value) => {
          if (!Validator.BasicStringValidation(value)) {
            return CONSTANTS.ERRORS.EVENT_FORM.INVALID_EVENT;
          }
          let error = undefined;
          Object.keys(Instance.GetInstance().configCache.getCache().EVENTS).forEach((key) => {
            if (value == Instance.GetInstance().configCache.getCache().EVENTS[key]){
              error = CONSTANTS.ERRORS.EVENT_FORM.INVALID_EVENT
            }
          });
          return error;
        }}
      />
      <ItemRegisterModal
        title="Adicionar fazenda"
        formTitle="Nome fazenda"
        formDescription="Digite nome da fazenda a ser adicionada"
        onAddPressed={onAddFarmRequested}
        isOpen={addFarmModalVisible}
        onClose={onAddFarmModalClose}
        validator={(value) => {
          if (!Validator.BasicStringValidation(value)) {
            return CONSTANTS.ERRORS.FARM_FORM.INVALID_FARM;
          }
          let error = undefined;
          Object.keys(Instance.GetInstance().configCache.getCache().FARMS).forEach((key) => {
            if (value == Instance.GetInstance().configCache.getCache().FARMS[key]){
              error = CONSTANTS.ERRORS.FARM_FORM.INVALID_FARM
            }
          });
          return error;
        }}
      />
      <ItemRegisterModal
        title="Adicionar talhão"
        formTitle="Nome talão"
        formDescription="Digite nome do talhão a ser adicionado"
        onAddPressed={onAddPlotRequested}
        isOpen={addPlotModalVisible}
        onClose={onAddPlotModalClose}
        validator={(value) => {
          if (!Validator.BasicStringValidation(value)) {
            return CONSTANTS.ERRORS.PLOT_FORM.INVALID_PLOT;
          }
          let error = undefined;
          Object.keys(Instance.GetInstance().configCache.getCache().PLOTS).forEach((key) => {
            if (value == Instance.GetInstance().configCache.getCache().PLOTS[key]){
              error = CONSTANTS.ERRORS.PLOT_FORM.INVALID_PLOT
            }
          });
          return error;
        }}
      />

      <ScrollView w="100%">
        <VStack space={4} justifyContent={'center'} alignItems={'center'} overflow={'hidden'}>
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Informações local
          </FormControl.Label>
          <SlideInput
            onChangeEnd={setLineSpacing}
            step={1}
            title={'Espaçamento de linhas'}
            defaultValue={Instance.GetInstance().configCache.getCache().LINE_SPACING}
            unit={'metros'}
            disabled={false}
            maxValue={20}
            minValue={1}
            errorMessage={errors.lineSpacing.errorMessage}
          />
          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Capacidade Reservatórios
          </FormControl.Label>
          <FormInput
            title="Reservatório direito"
            description="Preencha este campo com a capacidade máxima do reservatório direito (Kg)"
            errorMessage={errors.rightTankMaxLoad.errorMessage}
            placeholder="25"
            defaultValue={Instance.GetInstance()
              .configCache.getCache()
              .APPLICATION.RIGHT_TANK_MAX_LOAD.toString()}
            onChangeText={onRightTankMaxLoadChange}
            keyboardType={'numeric'}
          />
          <FormInput
            title="Reservatório central"
            description="Preencha este campo com a capacidade máxima do reservatório central (Kg)"
            errorMessage={errors.centerTankMaxLoad.errorMessage}
            placeholder="25"
            defaultValue={Instance.GetInstance()
              .configCache.getCache()
              .APPLICATION.CENTER_TANK_MAX_LOAD.toString()}
            onChangeText={onCenterTankMaxLoadChange}
            keyboardType={'numeric'}
          />
          <FormInput
            title="Reservatório esquerdo"
            description="Preencha este campo com a capacidade máxima do reservatório esquerdo (Kg)"
            errorMessage={errors.leftTankMaxLoad.errorMessage}
            placeholder="25"
            defaultValue={Instance.GetInstance()
              .configCache.getCache()
              .APPLICATION.LEFT_TANK_MAX_LOAD.toString()}
            onChangeText={onLeftTankMaxLoadChange}
            keyboardType={'numeric'}
          />
          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Informações Dosagem
          </FormControl.Label>
          <SlideInput
            defaultValue={Instance.GetInstance().configCache.getCache().APPLICATION.DOSE_WEIGHT_G}
            maxValue={30}
            minValue={5}
            onChangeEnd={setDoseWeightG}
            step={1}
            title={'Peso dose'}
            unit={'g'}
            disabled={false}
            errorMessage={errors.doseWeightG.errorMessage}
          />
          <SelectInput
            onItemSelected={setPoison}
            items={poisonItems}
            title="Tipo de veneno"
            placeholder=""
            defaultValue={Instance.GetInstance().configCache.getCache().POISON_TYPE}
            errorMessage={errors.poisonType.errorMessage}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Preset 1
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset1NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P1.NAME}
            errorMessage={errors.preset1Name.errorMessage}
          />
          <SlideInput
            onChangeEnd={onPreset1DoseChange}
            step={1}
            title={'Doses'}
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P1.DOSE_AMOUNT}
            disabled={false}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset1Dose.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Preset 2
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset2NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P2.NAME}
            errorMessage={errors.preset2Name.errorMessage}
          />
          <SlideInput
            onChangeEnd={onPreset2DoseChange}
            step={1}
            title={'Doses'}
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P2.DOSE_AMOUNT}
            disabled={false}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset2Dose.errorMessage}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Preset 3
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset3NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P3.NAME}
            errorMessage={errors.preset3Name.errorMessage}
          />
          <SlideInput
            onChangeEnd={onPreset3DoseChange}
            step={1}
            title={'Doses'}
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P3.DOSE_AMOUNT}
            disabled={false}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset3Dose.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Preset 4
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset4NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P4.NAME}
            errorMessage={errors.preset4Name.errorMessage}
          />
          <SlideInput
            onChangeEnd={onPreset4DoseChange}
            step={1}
            title={'Doses'}
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P4.DOSE_AMOUNT}
            disabled={false}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset4Dose.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Preset 5
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset5NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P5.NAME}
            errorMessage={errors.preset5Name.errorMessage}
          />

          <SlideInput
            onChangeEnd={onPreset5DoseChange}
            step={1}
            title={'Doses'}
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P5.DOSE_AMOUNT}
            disabled={false}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset5Dose.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Preset 6
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset6NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P6.NAME}
            errorMessage={errors.preset6Name.errorMessage}
          />
          <SlideInput
            onChangeEnd={onPreset6DoseChange}
            step={1}
            title={'Doses'}
            defaultValue={Instance.GetInstance().configCache.getCache().PRESETS.P6.DOSE_AMOUNT}
            disabled={false}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset6Dose.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Dose Sistemática
          </FormControl.Label>
          <SlideInput
            onChangeEnd={setMetersBetweenDose}
            step={1}
            title={'Metros entre cada dose'}
            unit={'metros'}
            defaultValue={
              Instance.GetInstance().configCache.getCache().SYSTEMATIC_DOSE.METERS_BETWEEN_DOSE
            }
            disabled={false}
            maxValue={10}
            minValue={2}
            errorMessage={errors.metersBetweenDose.errorMessage}
          />
          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Velocidade
          </FormControl.Label>

          <SlideInput
            onChangeEnd={setMaxVelocity}
            step={1}
            title={'Velocidade máxima permitida'}
            unit={'Km/h'}
            defaultValue={Instance.GetInstance().configCache.getCache().APPLICATION.MAX_VELOCITY}
            disabled={false}
            maxValue={20}
            minValue={1}
            errorMessage={errors.maxVelocity.errorMessage}
          />

          <Divider w="80%" />

          <ItemListInput
            items={stopReasons}
            onAddItemPress={onAddStopReasonPress}
            onDeleteItemRequested={onDeleteStopReasonRequested}
            title={'Motivos de parada'}
            errorMessage={errors.stopReasonEvent.errorMessage}
          />

          <Divider w="80%" />

          <ItemListInput
            items={events}
            onAddItemPress={onAddEventPress}
            onDeleteItemRequested={onDeleteEventRequested}
            title={'Tipos de eventos'}
            errorMessage={errors.events.errorMessage}
          />

          <Divider w="80%" />

          <ItemListInput
            items={mapStringToItemArray(Instance.GetInstance().configCache.getCache().FARMS)}
            onAddItemPress={onAddFarmPress}
            onDeleteItemRequested={onDeleteFarmRequested}
            title={'Fazendas'}
            errorMessage={errors.farms.errorMessage}
          />

          <Divider w="80%" />

          <ItemListInput
            items={mapStringToItemArray(Instance.GetInstance().configCache.getCache().PLOTS)}
            onAddItemPress={onAddPlotPress}
            onDeleteItemRequested={onDeletePlotRequested}
            title={'Talhões'}
            errorMessage={errors.plots.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.xl(appConfig.screen) }}
          >
            Arquivo
          </FormControl.Label>
          <FormInput
            title="Local para salvar o aruivo"
            description="Preencha este campo com o caminho de pastas para salvar o arquivo .csv"
            defaultValue={Instance.GetInstance().configCache.getCache().FILE_PATH}
            onChangeText={setFilePath}
            errorMessage={errors.filePath.errorMessage}
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
