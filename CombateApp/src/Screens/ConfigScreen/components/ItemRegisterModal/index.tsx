import { Button, FormControl, Modal } from 'native-base';
import { memo, useCallback, useState } from 'react';
import { Theme } from '../../../../app/theme/theme';
import FormInput from '../../../../Components/FormInput';

function ItemRegisterModal(props: {
  isOpen: boolean;
  onClose: () => void;
  validator: (name: string) => string;
  onAddPressed: (name: string) => void;
  title: string;
  formTitle: string;
  formDescription: string;
}) {
  const [name, setName] = useState<string>();
  const [validationError, setValidationError] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(true);

  const onChangeDescription = useCallback(
    (text: string) => {
      setName(text);
    },
    [setName, name]
  );
  const onAddPressed = useCallback(() => {
    const error = props.validator(name);
    if (error) {
      setIsValid(false);
      setValidationError(error);
    } else {
      setValidationError(error);
      setIsValid(true);
      props.onAddPressed(name);
      props.onClose();
    }
  }, [setIsValid, name]);
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{props.title}</Modal.Header>
        <Modal.Body>
          <FormControl mt="3">
            <FormInput
              title={props.formTitle}
              description={props.formDescription}
              isInvalid={!isValid}
              errorMessage={validationError}
              w="100%"
              onChangeText={onChangeDescription}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer
          _text={{ color: Theme().color.sError, position: 'absolute', left: 12, right: 0 }}
        >
          <Button
            _pressed={{ opacity: 0.8 }}
            bgColor={Theme().color.b200}
            _text={{ color: Theme().color.b400 }}
            onPress={onAddPressed}
          >
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default memo(ItemRegisterModal);
