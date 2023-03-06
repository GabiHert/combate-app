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
    props.navigation.navigate('ExecutionScreen', {
      applicator: {
        center: { load: centerApplicatorLoad },
        right: { load: rightApplicatorLoad },
        left: { load: leftApplicatorLoad },
      },
    });
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
            Informações cliente
          </FormControl.Label>

          <FormInput
            title="Nome"
            description="Preencha este campo com o nome do cliente"
            errorMessage=""
            placeholder="Cliente X"
            onChangeText={setClientName}
          />
          <FormInput
            title="Projeto"
            description="Preencha este campo com o nome do projeto"
            errorMessage=""
            placeholder="Projeto x"
            onChangeText={setProjectName}
          />
          <FormInput
            title="Numero do talhão"
            description="Preencha este campo com o numero do talhão da aplicação"
            errorMessage=""
            placeholder="22"
            keyboardType="numeric"
            onChangeText={setPlotNumberCallback}
          />

          <Divider w="80%" />

          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Informações equipamento
          </FormControl.Label>

          <FormInput
            title="Nome do veículo"
            description="Preencha este campo com o nome do veículo que está sendo utilizado"
            errorMessage=""
            placeholder="A25"
            onChangeText={setVehicleName}
          />

          <Divider w="80%" />

          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Informações do local
          </FormControl.Label>

          <FormInput
            title="Espaçamento entre linhas (m)"
            description="Preencha este campo com o espaçamento entre linhas em metros"
            errorMessage=""
            placeholder="1"
            keyboardType="numeric"
            onChangeText={setSpaceBetweenLinesCallback}
          />
          <FormInput
            title="Numero de ruas"
            description="Preencha este campo com o numero de ruas a serem percorridas"
            errorMessage=""
            placeholder="1"
            keyboardType="numeric"
            onChangeText={setStreetsAmountCallback}
          />

          <Radio.Group
            onChange={setWeatherCallback}
            name="exampleGroup"
            defaultValue="1"
            accessibilityLabel="pick a size"
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
                Ùmido
              </Radio>
              <Radio value={WeatherEnum.MUGGY.name} colorScheme="green" size="md" my={1}>
                Abafado
              </Radio>
            </Stack>
          </Radio.Group>

          <Divider w="80%" />

          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Conexão CB
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
            Carga nos reservatórios
          </FormControl.Label>

          <FormInput
            title="Reservatório direito (Kg)"
            description="Preencha este campo com a carga no reservatório direito em kilos"
            errorMessage=""
            placeholder="1.5"
            keyboardType="numeric"
            onChangeText={setRightApplicatorLoadCallback}
          />

          <FormInput
            title="Reservatório central (Kg)"
            description="Preencha este campo com a carga no reservatório central em kilos"
            errorMessage=""
            placeholder="1.5"
            keyboardType="numeric"
            onChangeText={setCenterApplicatorLoadCallback}
          />

          <FormInput
            title="Reservatório esquerdo (Kg)"
            description="Preencha este campo com a carga no reservatório esquerdo em kilos"
            errorMessage=""
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
