import { Box, Button, FormControl, Input, Modal, VStack, WarningOutlineIcon } from 'native-base';
import { useCallback, useState } from 'react';
import { Text } from 'react-native-svg';
import { Theme } from '../../app/theme/theme';

function LoginModal(props: {
  isOpen: boolean;
  onClose: () => void;
  loginValidator: (props: { user: string; password: string }) => boolean;
}) {
  const [user, setUser] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [validationError, setValidationError] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(true);

  const onChangePassword = useCallback(
    (text: string) => {
      setPassword(text);
    },
    [setPassword, password]
  );
  const onChangeUser = useCallback(
    (text: string) => {
      setUser(text);
    },
    [setUser, user]
  );

  const onLogin = useCallback(() => {
    const isValid = props.loginValidator({ user, password });
    console.log(isValid);
    setIsValid(isValid);
    if (isValid) {
      props.onClose();
    }
  }, [user, password, setIsValid, setValidationError]);
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Configurações</Modal.Header>
        <Modal.Body>
          <FormControl isInvalid={!isValid}>
            <FormControl.Label>Usuário</FormControl.Label>
            <Input borderRadius={20} onChangeText={onChangeUser} />
          </FormControl>
          <FormControl isInvalid={!isValid} mt="3">
            <FormControl.Label>Senha</FormControl.Label>
            <Input borderRadius={20} type={'password'} onChangeText={onChangePassword} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer
          _text={{ color: Theme().color.sError, position: 'absolute', left: 12, right: 0 }}
        >
          <Button
            _pressed={{ opacity: 0.8 }}
            bgColor={Theme().color.b200}
            _text={{ color: Theme().color.b400 }}
            onPress={onLogin}
          >
            Entrar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default LoginModal;
