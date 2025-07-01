import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  ScrollView,
  VStack,
} from "native-base";
import React, { useCallback, useState } from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Weather, weatherItems } from "../../../src/internal/core/enum/weather";
import { IPreExecutionConfigProps } from "../../../src/internal/interface/config-props";
import { IPreExecutionFormResult } from "../../../src/internal/interface/pre-execution-form-result";
import { appConfig } from "../../app/config/app-config";
import { mapStringToItemArray } from "../../app/parser/map-string-to-item-array";

import { useFocusEffect } from "@react-navigation/native";
import { CONSTANTS } from "../../../src/internal/config/config";
import { SeverityEnum } from "../../../src/internal/core/enum/severity";
import { dateTimeFormatter } from "../../../src/internal/core/utils/date-time-formatter";
import { IItem } from "../../../src/internal/interface/item";
import { Instance } from "../../app/instance/instance";
import {
  sanitizeText,
  sanitizeTextUnderline,
} from "../../app/parser/sanitize-text";
import { Theme } from "../../app/theme/theme";
import { ShowToast } from "../../Components/AlertToast";
import FormInput from "../../Components/FormInput";
import SelectInput from "../../Components/SelectInput";

function PreExecutionScreen(props: { navigation: any }) {
  const [devices, setDevices] = useState<IItem[]>([]);
  const [connectToBluetooth, setConnectToBluetooth] = useState(false);

  const [activity, setActivity] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().activity
  );
  const [leftApplicatorLoad, setLeftApplicatorLoad] = useState<number>(
    Instance.GetInstance().preExecutionConfigCache.getCache().leftApplicatorLoad
  );
  const [centerApplicatorLoad, setCenterApplicatorLoad] = useState<number>(
    Instance.GetInstance().preExecutionConfigCache.getCache()
      .centerApplicatorLoad
  );
  const [rightApplicatorLoad, setRightApplicatorLoad] = useState<number>(
    Instance.GetInstance().preExecutionConfigCache.getCache()
      .rightApplicatorLoad
  );

  const [underForest, setUnderForest] = useState<string>(
    Instance.GetInstance().configCache.getCache().UNDER_FOREST
  );

  const [deviceConnected, setDeviceConnected] = useState(false);
  const [clientName, setClientName] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().clientName
  );
  const [projectName, setProjectName] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().projectName
  );
  const [farm, setFarm] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().farm
  );
  const [plot, setPlot] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().plot
  );
  const [module, setModule] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().module
  );
  const [tractorName, setTractorName] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().tractorName
  );
  const [streetsAmount, setStreetsAmount] = useState<number>(
    Instance.GetInstance().preExecutionConfigCache.getCache().streetsAmount
  );
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const [deviceName, setDeviceName] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().deviceName
  );
  const [weather, setWeather] = useState<Weather>(
    new Weather(
      Instance.GetInstance().preExecutionConfigCache.getCache().weather
    )
  );

  const [validationResult, setValidationResult] =
    useState<IPreExecutionFormResult>({
      clientName: { errorMessage: undefined },
      projectName: { errorMessage: undefined },
      plot: { errorMessage: undefined },
      streetsAmount: { errorMessage: undefined },
      weather: { errorMessage: undefined },
      tractorName: { errorMessage: undefined },
      farm: { errorMessage: undefined },
      module: { errorMessage: undefined },
      rightApplicatorLoad: { errorMessage: undefined },
      leftApplicatorLoad: { errorMessage: undefined },
      activity: { errorMessage: undefined },
      centerApplicatorLoad: { errorMessage: undefined },
      deviceName: { errorMessage: undefined },
      valid: true,
      underForest: { errorMessage: undefined },
    });

  const searchDevicesCallback = useCallback(async () => {
    try {
      setIsConnecting(true);
      const data = await Instance.GetInstance().bluetoothApp.getBondedDevices();
      setDevices(data);
    } catch (err) {
      await Instance.GetInstance().errorHandler.handle(err);
    } finally {
      setIsConnecting(false);
    }
  }, [devices]);

  useFocusEffect(() => {
    if (deviceConnected) return;

    const interval = setInterval(async () => {
      await searchDevicesCallback();
    }, 3000);

    return () => clearInterval(interval);
  });

  const onNextPressed = useCallback(async () => {
    const data: IPreExecutionConfigProps = {
      activity: sanitizeText(activity),
      module: sanitizeText(module),
      clientName: sanitizeText(clientName),
      projectName: sanitizeText(projectName),
      plot: sanitizeText(plot),
      farm: sanitizeText(farm),
      underForest: sanitizeText(underForest),
      weather: sanitizeText(weather.name),
      tractorName: sanitizeText(tractorName),
      leftApplicatorLoad,
      streetsAmount,
      rightApplicatorLoad,
      centerApplicatorLoad,
      deviceName,
    };

    const result =
      Instance.GetInstance().validator.validatePreExecutionForm(data);

    if (result.valid && deviceConnected) {
      await Instance.GetInstance().preExecutionConfigCache.update(data);

      try {
        const preExecutionConfigCache =
          Instance.GetInstance().preExecutionConfigCache.getCache();
        const configCache = Instance.GetInstance().configCache.getCache();
        const date = new Date();

        let fileName =
          sanitizeTextUnderline(preExecutionConfigCache.clientName) +
          "_" +
          sanitizeTextUnderline(preExecutionConfigCache.module) +
          "_" +
          sanitizeTextUnderline(preExecutionConfigCache.activity) +
          "_" +
          sanitizeTextUnderline(preExecutionConfigCache.plot) +
          "_" +
          sanitizeTextUnderline(preExecutionConfigCache.idEquipment) +
          "_" +
          dateTimeFormatter.date(date) +
          "_" +
          dateTimeFormatter.time(date) +
          ".csv";

        fileName = fileName.replace(/\//g, "-");
        fileName = fileName.replace(/\:/g, "-");

        Instance.GetInstance().errorHandler.begin(fileName);

        await Instance.GetInstance().combateApp.begin(
          fileName,
          configCache.SYSTEMATIC_DOSE.METERS_BETWEEN_DOSE
        );

        props.navigation.navigate("ExecutionScreen");
      } catch (err) {
        await Instance.GetInstance().errorHandler.handle(err);
      }
    } else {
      if (!deviceConnected) {
        result.deviceName = { errorMessage: "Bluetooth não conectado." };
        result.valid = false;
      }
      setValidationResult(result);
      ShowToast({
        durationMs: 2000,
        title: "Informações inválidas",
        message: "Revise o formulário",
        severity: SeverityEnum.ERROR,
      });
    }
  }, [
    clientName,
    deviceConnected,
    projectName,
    plot,
    module,
    farm,
    underForest,
    weather,
    tractorName,
    leftApplicatorLoad,
    rightApplicatorLoad,
    centerApplicatorLoad,
    activity,
  ]);

  const setWeatherCallback = useCallback(
    (value: string) => {
      try {
        setWeather(new Weather(sanitizeText(value)));
      } catch (err) {
        Instance.GetInstance().errorHandler.handle(err);
      }
    },
    [setWeather]
  );

  const setStreetsAmountCallback = useCallback(
    (value: string) => {
      setStreetsAmount(Number(value));
    },
    [setStreetsAmount]
  );

  const connectToBluetoothCallback = async () => {
    setConnectToBluetooth(true);
    try {
      if (devices.length === 0) await searchDevicesCallback();

      const device = devices.find((device) => device.name === deviceName);
      if (!device) throw new Error("Dispositivo não encontrado");

      await Instance.GetInstance().bluetoothApp.selectDevice(device.id);
      setDeviceConnected(true);
      ShowToast({
        durationMs: 3000,
        title: "Bluetooth conectado com sucesso",
        severity: SeverityEnum.OK,
      });
    } catch (err) {
      await Instance.GetInstance().errorHandler.handle(err);
      setDeviceConnected(false);
    } finally {
      setIsConnecting(false);
      setConnectToBluetooth(false);
    }
  };

  return (
    <Box justifyContent={"center"} alignItems={"center"} h="100%">
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
            Informações cliente
          </FormControl.Label>
          <FormInput
            title="Nome"
            keyboardType="default"
            description="Preencha este campo com o nome do cliente"
            errorMessage={validationResult.clientName.errorMessage}
            placeholder="Cliente X"
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache()
                .clientName ?? ""
            }
            onChangeText={setClientName}
          />

          <SelectInput
            title="Projeto"
            onItemSelected={setProjectName}
            items={
              mapStringToItemArray(
                Instance.GetInstance().configCache.getCache().PROJECTS
              ) ?? []
            }
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache()
                .projectName ?? ""
            }
            errorMessage={validationResult.projectName.errorMessage}
            placeholder={"Escolha o projeto"}
          />
          <SelectInput
            title="Fazenda"
            onItemSelected={setFarm}
            items={
              mapStringToItemArray(
                Instance.GetInstance().configCache.getCache().FARMS
              ) ?? []
            }
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache().farm ??
              ""
            }
            errorMessage={validationResult.farm.errorMessage}
            placeholder={""}
          />
          <SelectInput
            title="Talhão"
            onItemSelected={setPlot}
            items={
              mapStringToItemArray(
                Instance.GetInstance().configCache.getCache().PLOTS
              ) ?? []
            }
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache().plot ??
              ""
            }
            errorMessage={validationResult.plot.errorMessage}
            placeholder={""}
          />
          <SelectInput
            title="Atividade"
            onItemSelected={setActivity}
            items={CONSTANTS.ACTIVITY_ITEMS}
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache()
                .activity ?? ""
            }
            errorMessage={validationResult.activity.errorMessage}
            placeholder={""}
          />
          <SelectInput
            title="Módulos"
            onItemSelected={setModule}
            items={
              mapStringToItemArray(
                Instance.GetInstance().configCache.getCache().MODULES
              ) ?? []
            }
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache()
                .module ?? ""
            }
            errorMessage={validationResult.module.errorMessage}
            placeholder={""}
          />
          <SelectInput
            title="Sub-Bosque"
            onItemSelected={setUnderForest}
            items={CONSTANTS.UNDER_FOREST_ITEMS}
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache()
                .underForest ?? ""
            }
            errorMessage={validationResult?.underForest?.errorMessage}
            placeholder={""}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Informações equipamento
          </FormControl.Label>
          <FormInput
            title="Nome do trator"
            keyboardType="default"
            description="Preencha este campo com o nome do trator que está sendo utilizado"
            errorMessage={validationResult.tractorName.errorMessage}
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache()
                .tractorName ?? ""
            }
            onChangeText={setTractorName}
          />

          <SelectInput
            onItemSelected={(value: string) => {
              setRightApplicatorLoad(Number(value.split(" ")[0]));
            }}
            placeholder={
              Instance.GetInstance()
                .preExecutionConfigCache.getCache()
                .rightApplicatorLoad.toString() + " Kg"
            }
            title="Carga reservatório direito"
            defaultValue={
              Instance.GetInstance()
                .preExecutionConfigCache.getCache()
                .rightApplicatorLoad.toString() ?? ""
            }
            errorMessage={validationResult.rightApplicatorLoad.errorMessage}
            items={CONSTANTS.PRE_EXECUTION_SCREEN.APPLICATOR_LOAD_ITEMS(
              Instance.GetInstance().configCache.getCache().APPLICATION
                .RIGHT_TANK_MAX_LOAD
            )}
          />
          <SelectInput
            onItemSelected={(value: string) => {
              setCenterApplicatorLoad(Number(value.split(" ")[0]));
            }}
            placeholder={
              Instance.GetInstance()
                .preExecutionConfigCache.getCache()
                .centerApplicatorLoad.toString() + " Kg"
            }
            title="Carga reservatório central"
            defaultValue={
              Instance.GetInstance()
                .preExecutionConfigCache.getCache()
                .centerApplicatorLoad.toString() ?? ""
            }
            errorMessage={validationResult.centerApplicatorLoad.errorMessage}
            items={CONSTANTS.PRE_EXECUTION_SCREEN.APPLICATOR_LOAD_ITEMS(
              Instance.GetInstance().configCache.getCache().APPLICATION
                .CENTER_TANK_MAX_LOAD
            )}
          />

          <SelectInput
            onItemSelected={(value: string) => {
              setLeftApplicatorLoad(Number(value.split(" ")[0]));
            }}
            placeholder={
              Instance.GetInstance()
                .preExecutionConfigCache.getCache()
                .leftApplicatorLoad.toString() + " Kg"
            }
            title="Carga reservatório esquerdo"
            defaultValue={
              Instance.GetInstance()
                .preExecutionConfigCache.getCache()
                .leftApplicatorLoad.toString() ?? ""
            }
            errorMessage={validationResult.leftApplicatorLoad.errorMessage}
            items={CONSTANTS.PRE_EXECUTION_SCREEN.APPLICATOR_LOAD_ITEMS(
              Instance.GetInstance().configCache.getCache().APPLICATION
                .LEFT_TANK_MAX_LOAD
            )}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Informações do local
          </FormControl.Label>
          <SelectInput
            placeholder=""
            onItemSelected={setStreetsAmountCallback}
            title="Número de ruas"
            items={CONSTANTS.STREET_AMOUNT_ITEMS}
            defaultValue={
              Instance.GetInstance()
                .preExecutionConfigCache.getCache()
                .streetsAmount.toString() ?? ""
            }
            errorMessage={validationResult.streetsAmount.errorMessage}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Clima
          </FormControl.Label>
          <SelectInput
            onItemSelected={setWeatherCallback}
            placeholder={""}
            title={"Clima"}
            items={weatherItems}
            errorMessage={validationResult.weather.errorMessage}
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache()
                .weather ?? ""
            }
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: "bold",
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Conexão CB
          </FormControl.Label>
          <SelectInput
            onItemSelected={setDeviceName}
            title="Selecione o dipositivo Bluetooth"
            placeholder="CB"
            defaultValue={deviceName ?? ""}
            items={devices}
            errorMessage={validationResult.deviceName.errorMessage}
          />
          <Button
            isLoading={connectToBluetooth}
            isLoadingText="Conectando"
            _pressed={{ opacity: 0.8 }}
            background={Theme().color.b300}
            onPress={connectToBluetoothCallback}
          >
            Conectar
          </Button>
        </VStack>
        <Box w="20%" h="60px" />
      </ScrollView>

      <Box
        position={"absolute"}
        bottom={2}
        right={2}
        bgColor={Theme().color.b500}
        borderRadius={20}
        w="20%"
        h="60px"
      />
      <IconButton
        onPress={onNextPressed}
        position={"absolute"}
        bottom={2}
        right={2}
        bgColor={Theme().color.b300}
        borderRadius={20}
        _icon={{
          as: MaterialIcon,
          name: "keyboard-arrow-right",
          color: Theme().color.b500,
          size: 8,
        }}
        _pressed={{ opacity: 0.8 }}
        w="20%"
        h="60px"
      ></IconButton>
    </Box>
  );
}

export default PreExecutionScreen;