import { Button, FormControl, Modal } from 'native-base';
import { memo, useCallback, useState } from 'react';
import { appConfig } from '../../../../app/config/app-config';
import { Theme } from '../../../../app/theme/theme';
import SelectInput from '../../../../Components/SelectInput';
import { CONSTANTS } from '../../../../internal/config/config';

function UnderForestModal(props: { isOpen: boolean; onClose: () => void; onOkPress: () => void }) {
  const [underForest, setUnderForest] = useState<string>();
  const [underForestError, setUnderForestError] = useState<string>();

  const onEventChange = useCallback(
    (event: string) => {
      setUnderForest(event);
    },
    [setUnderForest]
  );

  const onFinishPressed = useCallback(() => {
    //todo:call backend to register event
    const errorMessage = Instance.GetInstance().validator.validateUnderForestForm(underForest);
    if (!errorMessage) {
      props.onOkPress();
    } else {
      setUnderForestError(errorMessage);
    }
  }, [underForest]);

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
          Finalizar execução
        </Modal.Header>
        <Modal.Body h={'100%'}>
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.m(appConfig.screen) }}
          >
            Sub-bosque
          </FormControl.Label>
          <SelectInput
            onItemSelected={onEventChange}
            w={'100%'}
            h={20}
            title="Selecione o sub-bosque"
            placeholder=""
            items={CONSTANTS.UNDER_FOREST_ITEMS}
            errorMessage={underForestError}
          />
        </Modal.Body>
        <Modal.Footer
          _text={{ color: Theme().color.sError, position: 'absolute', left: 12, right: 0 }}
        >
          <Button
            _pressed={{ opacity: 0.8 }}
            bgColor={Theme().color.b200}
            _text={{
              color: Theme().color.b500,
              fontSize: Theme().font.size.m(appConfig.screen),
            }}
            borderRadius={20}
            onPress={onFinishPressed}
            h={20}
            w={40}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default memo(UnderForestModal);
