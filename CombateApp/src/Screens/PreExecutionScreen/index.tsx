import { Box, Button, Divider, FormControl, IconButton, ScrollView, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { appConfig } from '../../app/config/app-config';
import { mapStringToItemArray } from '../../app/parser/map-string-to-item-array';
import { weatherToPtWeather } from '../../app/parser/weather-to-pt-weather';
import { Weather, weatherItems } from '../../internal/core/enum/weather';
import { config } from '../../internal/core/port/config-cache-port';
import { preExecutionConfig } from '../../internal/core/port/pre-execution-config-cache-port';
import { IPreExecutionConfigProps } from '../../internal/interface/config-props';
import { IPreExecutionFormResult } from '../../internal/interface/pre-execution-form-result';

import { ShowToast, ShowToast as showToast } from '../../Components/AlertToast';
import FormInput from '../../Components/FormInput';
import SelectInput from '../../Components/SelectInput';
import SlideInput from '../../Components/SlideInput';
import { ptToDefaults } from '../../app/parser/pt-to-defaults';
import { Theme } from '../../app/theme/theme';
import { bluetoothApp } from '../../cmd/port/bluetooth-app-port';
import { validator } from '../../cmd/port/validator-port';
import { Severity, SeverityEnum } from '../../internal/core/enum/severity';
import { IItem } from '../../internal/interface/item';

function PreExecutionScreen(props: { navigation: any }) {
  const [leftApplicatorLoad, setLeftApplicatorLoad] = useState<number>(
    preExecutionConfig.getCache().leftApplicatorLoad
  );
  const [centerApplicatorLoad, setCenterApplicatorLoad] = useState<number>(
    preExecutionConfig.getCache().centerApplicatorLoad
  );
  const [rightApplicatorLoad, setRightApplicatorLoad] = useState<number>(
    preExecutionConfig.getCache().rightApplicatorLoad
  );
  const [devices, setDevices] = useState<Array<IItem>>([]);

  const [clientName, setClientName] = useState<string>(preExecutionConfig.getCache().clientName);
  const [projectName, setProjectName] = useState<string>(preExecutionConfig.getCache().projectName);
  const [farm, setFarm] = useState<string>(preExecutionConfig.getCache().farm);
  const [plot, setPlot] = useState<string>(preExecutionConfig.getCache().plot);
  const [tractorName, setTractorName] = useState<string>(preExecutionConfig.getCache().tractorName);
  const [streetsAmount, setStreetsAmount] = useState<number>(
    preExecutionConfig.getCache().streetsAmount
  );
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [deviceName, setDeviceName] = useState<string>();

  const [weather, setWeather] = useState<Weather>(
    new Weather(preExecutionConfig.getCache().weather)
  );
  const [validationResult, setValidationResult] = useState<IPreExecutionFormResult>({
    clientName: { errorMessage: undefined },
    projectName: { errorMessage: undefined },
    plot: { errorMessage: undefined },
    streetsAmount: { errorMessage: undefined },
    weather: { errorMessage: undefined },
    tractorName: { errorMessage: undefined },
    farm: { errorMessage: undefined },
    rightApplicatorLoad: { errorMessage: undefined },
    leftApplicatorLoad: { errorMessage: undefined },
    centerApplicatorLoad: { errorMessage: undefined },
    valid: true,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      setDevices(await bluetoothApp.getConnectedDevices());
    }, 5000);

    return () => clearInterval(interval);
  }, [setDevices]);

  const onNextPressed = useCallback(async () => {
    const data: IPreExecutionConfigProps = {
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
    };

    const result = validator.validatePreExecutionForm(data);
    console.log(JSON.stringify(result, null, 4));
    if (result.valid) {
      if (data != preExecutionConfig.getCache()) {
        await preExecutionConfig.update(data);
      }
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
    projectName,
    plot,
    farm,
    weather,
    tractorName,
    leftApplicatorLoad,
    rightApplicatorLoad,
    centerApplicatorLoad,
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
      await bluetoothApp.selectDevice(deviceId);
    } catch (err) {
      showToast({
        durationMs: 3000,
        message: err.message,
        title: 'Erro de conexão Bluetooth',
        severity: SeverityEnum.ERROR,
      });
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
            defaultValue={preExecutionConfig.getCache().clientName}
            onChangeText={setClientName}
          />
          <FormInput
            title="Projeto"
            description="Preencha este campo com o nome do projeto"
            errorMessage={validationResult.projectName.errorMessage}
            placeholder="Projeto x"
            defaultValue={preExecutionConfig.getCache().projectName}
            onChangeText={setProjectName}
          />
          <SelectInput
            title="Fazenda"
            onItemSelected={setFarm}
            items={mapStringToItemArray(config.getCache().FARMS)}
            defaultValue={preExecutionConfig.getCache().farm}
            errorMessage={validationResult.farm.errorMessage}
            placeholder={''}
          />
          <SelectInput
            title="Talhão"
            onItemSelected={setPlot}
            items={mapStringToItemArray(config.getCache().PLOTS)}
            defaultValue={preExecutionConfig.getCache().plot}
            errorMessage={validationResult.plot.errorMessage}
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
            defaultValue={preExecutionConfig.getCache().tractorName}
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
            items={[
              { id: '0', name: '1' },
              { id: '1', name: '2' },
              { id: '2', name: '3' },
              { id: '3', name: '5' },
            ]}
            defaultValue={preExecutionConfig.getCache().streetsAmount.toString()}
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
            defaultValue={weatherToPtWeather(preExecutionConfig.getCache().weather)}
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
            Carga nos reservatórios
          </FormControl.Label>
          <SlideInput
            onChangeEnd={setRightApplicatorLoad}
            step={0.5}
            title="Reservatório direito"
            unit="Kg"
            defaultValue={preExecutionConfig.getCache().rightApplicatorLoad}
            disabled={false}
            maxValue={config.getCache().APPLICATION.RIGHT_TANK_MAX_LOAD}
            minValue={1}
            errorMessage={validationResult.rightApplicatorLoad.errorMessage}
          />

          <SlideInput
            onChangeEnd={setCenterApplicatorLoad}
            step={0.5}
            title="Reservatório central"
            unit="Kg"
            defaultValue={preExecutionConfig.getCache().centerApplicatorLoad}
            disabled={false}
            maxValue={config.getCache().APPLICATION.CENTER_TANK_MAX_LOAD}
            minValue={1}
            errorMessage={validationResult.centerApplicatorLoad.errorMessage}
          />

          <SlideInput
            onChangeEnd={setLeftApplicatorLoad}
            step={0.5}
            title="Reservatório esquerdo"
            unit="Kg"
            defaultValue={preExecutionConfig.getCache().leftApplicatorLoad}
            disabled={false}
            maxValue={config.getCache().APPLICATION.LEFT_TANK_MAX_LOAD}
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
