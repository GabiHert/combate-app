import { Box, Button, FormControl, Input, Modal, VStack, WarningOutlineIcon } from 'native-base';
import { useCallback, useState } from 'react';
import { config } from '../../../../api/core/port/config-port';
import { AppConfig } from '../../../../app/config/app-config';
import { Theme } from '../../../../app/theme/theme';
import FormInput from '../../../../Components/FormInput';
import SelectInput from '../../../../Components/SelectInput';
import { mapStringToItemArray } from '../../../../app/parser/map-string-to-item-array';

function FinishExecutionModal(props: {
  isOpen: boolean;
  onClose: () => void;
  onFinishExecutionPress: () => void;
}) {
  const [event, setEvent] = useState<string>();

  const onEventChange = useCallback(
    (event: string) => {
      setEvent(event);
    },
    [setEvent]
  );

  const onFinishPressed = useCallback(() => {
    //todo:call backend to register event
    props.onFinishExecutionPress();
  }, [event]);
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <Modal.Content maxWidth="500px" maxH={'500px'}>
        <Modal.CloseButton />
        <Modal.Header
          _text={{
            fontWeight: 'bold',
            fontSize: Theme().font.size.xl(AppConfig.screen),
          }}
        >
          Finalizar execução
        </Modal.Header>
        <Modal.Body h={'100%'}>
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.m(AppConfig.screen) }}
          >
            Motivo da parada
          </FormControl.Label>
          <SelectInput
            onItemSelected={onEventChange}
            w={'100%'}
            h={20}
            title="Descreva o motivo do fim da execução"
            placeholder=""
            items={mapStringToItemArray(config.getCache().STOP_REASONS_EVENTS)}
          />
        </Modal.Body>
        <Modal.Footer
          _text={{ color: Theme().color.sError, position: 'absolute', left: 12, right: 0 }}
        >
          <Button
            _pressed={{ opacity: 0.8 }}
            bgColor={Theme().color.sError}
            _text={{
              color: Theme().color.b500,
              fontSize: Theme().font.size.m(AppConfig.screen),
            }}
            borderRadius={20}
            onPress={onFinishPressed}
            h={20}
            w={40}
          >
            Finalizar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default FinishExecutionModal;
