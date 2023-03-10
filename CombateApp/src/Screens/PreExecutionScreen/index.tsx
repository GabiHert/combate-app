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
import { Weather, WeatherEnum } from '../../api/core/enum/weather';
import { Theme } from '../../app/theme/theme';
import FormInput from '../../Components/FormInput';
import SelectInput from '../../Components/SelectInput';

interface IValidationResult {
  clientName: { errorMessage: string };
  projectName: { errorMessage: string };
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
  const [plotNumber, setPlotNumber] = useState<number>(0);
  const [vehicleName, setVehicleName] = useState<string>('');
  const [spaceBetweenLines, setSpaceBetweenLines] = useState<number>(0);
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

  const setLeftApplicatorLoadCallback = useCallback(
    (value: string) => {
      //todo: throw error when NAN
      const valueNumber = Number(value);
      setLeftApplicatorLoad(valueNumber);
    },
    [setLeftApplicatorLoad]
  );

  const setCenterApplicatorLoadCallback = useCallback(
    (value: string) => {
      //todo: throw error when NAN
      const valueNumber = Number(value);
      setCenterApplicatorLoad(valueNumber);
    },
    [setCenterApplicatorLoad]
  );

  const setRightApplicatorLoadCallback = useCallback(
    (value: string) => {
      //todo: throw error when NAN
      const valueNumber = Number(value);
      setRightApplicatorLoad(valueNumber);
    },
    [setRightApplicatorLoad]
  );

  const setPlotNumberCallback = useCallback(
    (value: string) => {
      //todo: throw error when NAN
      const valueNumber = Number(value);
      setPlotNumber(valueNumber);
    },
    [setPlotNumber]
  );

  const setSpaceBetweenLinesCallback = useCallback(
    (value: string) => {
      //todo: throw error when NAN
      const valueNumber = Number(value);
      setSpaceBetweenLines(valueNumber);
    },
    [setSpaceBetweenLines]
  );

  const setStreetsAmountCallback = useCallback(
    (value: string) => {
      //todo: throw error when NAN
      const valueNumber = Number(value);
      setStreetsAmount(valueNumber);
    },
    [setStreetsAmount]
  );

  const setWeatherCallback = useCallback(
    (value: string) => {
      setWeather(new Weather(value));
    },
    [setWeather]
  );

  return (
    <Box justifyContent={'center'} alignItems={'center'} h="100%">
      <ScrollView w="100%">
        <VStack space={4} justifyContent={'center'} alignItems={'center'} overflow={'hidden'}>
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Informa????es cliente
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
          <FormInput
            title="Numero do talh??o"
            description="Preencha este campo com o numero do talh??o da aplica????o"
            errorMessage={validationResult.plotNumber.errorMessage}
            placeholder="22"
            keyboardType="numeric"
            onChangeText={setPlotNumberCallback}
          />

          <Divider w="80%" />

          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Informa????es equipamento
          </FormControl.Label>

          <FormInput
            title="Nome do ve??culo"
            description="Preencha este campo com o nome do ve??culo que est?? sendo utilizado"
            errorMessage={validationResult.vehicleName.errorMessage}
            placeholder="A25"
            onChangeText={setVehicleName}
          />

          <Divider w="80%" />

          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Informa????es do local
          </FormControl.Label>

          <FormInput
            title="Espa??amento entre linhas (m)"
            description="Preencha este campo com o espa??amento entre linhas em metros"
            errorMessage={validationResult.spaceBetweenLines.errorMessage}
            placeholder="1"
            keyboardType="numeric"
            onChangeText={setSpaceBetweenLinesCallback}
          />
          <FormInput
            title="Numero de ruas"
            description="Preencha este campo com o numero de ruas a serem percorridas"
            errorMessage={validationResult.streetsAmount.errorMessage}
            placeholder="1"
            keyboardType="numeric"
            onChangeText={setStreetsAmountCallback}
          />

          <Radio.Group
            onChange={setWeatherCallback}
            name="exampleGroup"
            defaultValue={WeatherEnum.DRY.name}
          >
            <Stack
              direction={{
                base: 'row',
                md: 'row',
              }}
              alignItems={{
                base: 'flex-start',
                md: 'center',
              }}
              space={4}
              w="60%"
            >
              <Radio value={WeatherEnum.DRY.name} colorScheme="green" size="md" my={1}>
                Seco
              </Radio>
              <Radio value={WeatherEnum.HUMID.name} colorScheme="green" size="md" my={1}>
                ??mido
              </Radio>
              <Radio value={WeatherEnum.MUGGY.name} colorScheme="green" size="md" my={1}>
                Abafado
              </Radio>
            </Stack>
          </Radio.Group>

          <Divider w="80%" />

          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Conex??o CB
          </FormControl.Label>
          <SelectInput
            title="Selecione o dipositivo Bluetooth"
            placeholder="CB5"
            items={[
              { value: 'teste', label: 'teste' },
              { value: 'teste', label: 'teste' },
            ]}
          />

          <Divider w="80%" />

          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Carga nos reservat??rios
          </FormControl.Label>

          <FormInput
            title="Reservat??rio direito (Kg)"
            description="Preencha este campo com a carga no reservat??rio direito em kilos"
            errorMessage={validationResult.rightLoad.errorMessage}
            placeholder="1.5"
            keyboardType="numeric"
            onChangeText={setRightApplicatorLoadCallback}
          />

          <FormInput
            title="Reservat??rio central (Kg)"
            description="Preencha este campo com a carga no reservat??rio central em kilos"
            errorMessage={validationResult.centerLoad.errorMessage}
            placeholder="1.5"
            keyboardType="numeric"
            onChangeText={setCenterApplicatorLoadCallback}
          />

          <FormInput
            title="Reservat??rio esquerdo (Kg)"
            description="Preencha este campo com a carga no reservat??rio esquerdo em kilos"
            errorMessage={validationResult.leftLoad.errorMessage}
            placeholder="1.5"
            keyboardType="numeric"
            onChangeText={setLeftApplicatorLoadCallback}
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
