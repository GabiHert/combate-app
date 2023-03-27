import {
  Box,
  Divider,
  FormControl,
  IconButton,
  Radio,
  ScrollView,
  Stack,
  VStack,
} from 'native-base';
import React, { useCallback, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Weather, WeatherEnum, weatherItems } from '../../api/core/enum/weather';
import { config } from '../../api/core/port/config-port';
import { AppConfig } from '../../app/config/app-config';
import { mapStringToItemArray } from '../../app/parser/map-string-to-item-array';
import { Theme } from '../../app/theme/theme';
import FormInput from '../../Components/FormInput';
import SelectInput from '../../Components/SelectInput';
import SlideInput from '../../Components/SlideInput';

interface IValidationResult {
  clientName: { errorMessage: string };
  projectName: { errorMessage: string };
  farm: { errorMessage: string };
  plotNumber: { errorMessage: undefined };
  spaceBetweenLines: { errorMessage: string };
  streetsAmount: { errorMessage: string };
  weather: { errorMessage: string };
  vehicleName: { errorMessage: string };
  rightLoad: { errorMessage: string };
  leftLoad: { errorMessage: string };
  centerLoad: { errorMessage: string };
  valid: boolean;
}

function PreExecutionScreen(props: { navigation: any }) {
  const [leftApplicatorLoad, setLeftApplicatorLoad] = useState<number>(0);
  const [centerApplicatorLoad, setCenterApplicatorLoad] = useState<number>(0);
  const [rightApplicatorLoad, setRightApplicatorLoad] = useState<number>(0);
  const [clientName, setClientName] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [farm, setFarm] = useState<string>('');
  const [plot, setPlot] = useState<string>('');
  const [vehicleName, setVehicleName] = useState<string>('');
  const [streetsAmount, setStreetsAmount] = useState<number>(0);

  const [weather, setWeather] = useState<Weather>();
  const [validationResult, setValidationResult] = useState<IValidationResult>({
    clientName: { errorMessage: undefined },
    projectName: { errorMessage: undefined },
    plotNumber: { errorMessage: undefined },
    spaceBetweenLines: { errorMessage: undefined },
    streetsAmount: { errorMessage: undefined },
    weather: { errorMessage: undefined },
    vehicleName: { errorMessage: undefined },
    farm: { errorMessage: undefined },
    rightLoad: { errorMessage: undefined },
    leftLoad: { errorMessage: undefined },
    centerLoad: { errorMessage: undefined },
    valid: true,
  });

  function onNextPressed() {
    // const data = {
    //   clientName,
    //   projectName,
    //   plotNumber,
    //   spaceBetweenLines,
    //   streetsAmount,
    //   weather,
    //   vehicleName,
    // };

    const validation = {
      clientName: { errorMessage: undefined },
      projectName: { errorMessage: undefined },
      plotNumber: { errorMessage: undefined },
      spaceBetweenLines: { errorMessage: undefined },
      streetsAmount: { errorMessage: undefined },
      weather: { errorMessage: undefined },
      vehicleName: { errorMessage: undefined },
      rightLoad: { errorMessage: undefined },
      leftLoad: { errorMessage: undefined },
      farm: { errorMessage: undefined },
      centerLoad: { errorMessage: undefined },
      valid: true,
    };

    setValidationResult(validation);

    if (validation.valid) {
      props.navigation.navigate('ExecutionScreen', {
        applicator: {
          center: { loadKg: centerApplicatorLoad },
          right: { loadKg: rightApplicatorLoad },
          left: { loadKg: leftApplicatorLoad },
        },
      });
    }
  }

  const setWeatherCallback = useCallback(
    (value: string) => {
      let valueEn = value;
      switch (value) {
        case 'Orvalho': //todo: create constants
          valueEn = WeatherEnum.DEW.name;
          break;
        case 'Pós chuva':
          valueEn = WeatherEnum.AFTER_RAIN.name;
          break;
        case 'Chance de chuva':
          valueEn = WeatherEnum.CHANCE_OF_RAIN.name;
          break;
        case 'Seco':
          valueEn = WeatherEnum.DRY.name;
          break;
        case 'Humido':
          valueEn = WeatherEnum.HUMID.name;
          break;
      }

      setWeather(new Weather(valueEn));
    },
    [setWeather]
  );

  const setStreetsAmountCallback = useCallback(
    (value: string) => {
      setStreetsAmount(Number(value));
    },
    [setStreetsAmount]
  );

  return (
    <Box justifyContent={'center'} alignItems={'center'} h="100%">
      <ScrollView w="100%">
        <VStack space={4} justifyContent={'center'} alignItems={'center'} overflow={'hidden'}>
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(AppConfig.screen),
            }}
          >
            Informações cliente
          </FormControl.Label>

          <FormInput
            title="Nome"
            description="Preencha este campo com o nome do cliente"
            errorMessage={validationResult.clientName.errorMessage}
            placeholder="Cliente X"
            onChangeText={setClientName}
          />
          <FormInput
            title="Projeto"
            description="Preencha este campo com o nome do projeto"
            errorMessage={validationResult.projectName.errorMessage}
            placeholder="Projeto x"
            onChangeText={setProjectName}
          />
          <SelectInput
            title="Fazenda"
            onItemSelected={setFarm}
            items={mapStringToItemArray(config.getCache().FARMS)}
            errorMessage={validationResult.farm.errorMessage}
            placeholder={''}
          />
          <SelectInput
            title="Talhão"
            onItemSelected={setPlot}
            items={mapStringToItemArray(config.getCache().PLOTS)}
            errorMessage={validationResult.plotNumber.errorMessage}
            placeholder={''}
          />

          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(AppConfig.screen),
            }}
          >
            Informações equipamento
          </FormControl.Label>

          <FormInput
            title="Nome do veículo"
            description="Preencha este campo com o nome do veículo que está sendo utilizado"
            errorMessage={validationResult.vehicleName.errorMessage}
            placeholder="A25"
            onChangeText={setVehicleName}
          />

          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(AppConfig.screen),
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
          />

          <Divider w="80%" />
          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(AppConfig.screen),
            }}
          >
            Clima
          </FormControl.Label>

          <SelectInput
            onItemSelected={setWeatherCallback}
            placeholder={''}
            title={'Clima'}
            items={weatherItems}
          />

          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(AppConfig.screen),
            }}
          >
            Conexão CB
          </FormControl.Label>
          <SelectInput
            onItemSelected={() => {}}
            title="Selecione o dipositivo Bluetooth"
            placeholder="CB5"
            items={[]}
          />

          <Divider w="80%" />

          <FormControl.Label
            mt={5}
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.xl(AppConfig.screen),
            }}
          >
            Carga nos reservatórios
          </FormControl.Label>
          <SlideInput
            onChangeEnd={setRightApplicatorLoad}
            step={0.5}
            title="Reservatório direito"
            unit="Kg"
            defaultValue={1}
            disabled={false}
            maxValue={config.getCache().APPLICATION.RIGHT_TANK_MAX_LOAD}
            minValue={1}
          />

          <SlideInput
            onChangeEnd={setCenterApplicatorLoad}
            step={0.5}
            title="Reservatório central"
            unit="Kg"
            defaultValue={1}
            disabled={false}
            maxValue={config.getCache().APPLICATION.CENTER_TANK_MAX_LOAD}
            minValue={1}
          />

          <SlideInput
            onChangeEnd={setLeftApplicatorLoad}
            step={0.5}
            title="Reservatório esquerdo"
            unit="Kg"
            defaultValue={1}
            disabled={false}
            maxValue={config.getCache().APPLICATION.LEFT_TANK_MAX_LOAD}
            minValue={1}
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
