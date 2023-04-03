import { Box, Divider, FormControl, IconButton, ScrollView, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SeverityEnum } from '../../api/core/enum/severity';
import { Weather, WeatherEnum, weatherItems } from '../../api/core/enum/weather';
import { config } from '../../api/core/port/config-port';
import { preExecutionConfig } from '../../api/core/port/pre-execution-config-port';
import { IPreExecutionConfigProps } from '../../api/interface/config-props';
import { appConfig } from '../../app/config/app-config';
import { mapStringToItemArray } from '../../app/parser/map-string-to-item-array';
import { ptWeatherToWeather } from '../../app/parser/pt-weather-to-weather';
import { weatherToPtWeather } from '../../app/parser/weather-to-pt-weather';

import { Theme } from '../../app/theme/theme';
import { ShowToast } from '../../Components/AlertToast';
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
  tractorName: { errorMessage: string };
  rightLoad: { errorMessage: string };
  leftLoad: { errorMessage: string };
  centerLoad: { errorMessage: string };
  valid: boolean;
}

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
  const [clientName, setClientName] = useState<string>(preExecutionConfig.getCache().clientName);
  const [projectName, setProjectName] = useState<string>(preExecutionConfig.getCache().projectName);
  const [farm, setFarm] = useState<string>(preExecutionConfig.getCache().farm);
  const [plot, setPlot] = useState<string>(preExecutionConfig.getCache().plot);
  const [tractorName, setTractorName] = useState<string>(preExecutionConfig.getCache().tractorName);
  const [streetsAmount, setStreetsAmount] = useState<number>(
    preExecutionConfig.getCache().streetsAmount
  );

  const [weather, setWeather] = useState<Weather>(
    new Weather(preExecutionConfig.getCache().weather)
  );
  const [validationResult, setValidationResult] = useState<IValidationResult>({
    clientName: { errorMessage: undefined },
    projectName: { errorMessage: undefined },
    plotNumber: { errorMessage: undefined },
    spaceBetweenLines: { errorMessage: undefined },
    streetsAmount: { errorMessage: undefined },
    weather: { errorMessage: undefined },
    tractorName: { errorMessage: undefined },
    farm: { errorMessage: undefined },
    rightLoad: { errorMessage: undefined },
    leftLoad: { errorMessage: undefined },
    centerLoad: { errorMessage: undefined },
    valid: true,
  });

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

    const validation: IValidationResult = {
      clientName: { errorMessage: undefined },
      projectName: { errorMessage: undefined },
      plotNumber: { errorMessage: undefined },
      spaceBetweenLines: { errorMessage: undefined },
      streetsAmount: { errorMessage: undefined },
      weather: { errorMessage: undefined },
      tractorName: { errorMessage: undefined },
      rightLoad: { errorMessage: undefined },
      leftLoad: { errorMessage: undefined },
      farm: { errorMessage: undefined },
      centerLoad: { errorMessage: undefined },
      valid: true,
    };

    setValidationResult(validation);

    if (validation.valid) {
      if (data != preExecutionConfig.getCache()) {
        console.log(data);
        await preExecutionConfig.update(data);
      }

      props.navigation.navigate('ExecutionScreen');
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
      const weather = ptWeatherToWeather(value);
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
            errorMessage={validationResult.plotNumber.errorMessage}
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
