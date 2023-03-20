import { Box, Button, FormControl, Input, Modal, VStack, WarningOutlineIcon } from 'native-base';
import { useCallback, useState } from 'react';
import { Theme } from '../../../../app/theme/theme';
import FormInput from '../../../../Components/FormInput';
import SelectInput from '../../../../Components/SelectInput';

function FinishExecutionModal(props: {
  isOpen: boolean;
  onClose: () => void;
  onFinishExecutionPress: () => void;
}) {
  const [event, setEvent] = useState<string>();

  const onEventChange = useCallback(
    (event: string) => {
      console.log(event);
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
        <Modal.Header _text={{ fontWeight: 'bold', fontSize: Theme().font.size.l }}>
          Finalizar execução
        </Modal.Header>
        <Modal.Body h={'100%'}>
          <FormControl.Label mt={5} _text={{ fontWeight: 'bold', fontSize: Theme().font.size.m }}>
            Motivo da parada
          </FormControl.Label>
          <SelectInput
            onItemSelected={onEventChange}
            w={'100%'}
            h={20}
            title="Descreva o motivo do fim da execução"
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
            bgColor={Theme().color.sError}
            _text={{ color: Theme().color.b500, fontSize: Theme().font.size.m }}
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
