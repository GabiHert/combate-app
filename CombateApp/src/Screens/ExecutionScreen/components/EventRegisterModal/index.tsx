import { Box, Button, FormControl, Input, Modal, VStack, WarningOutlineIcon } from 'native-base';
import { memo, useCallback, useState } from 'react';
import { config } from '../../../../internal/core/port/config-port';
import { appConfig } from '../../../../app/config/app-config';
import { mapStringToItemArray } from '../../../../app/parser/map-string-to-item-array';
import { Theme } from '../../../../app/theme/theme';
import FormInput from '../../../../Components/FormInput';
import SelectInput from '../../../../Components/SelectInput';

function EventRegisterModal(props: { isOpen: boolean; onClose: () => void }) {
  const [event, setEvent] = useState<string>();

  const onEventChange = useCallback(
    (event: string) => {
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
            fontSize: Theme().font.size.xl(appConfig.screen),
          }}
        >
          Sinalizar Evento
        </Modal.Header>
        <Modal.Body h={'100%'}>
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.m(appConfig.screen) }}
          >
            Tipo de evento
          </FormControl.Label>
          <SelectInput
            onItemSelected={onEventChange}
            w={'100%'}
            h={20}
            title="Selecione tipo de evento que foi encontrado"
            placeholder=""
            items={mapStringToItemArray(config.getCache().EVENTS)}
          />
        </Modal.Body>
        <Modal.Footer
          _text={{ color: Theme().color.sError, position: 'absolute', left: 12, right: 0 }}
        >
          <Button
            _pressed={{ opacity: 0.8 }}
            bgColor={Theme().color.sWarning}
            _text={{
              color: Theme().color.b400,
              fontSize: Theme().font.size.m(appConfig.screen),
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

export default memo(EventRegisterModal);
