import { Box, Button, FormControl, Input, Modal, VStack, WarningOutlineIcon } from 'native-base';
import { useCallback, useState } from 'react';
import { AppConfig } from '../../../../app/config/app-config';
import { Theme } from '../../../../app/theme/theme';
import FormInput from '../../../../Components/FormInput';
import SelectInput from '../../../../Components/SelectInput';

function EventRegisterModal(props: { isOpen: boolean; onClose: () => void }) {
  const [event, setEvent] = useState<string>();

  const onEventChange = useCallback(
    (event: string) => {
      console.log(event);
      setEvent(event);
    },
    [setEvent]
  );

  const onRegisterPress = useCallback(() => {
    //todo:call backend to register event
    props.onClose();
  }, [event]);
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <Modal.Content maxWidth="500px" maxH={'500px'}>
        <Modal.CloseButton />
        <Modal.Header
          _text={{
            fontWeight: 'bold',
            fontSize: Theme().font.size.s(AppConfig.screen.width),
          }}
        >
          Sinalizar Evento
        </Modal.Header>
        <Modal.Body h={'100%'}>
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.m(AppConfig.screen.width) }}
          >
            Tipo de evento
          </FormControl.Label>
          <SelectInput
            onItemSelected={onEventChange}
            w={'100%'}
            h={20}
            title="Selecione tipo de evento que foi encontrado"
            placeholder="Bloqueio de via"
            items={[
              { value: 'teste', label: 'teste' },
              { value: 'teste', label: 'teste' },
            ]}
          />
        </Modal.Body>
        <Modal.Footer
          _text={{ color: Theme().color.sError, position: 'absolute', left: 12, right: 0 }}
        >
          <Button
            _pressed={{ opacity: 0.8 }}
            bgColor={Theme().color.b200}
            _text={{
              color: Theme().color.b400,
              fontSize: Theme().font.size.m(AppConfig.screen.width),
            }}
            borderRadius={20}
            onPress={onRegisterPress}
            h={20}
            w={40}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default EventRegisterModal;
