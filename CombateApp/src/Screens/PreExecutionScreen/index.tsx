import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  IconButton,
  ScrollView,
  VStack
} from 'native-base';
import React, { useCallback, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { appConfig } from '../../app/config/app-config';
import { mapStringToItemArray } from '../../app/parser/map-string-to-item-array';
import { weatherToPtWeather } from '../../app/parser/weather-to-pt-weather';
import { Weather, weatherItems } from '../../internal/core/enum/weather';
import { IPreExecutionConfigProps } from '../../internal/interface/config-props';
import { IPreExecutionFormResult } from '../../internal/interface/pre-execution-form-result';

import { Instance } from '../../app/instance/instance';
import { ptToDefaults } from '../../app/parser/pt-to-defaults';
import { Theme } from '../../app/theme/theme';
import { ShowToast } from '../../Components/AlertToast';
import FormInput from '../../Components/FormInput';
import SelectInput from '../../Components/SelectInput';
import { CONSTANTS } from '../../internal/config/config';
import { SeverityEnum } from '../../internal/core/enum/severity';
import { dateTimeFormatter } from '../../internal/core/utils/date-time-formatter';
import { IItem } from '../../internal/interface/item';

function PreExecutionScreen(props: { navigation: any }) {
  const [applicatorsAmount, setApplicatorsAmount] = useState<number>(1);
  const [activity, setActivity] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().activity
  );
  const [leftApplicatorLoad, setLeftApplicatorLoad] = useState<number>(
    Instance.GetInstance().preExecutionConfigCache.getCache().leftApplicatorLoad
  );
  const [centerApplicatorLoad, setCenterApplicatorLoad] = useState<number>(
    Instance.GetInstance().preExecutionConfigCache.getCache().centerApplicatorLoad
  );
  const [rightApplicatorLoad, setRightApplicatorLoad] = useState<number>(
    Instance.GetInstance().preExecutionConfigCache.getCache().rightApplicatorLoad
  );
  const [devices, setDevices] = useState<Array<IItem>>([]);
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
  const [tractorName, setTractorName] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().tractorName
  );
  const [streetsAmount, setStreetsAmount] = useState<number>(
    Instance.GetInstance().preExecutionConfigCache.getCache().streetsAmount
  );
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [deviceName, setDeviceName] = useState<string>(
    Instance.GetInstance().preExecutionConfigCache.getCache().deviceName
  );

  const [weather, setWeather] = useState<Weather>(
    new Weather(Instance.GetInstance().preExecutionConfigCache.getCache().weather)
  );
  const [validationResult, setValidationResult] = useState<IPreExecutionFormResult>({
    applicatorsAmount: { errorMessage: undefined },
    clientName: { errorMessage: undefined },
    projectName: { errorMessage: undefined },
    plot: { errorMessage: undefined },
    streetsAmount: { errorMessage: undefined },
    weather: { errorMessage: undefined },
    tractorName: { errorMessage: undefined },
    farm: { errorMessage: undefined },
    rightApplicatorLoad: { errorMessage: undefined },
    leftApplicatorLoad: { errorMessage: undefined },
    activity: { errorMessage: undefined },
    centerApplicatorLoad: { errorMessage: undefined },
    deviceName: { errorMessage: undefined },
    valid: true,
  });

  const searchDevicesCallback = useCallback(async () => {
    try {
      setIsSearching(true);
      await Instance.GetInstance().bluetoothApp.init();
      const data = await Instance.GetInstance().bluetoothApp.getBondedDevices();
      setDevices(data);
    } catch (err) {
      await Instance.GetInstance().errorHandler.handle(err);
    }
    setIsSearching(false);
  }, [devices]);

  const onNextPressed = useCallback(async () => {
    const data: IPreExecutionConfigProps = {
      applicatorsAmount,
      activity,
      clientName,
      projectName,
      plot,
      farm,
      weather: weather.name,
      tractorName,
      leftApplicatorLoad,
      streetsAmount,
      rightApplicatorLoad,
      centerApplicatorLoad,
      deviceName,
    };

    const result = Instance.GetInstance().validator.validatePreExecutionForm(data);

    if (result.valid && deviceConnected) {
      await Instance.GetInstance().preExecutionConfigCache.update(data);

      try {
        const preExecutionConfigCache = Instance.GetInstance().preExecutionConfigCache.getCache();
        const configCache = Instance.GetInstance().configCache.getCache();
        const date = new Date();

        let fileName =
          preExecutionConfigCache.clientName +
          '_' +
          preExecutionConfigCache.projectName +
          '_' +
          preExecutionConfigCache.activity +
          '_' +
          preExecutionConfigCache.plot +
          '_' +
          preExecutionConfigCache.farm +
          '_' +
          dateTimeFormatter.date(date) +
          '_' +
          dateTimeFormatter.time(date) +
          '.csv';

        fileName = fileName.replace(/\//g, '-');
        fileName = fileName.replace(/\:/g, '-');

        await Instance.GetInstance().combateApp.begin(
          fileName,
          configCache.SYSTEMATIC_DOSE.METERS_BETWEEN_DOSE
        );

        props.navigation.navigate('ExecutionScreen');
      } catch (err) {
        await Instance.GetInstance().errorHandler.handle(err);
      }
    } else {
      setValidationResult(result);
      ShowToast({
        durationMs: 2000,
        title: 'Informações inválidas',
        message: 'Revise o formulário',
        severity: SeverityEnum.ERROR,
      });
    }
  }, [
    clientName,
    deviceConnected,
    projectName,
    plot,
    farm,
    weather,
    tractorName,
    leftApplicatorLoad,
    rightApplicatorLoad,
    centerApplicatorLoad,
    activity,
    applicatorsAmount,
  ]);

  const setWeatherCallback = useCallback(
    (value: string) => {
      const weather = ptToDefaults.weather(value);
      setWeather(weather);
    },
    [setWeather]
  );

  const setStreetsAmountCallback = useCallback(
    (value: string) => {
      setStreetsAmount(Number(value));
    },
    [setStreetsAmount]
  );

  const connectToBluetoothCallback = useCallback(async () => {
    setIsConnecting(true);
    try {
      let deviceId: string;
      if (!devices.length) await searchDevicesCallback();
      devices.forEach((device) => {
        if (device.name == deviceName) {
          deviceId = device.id;
        }
      });
      await Instance.GetInstance().bluetoothApp.selectDevice(deviceId);
      setDeviceConnected(true);
      ShowToast({
        durationMs: 3000,
        title: 'Bluetooth conectado com sucesso',
        severity: SeverityEnum.OK,
      });
    } catch (err) {
      await Instance.GetInstance().errorHandler.handle(err);
      setDeviceConnected(false);
    }

    setIsConnecting(false);
  }, [deviceName, devices]);

  return (
    <Box justifyContent={'center'} alignItems={'center'} h="100%">
      <ScrollView w="100%">
        <VStack space={4} justifyContent={'center'} alignItems={'center'} overflow={'hidden'}>
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Informações cliente
          </FormControl.Label>
          <FormInput
            title="Nome"
            description="Preencha este campo com o nome do cliente"
            errorMessage={validationResult.clientName.errorMessage}
            placeholder="Cliente X"
            defaultValue={Instance.GetInstance().preExecutionConfigCache.getCache().clientName}
            onChangeText={setClientName}
          />
          <FormInput
            title="Projeto"
            description="Preencha este campo com o nome do projeto"
            errorMessage={validationResult.projectName.errorMessage}
            placeholder="Projeto x"
            defaultValue={Instance.GetInstance().preExecutionConfigCache.getCache().projectName}
            onChangeText={setProjectName}
          />
          <SelectInput
            title="Fazenda"
            onItemSelected={setFarm}
            items={mapStringToItemArray(Instance.GetInstance().configCache.getCache().FARMS)}
            defaultValue={Instance.GetInstance().preExecutionConfigCache.getCache().farm}
            errorMessage={validationResult.farm.errorMessage}
            placeholder={''}
          />
          <SelectInput
            title="Talhão"
            onItemSelected={setPlot}
            items={mapStringToItemArray(Instance.GetInstance().configCache.getCache().PLOTS)}
            defaultValue={Instance.GetInstance().preExecutionConfigCache.getCache().plot}
            errorMessage={validationResult.plot.errorMessage}
            placeholder={''}
          />
          <SelectInput
            title="Atividade"
            onItemSelected={setActivity}
            items={CONSTANTS.ACTIVITY_ITEMS}
            defaultValue={Instance.GetInstance().preExecutionConfigCache.getCache().activity}
            errorMessage={validationResult.activity.errorMessage}
            placeholder={''}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Informações equipamento
          </FormControl.Label>
          <FormInput
            title="Nome do trator"
            description="Preencha este campo com o nome do trator que está sendo utilizado"
            errorMessage={validationResult.tractorName.errorMessage}
            defaultValue={Instance.GetInstance().preExecutionConfigCache.getCache().tractorName}
            onChangeText={setTractorName}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Informações do local
          </FormControl.Label>
          <SelectInput
            placeholder=""
            onItemSelected={setStreetsAmountCallback}
            title="Numero de ruas"
            items={CONSTANTS.STREET_AMOUNT_ITEMS}
            defaultValue={Instance.GetInstance()
              .preExecutionConfigCache.getCache()
              .streetsAmount.toString()}
            errorMessage={validationResult.streetsAmount.errorMessage}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Clima
          </FormControl.Label>
          <SelectInput
            onItemSelected={setWeatherCallback}
            placeholder={''}
            title={'Clima'}
            items={weatherItems}
            errorMessage={validationResult.weather.errorMessage}
            defaultValue={weatherToPtWeather(
              Instance.GetInstance().preExecutionConfigCache.getCache().weather
            )}
          />
          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Conexão CB
          </FormControl.Label>
          <SelectInput
            onItemSelected={setDeviceName}
            title="Selecione o dipositivo Bluetooth"
            placeholder="CB5"
            items={devices}
            errorMessage={validationResult.deviceName.errorMessage}
          />
          <HStack>
            <Button
              isLoading={isConnecting}
              isLoadingText="Conectando"
              _pressed={{ opacity: 0.8 }}
              background={Theme().color.b300}
              onPress={connectToBluetoothCallback}
            >
              Conectar
            </Button>

            <Box width={2} />

            <Button
              isLoading={isSearching}
              isLoadingText="Pesquisando"
              _pressed={{ opacity: 0.8 }}
              background={Theme().color.b300}
              onPress={searchDevicesCallback}
            >
              Pesquisar
            </Button>
          </HStack>
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
      <IconButton
        onPress={onNextPressed}
        position={'absolute'}
        bottom={2}
        right={2}
        bgColor={Theme().color.b300}
        borderRadius={20}
        _icon={{
          as: MaterialIcon,
          name: 'keyboard-arrow-right',
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
