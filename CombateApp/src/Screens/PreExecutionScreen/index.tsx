import { Box, Button, Divider, FormControl, IconButton, ScrollView, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { appConfig } from '../../app/config/app-config';
import { mapStringToItemArray } from '../../app/parser/map-string-to-item-array';
import { weatherToPtWeather } from '../../app/parser/weather-to-pt-weather';
import { Weather, weatherItems } from '../../internal/core/enum/weather';
import { IPreExecutionConfigProps } from '../../internal/interface/config-props';
import { IPreExecutionFormResult } from '../../internal/interface/pre-execution-form-result';

import { useFocusEffect } from '@react-navigation/native';
import { Instance } from '../../app/instance/instance';
import { ptToDefaults } from '../../app/parser/pt-to-defaults';
import { Theme } from '../../app/theme/theme';
import { ShowToast, ShowToast as showToast } from '../../Components/AlertToast';
import FormInput from '../../Components/FormInput';
import SelectInput from '../../Components/SelectInput';
import SlideInput from '../../Components/SlideInput';
import { CONSTANTS } from '../../internal/config/config';
import { SeverityEnum } from '../../internal/core/enum/severity';
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
  const [devices, setDevices] = useState<Array<IItem>>([{ id: 'idd', name: 'name' }]);
  const [deviceConnected, setDeviceConnected] = useState(true); //todo: false
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
  const [deviceName, setDeviceName] = useState<string>();

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

  useFocusEffect(() => {
    const interval = setInterval(async () => {
      try {
        await Instance.GetInstance().bluetoothApp.init();
        setDevices(await Instance.GetInstance().bluetoothApp.getBondedDevices());
      } catch (err) {
        ShowToast({
          durationMs: 3000,
          title: 'Erro Bluetooth',
          message: err.message,
          severity: SeverityEnum.ERROR,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  });

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

      props.navigation.navigate('ExecutionScreen');
    } else {
      setValidationResult(result);
      ShowToast({
        durationMs: 3000,
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
      devices.forEach((device) => {
        if (device.name == deviceName) {
          deviceId = device.id;
        }
      });
      //await bluetoothApp.selectDevice(deviceId);
      setDeviceConnected(true);
      ShowToast({
        durationMs: 3000,
        title: 'Bluetooth conectado com sucesso',
        severity: SeverityEnum.OK,
      });
    } catch (err) {
      showToast({
        durationMs: 3000,
        message: err.message,
        title: 'Erro de conexão Bluetooth',
        severity: SeverityEnum.ERROR,
      });
      setDeviceConnected(false);
    }

    setIsConnecting(false);
  }, [deviceName]);

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
          <Button
            isLoading={isConnecting}
            isLoadingText="Conectando"
            _pressed={{ opacity: 0.8 }}
            background={Theme().color.b300}
            onPress={connectToBluetoothCallback}
          >
            Conectar
          </Button>

          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(appConfig.screen),
            }}
          >
            Dosadores
          </FormControl.Label>

          <SelectInput
            title="Número de dosadores"
            onItemSelected={(value) => setApplicatorsAmount(Number(value))}
            items={CONSTANTS.APPLICATORS_AMOUNT_ITEMS}
            defaultValue={applicatorsAmount.toString()}
            errorMessage={validationResult.applicatorsAmount.errorMessage}
            placeholder={''}
          />

          <SlideInput
            onChangeEnd={setRightApplicatorLoad}
            step={0.5}
            title="Reservatório direito"
            unit="Kg"
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache().rightApplicatorLoad
            }
            disabled={false}
            maxValue={Instance.GetInstance().configCache.getCache().APPLICATION.RIGHT_TANK_MAX_LOAD}
            minValue={1}
            errorMessage={validationResult.rightApplicatorLoad.errorMessage}
          />
          <SlideInput
            onChangeEnd={setCenterApplicatorLoad}
            step={0.5}
            title="Reservatório central"
            unit="Kg"
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache().centerApplicatorLoad
            }
            disabled={false}
            maxValue={
              Instance.GetInstance().configCache.getCache().APPLICATION.CENTER_TANK_MAX_LOAD
            }
            minValue={1}
            errorMessage={validationResult.centerApplicatorLoad.errorMessage}
          />
          <SlideInput
            onChangeEnd={setLeftApplicatorLoad}
            step={0.5}
            title="Reservatório esquerdo"
            unit="Kg"
            defaultValue={
              Instance.GetInstance().preExecutionConfigCache.getCache().leftApplicatorLoad
            }
            disabled={false}
            maxValue={Instance.GetInstance().configCache.getCache().APPLICATION.LEFT_TANK_MAX_LOAD}
            minValue={1}
            errorMessage={validationResult.leftApplicatorLoad.errorMessage}
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
