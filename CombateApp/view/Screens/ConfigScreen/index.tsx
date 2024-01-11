import { useFocusEffect } from "@react-navigation/native";
import {
  Box,
  Button,
  Divider,
  FormControl,
  ScrollView,
  VStack,
} from "native-base";
import { useCallback, useRef, useState } from "react";
import { v1 } from "uuid";
import { Validator } from "../../../src/cmd/formvalidator/form-validator";
import { CONSTANTS } from "../../../src/internal/config/config";
import { RequestDto } from "../../../src/internal/core/dto/request-dto";
import { EventEnum } from "../../../src/internal/core/enum/event";
import { poisonItems } from "../../../src/internal/core/enum/poison";
import { SeverityEnum } from "../../../src/internal/core/enum/severity";
import { IConfigFormResult } from "../../../src/internal/interface/config-form-result";
import { IConfigsProps } from "../../../src/internal/interface/config-props";
import { IItem } from "../../../src/internal/interface/item";
import { appConfig } from "../../app/config/app-config";
import { Instance } from "../../app/instance/instance";
import { itemArrayToMapString } from "../../app/parser/item-array-to-map-string";
import { mapStringToItemArray } from "../../app/parser/map-string-to-item-array";
import { Theme } from "../../app/theme/theme";
import { ShowToast } from "../../Components/AlertToast";
import FormInput from "../../Components/FormInput";
import SelectInput from "../../Components/SelectInput";
import SlideInput from "../../Components/SlideInput";
import ItemListInput from "./components/ItemListInput";
import ItemRegisterModal from "./components/ItemRegisterModal";

interface IPreset {
  name: string;
  doseAmount: number;
}

function ConfigScreen(props: { navigation: any; route: any; level: number }) {
  const { level } = props.route.params;
  const rightTankMaxLoad = useRef<number>(
    Instance.GetInstance().configCache.getCache().APPLICATION
      .RIGHT_TANK_MAX_LOAD
  );
  function setRightTankMaxLoad(value) {
    rightTankMaxLoad.current = value;
  }
  const centerTankMaxLoad = useRef<number>(
    Instance.GetInstance().configCache.getCache().APPLICATION
      .CENTER_TANK_MAX_LOAD
  );
  const leftTankMaxLoad = useRef<number>(
    Instance.GetInstance().configCache.getCache().APPLICATION.LEFT_TANK_MAX_LOAD
  );
  const doseWeightG = useRef<number>(
    Instance.GetInstance().configCache.getCache().APPLICATION.DOSE_WEIGHT_G
  );
  function setDoseWeightG(value) {
    doseWeightG.current = value;
  }
  const metersBetweenDose = useRef(
    Instance.GetInstance().configCache.getCache().SYSTEMATIC_DOSE
      .METERS_BETWEEN_DOSE
  );
  function setMetersBetweenDose(value) {
    metersBetweenDose.current = value;
  }
  const filePath = useRef(
    Instance.GetInstance().configCache.getCache().FILE_PATH
  );
  function setFilePath(value) {
    filePath.current = value;
  }
  const preset1 = useRef<IPreset>({
    doseAmount:
      Instance.GetInstance().configCache.getCache().PRESETS.P1.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P1.NAME,
  });
  function setPreset1(value) {
    preset1.current = value;
  }
  const preset2 = useRef<IPreset>({
    doseAmount:
      Instance.GetInstance().configCache.getCache().PRESETS.P2.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P2.NAME,
  });
  function setPreset2(value) {
    preset2.current = value;
  }
  const preset3 = useRef<IPreset>({
    doseAmount:
      Instance.GetInstance().configCache.getCache().PRESETS.P3.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P3.NAME,
  });
  function setPreset3(value) {
    preset3.current = value;
  }
  const preset4 = useRef<IPreset>({
    doseAmount:
      Instance.GetInstance().configCache.getCache().PRESETS.P4.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P4.NAME,
  });
  function setPreset4(value) {
    preset4.current = value;
  }
  const preset5 = useRef<IPreset>({
    doseAmount:
      Instance.GetInstance().configCache.getCache().PRESETS.P5.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P5.NAME,
  });
  function setPreset5(value) {
    preset5.current = value;
  }
  const preset6 = useRef<IPreset>({
    doseAmount:
      Instance.GetInstance().configCache.getCache().PRESETS.P6.DOSE_AMOUNT,
    name: Instance.GetInstance().configCache.getCache().PRESETS.P6.NAME,
  });
  function setPreset6(value) {
    preset6.current = value;
  }
  const maxVelocity = useRef<number>(
    Instance.GetInstance().configCache.getCache().APPLICATION.MAX_VELOCITY
  );
  function setMaxVelocity(value) {
    maxVelocity.current = value;
  }
  const lineSpacing = useRef<number>(
    Instance.GetInstance().configCache.getCache().LINE_SPACING
  );
  function setLineSpacing(value) {
    lineSpacing.current = value;
  }

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

  const [stopReasons, setStopReasons] = useState<
    Array<{ id: string; name: string }>
  >(
    mapStringToItemArray(
      Instance.GetInstance().configCache.getCache().STOP_REASONS_EVENTS
    )
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

  const poison = useRef(
    Instance.GetInstance().configCache.getCache().POISON_TYPE
  );
  function setPoison(value) {
    poison.current = value;
  }

  function level1(level: number): boolean {
    return level > 1;
  }

  function level2(level: number): boolean {
    return level > 2;
  }

  const [addReasonModalVisible, setAddReasonModalVisible] = useState(false);
  const [addEventModalVisible, setAddEventModalVisible] = useState(false);
  const [addFarmModalVisible, setAddFarmModalVisible] = useState(false);
  const [addPlotModalVisible, setAddPlotModalVisible] = useState(false);

  function onRightTankMaxLoadChange(text: string) {
    rightTankMaxLoad.current = Number(text);
  }
  function onLeftTankMaxLoadChange(text: string) {
    leftTankMaxLoad.current = Number(text);
  }
  function onCenterTankMaxLoadChange(text: string) {
    centerTankMaxLoad.current = Number(text);
  }

  const deviceName = useRef(
    Instance.GetInstance().preExecutionConfigCache.getCache().deviceName
  );
  function setDeviceName(name: string) {
    deviceName.current = name;
  }

  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [devices, setDevices] = useState<Array<IItem>>([]);
  const deviceConnected = useRef(false);
  const newIdError = useState("");
  const searchDevicesCallback = useCallback(async () => {
    try {
      await Instance.GetInstance().bluetoothApp.init();
      const data = await Instance.GetInstance().bluetoothApp.getBondedDevices();
      setDevices(data);
    } catch (err) {
      await Instance.GetInstance().errorHandler.handle(err);
    }
  }, [devices]);

  useFocusEffect(() => {
    const interval = setInterval(async () => {
      await searchDevicesCallback();
    }, 3000);
    return () => clearInterval(interval);
  });
  const connectToBluetoothCallback = useCallback(async () => {
    setIsConnecting(true);
    try {
      let deviceId: string;
      if (!devices.length) await searchDevicesCallback();
      devices.forEach((device) => {
        if (device.name == deviceName.current) {
          deviceId = device.id;
        }
      });
      await Instance.GetInstance().bluetoothApp.selectDevice(deviceId);
      deviceConnected.current = true;
      ShowToast({
        durationMs: 3000,
        title: "Bluetooth conectado com sucesso",
        severity: SeverityEnum.OK,
      });
    } catch (err) {
      await Instance.GetInstance().errorHandler.handle(err);
      deviceConnected.current = false;
    }

    setIsConnecting(false);
  }, [deviceName, devices]);

  const newId = useRef("");
  function setNewId(value: string) {
    newId.current = value;
  }

  const isRenaming = useState(false);
  const renameCallback = useCallback(async () => {
    try {
      if (!deviceConnected.current) {
        ShowToast({
          durationMs: 5000,
          severity: SeverityEnum.WARN,
          title: "CB deve estar conectado para renomear",
          message: "Selecione um CB e conecte antes de renomear",
        });
        return;
      }
      isRenaming[1](true);
      const requestDto = new RequestDto({
        systematicMetersBetweenDose: metersBetweenDose.current,
        client:
          Instance.GetInstance().preExecutionConfigCache.getCache().clientName,
        deviceName:
          Instance.GetInstance().preExecutionConfigCache.getCache().deviceName,
        doseWeightG:
          Instance.GetInstance().configCache.getCache().APPLICATION
            .DOSE_WEIGHT_G,
        event: EventEnum.TrackPoint.name,
        maxVelocity:
          Instance.GetInstance().configCache.getCache().APPLICATION
            .MAX_VELOCITY,
        linesSpacing:
          Instance.GetInstance().configCache.getCache().LINE_SPACING,
        plot: Instance.GetInstance().preExecutionConfigCache.getCache().plot,
        poisonType: Instance.GetInstance().configCache.getCache().POISON_TYPE,
        project:
          Instance.GetInstance().preExecutionConfigCache.getCache().projectName,
        streetsAmount:
          Instance.GetInstance().preExecutionConfigCache.getCache()
            .streetsAmount,
        tractorName:
          Instance.GetInstance().preExecutionConfigCache.getCache().tractorName,
        weather:
          Instance.GetInstance().preExecutionConfigCache.getCache().weather,
      });

      const id = Number(newId.current);
      requestDto.newId = Math.trunc(id);
      const responseDto = await Instance.GetInstance().combateApp.request(
        requestDto
      );
      ShowToast({
        durationMs: 5000,
        severity: SeverityEnum.OK,
        title: "CB renomeado com sucesso",
        message: "Novo nome: CB5_" + requestDto.newId.toString(),
      });
    } catch (err) {
      await Instance.GetInstance().errorHandler.handle(err);
    } finally {
      isRenaming[1](false);
    }
  }, [isRenaming[0]]);

  const onPreset1NameChange = useCallback(
    (text: string) => {
      const aux = preset1.current;
      aux.name = text;
      preset1.current = aux;
    },
    [preset1]
  );
  const onPreset2NameChange = useCallback(
    (text: string) => {
      const aux = preset2.current;
      aux.name = text;
      setPreset2(aux);
    },
    [preset2]
  );
  const onPreset3NameChange = useCallback(
    (text: string) => {
      const aux = preset3.current;
      aux.name = text;
      setPreset3(aux);
    },
    [preset3]
  );
  const onPreset4NameChange = useCallback(
    (text: string) => {
      const aux = preset4.current;
      aux.name = text;
      setPreset4(aux);
    },
    [preset4]
  );
  const onPreset5NameChange = useCallback(
    (text: string) => {
      const aux = preset5.current;
      aux.name = text;
      setPreset5(aux);
    },
    [preset5]
  );
  const onPreset6NameChange = useCallback(
    (text: string) => {
      const aux = preset6.current;
      aux.name = text;
      setPreset6(aux);
    },
    [preset6]
  );

  const onPreset1DoseChange = useCallback(
    (doses: number) => {
      const aux = preset1.current;
      aux.doseAmount = doses;
      setPreset1(aux);
    },
    [preset1]
  );
  const onPreset2DoseChange = useCallback(
    (doses: number) => {
      const aux = preset2.current;
      aux.doseAmount = doses;
      setPreset2(aux);
    },
    [preset2]
  );
  const onPreset3DoseChange = useCallback(
    (doses: number) => {
      const aux = preset3.current;
      aux.doseAmount = doses;
      setPreset3(aux);
    },
    [preset3]
  );
  const onPreset4DoseChange = useCallback(
    (doses: number) => {
      const aux = preset4.current;
      aux.doseAmount = doses;
      setPreset4(aux);
    },
    [preset4]
  );
  const onPreset5DoseChange = useCallback(
    (doses: number) => {
      const aux = preset5.current;
      aux.doseAmount = doses;
      setPreset5(aux);
    },
    [preset5]
  );
  const onPreset6DoseChange = useCallback(
    (doses: number) => {
      const aux = preset6.current;
      aux.doseAmount = doses;
      setPreset6(aux);
    },
    [preset6]
  );

  const onAddEventPress = useCallback(() => {
    setAddEventModalVisible(true);
  }, []);

  const onAddEventModalClose = useCallback(() => {
    setAddEventModalVisible(false);
  }, []);

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
  }, []);

  const onAddFarmModalClose = useCallback(() => {
    setAddFarmModalVisible(false);
  }, []);

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
  }, []);

  const onAddPlotModalClose = useCallback(() => {
    setAddPlotModalVisible(false);
  }, []);

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
  }, []);

  const onAddReasonModalClose = useCallback(() => {
    setAddReasonModalVisible(false);
  }, []);

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
          MAX_VELOCITY: maxVelocity.current,
          CENTER_TANK_MAX_LOAD: centerTankMaxLoad.current,
          DOSE_WEIGHT_G: doseWeightG.current,
          LEFT_TANK_MAX_LOAD: leftTankMaxLoad.current,
          RIGHT_TANK_MAX_LOAD: rightTankMaxLoad.current,
        },
        PRESETS: {
          P1: {
            NAME: preset1.current.name,
            DOSE_AMOUNT: preset1.current.doseAmount,
          },
          P2: {
            NAME: preset2.current.name,
            DOSE_AMOUNT: preset2.current.doseAmount,
          },
          P3: {
            NAME: preset3.current.name,
            DOSE_AMOUNT: preset3.current.doseAmount,
          },
          P4: {
            NAME: preset4.current.name,
            DOSE_AMOUNT: preset4.current.doseAmount,
          },
          P5: {
            NAME: preset5.current.name,
            DOSE_AMOUNT: preset5.current.doseAmount,
          },
          P6: {
            NAME: preset6.current.name,
            DOSE_AMOUNT: preset6.current.doseAmount,
          },
        },
        FILE_PATH: filePath.current,
        POISON_TYPE: poison.current,
        LINE_SPACING: lineSpacing.current,
        SYSTEMATIC_DOSE: { METERS_BETWEEN_DOSE: metersBetweenDose.current },
      };

      const result = Instance.GetInstance().validator.validateConfigForm(data);
      setErrors(result);

      if (!result.valid) {
        ShowToast({
          title: "Erro ao salvar alterações",
          severity: SeverityEnum.ERROR,
          message: "Revise o formulário",
          durationMs: 2000,
        });
      } else {
        if (data != Instance.GetInstance().configCache.getCache()) {
          const cache = Instance.GetInstance().configCache.getCache();

          cache.APPLICATION.DOSE_WEIGHT_G = doseWeightG.current;
          cache.APPLICATION.RIGHT_TANK_MAX_LOAD = rightTankMaxLoad.current;
          cache.APPLICATION.CENTER_TANK_MAX_LOAD = centerTankMaxLoad.current;
          cache.APPLICATION.LEFT_TANK_MAX_LOAD = leftTankMaxLoad.current;
          cache.APPLICATION.MAX_VELOCITY = maxVelocity.current;
          cache.PRESETS.P1.DOSE_AMOUNT = preset1.current.doseAmount;
          cache.PRESETS.P1.NAME = preset1.current.name;
          cache.PRESETS.P2.DOSE_AMOUNT = preset2.current.doseAmount;
          cache.PRESETS.P2.NAME = preset2.current.name;
          cache.PRESETS.P3.DOSE_AMOUNT = preset3.current.doseAmount;
          cache.PRESETS.P3.NAME = preset3.current.name;
          cache.PRESETS.P4.DOSE_AMOUNT = preset4.current.doseAmount;
          cache.PRESETS.P4.NAME = preset4.current.name;
          cache.PRESETS.P5.DOSE_AMOUNT = preset5.current.doseAmount;
          cache.PRESETS.P5.NAME = preset5.current.name;
          cache.PRESETS.P6.DOSE_AMOUNT = preset6.current.doseAmount;
          cache.PRESETS.P6.NAME = preset6.current.name;
          cache.POISON_TYPE = poison.current;
          cache.LINE_SPACING = lineSpacing.current;
          cache.SYSTEMATIC_DOSE.METERS_BETWEEN_DOSE = metersBetweenDose.current;
          cache.FILE_PATH = filePath.current;

          await Instance.GetInstance().configCache.update(cache);

          ShowToast({
            title: "Alterações salvas com sucesso",
            severity: SeverityEnum.OK,
            durationMs: 2000,
          });
        } else {
          ShowToast({
            title: "Nenhuma alteração foi detectada",
            severity: SeverityEnum.OK,
            durationMs: 2000,
          });
        }
      }
    } catch (err) {
      await Instance.GetInstance().errorHandler.handle(err);
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
    <Box justifyContent={"center"} alignItems={"center"} h="100%">
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
          Object.keys(
            Instance.GetInstance().configCache.getCache().STOP_REASONS_EVENTS
          ).forEach((key) => {
            if (
              value ==
              Instance.GetInstance().configCache.getCache().STOP_REASONS_EVENTS[
                key
              ]
            ) {
              error = CONSTANTS.ERRORS.STOP_REASON_FORM.INVALID_STOP_REASON;
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
          Object.keys(
            Instance.GetInstance().configCache.getCache().EVENTS
          ).forEach((key) => {
            if (
              value == Instance.GetInstance().configCache.getCache().EVENTS[key]
            ) {
              error = CONSTANTS.ERRORS.EVENT_FORM.INVALID_EVENT;
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
          Object.keys(
            Instance.GetInstance().configCache.getCache().FARMS
          ).forEach((key) => {
            if (
              value == Instance.GetInstance().configCache.getCache().FARMS[key]
            ) {
              error = CONSTANTS.ERRORS.FARM_FORM.INVALID_FARM;
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
          Object.keys(
            Instance.GetInstance().configCache.getCache().PLOTS
          ).forEach((key) => {
            if (
              value == Instance.GetInstance().configCache.getCache().PLOTS[key]
            ) {
              error = CONSTANTS.ERRORS.PLOT_FORM.INVALID_PLOT;
            }
          });
          return error;
        }}
      />

      <ScrollView w="100%">
        <VStack
          space={4}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"hidden"}
        >
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Informações local
          </FormControl.Label>
          <SlideInput
            onChangeEnd={setLineSpacing}
            step={1}
            title={"Espaçamento de linhas"}
            defaultValue={
              Instance.GetInstance().configCache.getCache().LINE_SPACING
            }
            unit={"metros"}
            disabled={level2(level)}
            maxValue={20}
            minValue={1}
            errorMessage={errors.lineSpacing.errorMessage}
          />
          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
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
            keyboardType={"numeric"}
            disabled={level2(level)}
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
            keyboardType={"numeric"}
            disabled={level2(level)}
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
            keyboardType={"numeric"}
            disabled={level2(level)}
          />
          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Informações Dosagem
          </FormControl.Label>
          <SlideInput
            defaultValue={
              Instance.GetInstance().configCache.getCache().APPLICATION
                .DOSE_WEIGHT_G
            }
            maxValue={30}
            minValue={5}
            onChangeEnd={setDoseWeightG}
            step={1}
            title={"Peso dose"}
            unit={"g"}
            disabled={level2(level)}
            errorMessage={errors.doseWeightG.errorMessage}
          />
          <SelectInput
            onItemSelected={setPoison}
            items={poisonItems}
            title="Tipo de veneno"
            placeholder=""
            defaultValue={
              Instance.GetInstance().configCache.getCache().POISON_TYPE
            }
            errorMessage={errors.poisonType.errorMessage}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Preset 1
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset1NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P1.NAME
            }
            errorMessage={errors.preset1Name.errorMessage}
          />
          <SlideInput
            onChangeEnd={onPreset1DoseChange}
            step={1}
            title={"Doses"}
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P1
                .DOSE_AMOUNT
            }
            disabled={level2(level)}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset1Dose.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Preset 2
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset2NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P2.NAME
            }
            errorMessage={errors.preset2Name.errorMessage}
          />
          <SlideInput
            onChangeEnd={onPreset2DoseChange}
            step={1}
            title={"Doses"}
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P2
                .DOSE_AMOUNT
            }
            disabled={level2(level)}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset2Dose.errorMessage}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Preset 3
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset3NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P3.NAME
            }
            errorMessage={errors.preset3Name.errorMessage}
          />
          <SlideInput
            onChangeEnd={onPreset3DoseChange}
            step={1}
            title={"Doses"}
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P3
                .DOSE_AMOUNT
            }
            disabled={level2(level)}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset3Dose.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Preset 4
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset4NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P4.NAME
            }
            errorMessage={errors.preset4Name.errorMessage}
          />
          <SlideInput
            onChangeEnd={onPreset4DoseChange}
            step={1}
            title={"Doses"}
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P4
                .DOSE_AMOUNT
            }
            disabled={level2(level)}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset4Dose.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Preset 5
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset5NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P5.NAME
            }
            errorMessage={errors.preset5Name.errorMessage}
          />

          <SlideInput
            onChangeEnd={onPreset5DoseChange}
            step={1}
            title={"Doses"}
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P5
                .DOSE_AMOUNT
            }
            disabled={level2(level)}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset5Dose.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Preset 6
          </FormControl.Label>

          <SelectInput
            onItemSelected={onPreset6NameChange}
            items={CONSTANTS.PRESET_NAME_ITEMS}
            title="Nome preset"
            placeholder=""
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P6.NAME
            }
            errorMessage={errors.preset6Name.errorMessage}
          />
          <SlideInput
            onChangeEnd={onPreset6DoseChange}
            step={1}
            title={"Doses"}
            defaultValue={
              Instance.GetInstance().configCache.getCache().PRESETS.P6
                .DOSE_AMOUNT
            }
            disabled={level2(level)}
            maxValue={CONSTANTS.MAX_DOSES}
            minValue={CONSTANTS.MIN_DOSES}
            errorMessage={errors.preset6Dose.errorMessage}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Dose Sistemática
          </FormControl.Label>
          <SlideInput
            onChangeEnd={(value) => {
              metersBetweenDose.current = value;
            }}
            step={1}
            title={"Metros entre cada dose"}
            unit={"metros"}
            defaultValue={
              Instance.GetInstance().configCache.getCache().SYSTEMATIC_DOSE
                .METERS_BETWEEN_DOSE
            }
            disabled={level2(level)}
            maxValue={10}
            minValue={2}
            errorMessage={errors.metersBetweenDose.errorMessage}
          />
          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Velocidade
          </FormControl.Label>

          <SlideInput
            onChangeEnd={setMaxVelocity}
            step={1}
            title={"Velocidade máxima permitida"}
            unit={"Km/h"}
            defaultValue={
              Instance.GetInstance().configCache.getCache().APPLICATION
                .MAX_VELOCITY
            }
            disabled={level2(level)}
            maxValue={20}
            minValue={1}
            errorMessage={errors.maxVelocity.errorMessage}
          />

          <Divider w="80%" />

          <ItemListInput
            id={1}
            items={stopReasons}
            onAddItemPress={onAddStopReasonPress}
            onDeleteItemRequested={onDeleteStopReasonRequested}
            title={"Motivos de parada"}
            errorMessage={errors.stopReasonEvent.errorMessage}
            disabled={level2(level)}
          />

          <Divider w="80%" />

          <ItemListInput
            id={2}
            items={events}
            onAddItemPress={onAddEventPress}
            onDeleteItemRequested={onDeleteEventRequested}
            title={"Tipos de eventos"}
            errorMessage={errors.events.errorMessage}
            disabled={level2(level)}
          />

          <Divider w="80%" />

          <ItemListInput
            id={3}
            items={mapStringToItemArray(
              Instance.GetInstance().configCache.getCache().FARMS
            )}
            onAddItemPress={onAddFarmPress}
            onDeleteItemRequested={onDeleteFarmRequested}
            title={"Fazendas"}
            errorMessage={errors.farms.errorMessage}
            disabled={level2(level)}
          />

          <Divider w="80%" />

          <ItemListInput
            id={4}
            items={mapStringToItemArray(
              Instance.GetInstance().configCache.getCache().PLOTS
            )}
            onAddItemPress={onAddPlotPress}
            onDeleteItemRequested={onDeletePlotRequested}
            title={"Talhões"}
            errorMessage={errors.plots.errorMessage}
            disabled={level2(level)}
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Renomear CB
          </FormControl.Label>
          <SelectInput
            onItemSelected={setDeviceName}
            title="Selecione o dipositivo Bluetooth"
            placeholder="CB"
            defaultValue={deviceName.current}
            items={devices}
            disabled={level1(level)}
          />
          <Button
            isLoading={isConnecting}
            isLoadingText="Conectando"
            _pressed={{ opacity: 0.8 }}
            background={Theme().color.b300}
            onPress={connectToBluetoothCallback}
            disabled={level1(level)}
          >
            Conectar
          </Button>

          <FormInput
            title="Novo id"
            description="Preencha com o novo Id do CB. Somente números"
            onChangeText={setNewId}
            keyboardType={"numeric"}
            errorMessage={newIdError[0]}
            disabled={level1(level)}
          />

          <Button
            isLoading={isRenaming[0]}
            isLoadingText="Renomeando"
            _pressed={{ opacity: 0.8 }}
            background={Theme().color.b300}
            onPress={renameCallback}
            disabled={level1(level)}
          >
            Renomear
          </Button>
        </VStack>

        <Box w="20%" h="70px" />
      </ScrollView>

      <Box
        position={"absolute"}
        bottom={2}
        right={2}
        bgColor={Theme().color.b500}
        borderRadius={20}
        w="25%"
        h="60px"
      />
      <Button
        onPress={onSavePressed}
        position={"absolute"}
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
