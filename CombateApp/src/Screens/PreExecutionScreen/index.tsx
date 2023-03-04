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
import React, { useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../../app/theme/theme';
import FormInput from '../../Components/FormInput';
import SelectInput from '../../Components/SelectInput';
import SlideInput from '../../Components/SlideInput';

interface state {
  applicator: {
    center: { load: number };
    right: { load: number };
    left: { load: number };
  };
}

function PreExecutionScreen(props: { navigation: any }) {
  const [leftApplicatorLoad, setLeftApplicatorLoad] = useState<number>(0);
  const [centerApplicatorLoad, setCenterApplicatorLoad] = useState<number>(0);
  const [rightApplicatorLoad, setRightApplicatorLoad] = useState<number>(0);

  function onNextPressed() {
    console.log('onNextPressed');
    props.navigation.navigate('ExecutionScreen', {
      applicator: {
        center: { load: centerApplicatorLoad },
        right: { load: rightApplicatorLoad },
        left: { load: leftApplicatorLoad },
      },
    });
  }

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
          />
          <FormInput
            title="Projeto"
            description="Preencha este campo com o nome do projeto"
            errorMessage=""
            placeholder="Projeto x"
          />
          <FormInput
            title="Numero do talhão"
            description="Preencha este campo com o numero do talhão da aplicação"
            errorMessage=""
            placeholder="22"
            keyboardType="numeric"
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
          />

          <Divider w="80%" />

          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: 20 }}>
            Informações do local
          </FormControl.Label>

          <SlideInput
            unit={'m'}
            title="Espaçamento entre linhas"
            defaultValue={0}
            disabled={false}
            maxValue={20}
            minValue={1}
            step={0.5}
            onChangeEnd={() => {}}
          />
          <FormInput
            title="Numero de ruas"
            description="Preencha este campo com o numero de ruas a serem percorridas"
            errorMessage=""
            placeholder="1"
            keyboardType="numeric"
          />

          <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a size">
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
              <Radio value="1" colorScheme="green" size="md" my={1}>
                Seco
              </Radio>
              <Radio value="2" colorScheme="green" size="md" my={1}>
                Ùmido
              </Radio>
              <Radio value="3" colorScheme="green" size="md" my={1}>
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
          <SlideInput
            unit={'g'}
            title="Reservatório esquerdo"
            defaultValue={0}
            disabled={false}
            maxValue={10000}
            minValue={0}
            step={100}
            onChangeEnd={(value) => {
              setLeftApplicatorLoad(value);
            }}
          />
          <SlideInput
            unit={'g'}
            title="Reservatório central"
            defaultValue={0}
            disabled={false}
            maxValue={10000}
            minValue={0}
            step={100}
            onChangeEnd={(value) => {
              setCenterApplicatorLoad(value);
            }}
          />
          <SlideInput
            unit={'g'}
            title="Reservatório direito"
            defaultValue={0}
            disabled={false}
            maxValue={10000}
            minValue={0}
            step={100}
            onChangeEnd={(value) => {
              setRightApplicatorLoad(value);
            }}
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
        onPressOut={() => {
          onNextPressed();
        }}
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
