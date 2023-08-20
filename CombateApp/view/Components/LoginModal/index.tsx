import { Button, FormControl, Modal } from "native-base";
import { memo, useCallback, useRef, useState } from "react";
import { CONSTANTS } from "../../../src/internal/config/config";
import { Theme } from "../../../view/app/theme/theme";
import { userToItemArray } from "../../app/parser/user-to-item-array";
import FormInput from "../FormInput";
import SelectInput from "../SelectInput";

function LoginModal(props: {
  isOpen: boolean;
  onClose: () => void;
  loginValidator: (props: {
    user: { PASSWORD: string; USER: string };
    password: string;
  }) => boolean;
}) {
  const user = useRef<{ USER: string; PASSWORD: string }>(CONSTANTS.USERS[0]);
  function setUser(v: { USER: string; PASSWORD: string }) {
    user.current = v;
  }

  const password = useRef<string>();
  function setPassword(v: string) {
    password.current = v;
  }
  const [validationError, setValidationError] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(true);

  const onChangePassword = useCallback(
    (text: string) => {
      setPassword(text);
    },
    [setPassword, password]
  );
  const onChangeUser = useCallback(
    (id: string) => {
      let user: (typeof CONSTANTS.USERS)[0];
      CONSTANTS.USERS.forEach((u) => {
        if (u.USER == id) {
          user = u;
          return;
        }
      });
      setUser(user);
    },
    [setUser, user]
  );

  const onLogin = useCallback(() => {
    const data = {
      user: user.current,
      password: password.current,
    };
    const isValid = props.loginValidator(data);
    setIsValid(isValid);
    if (isValid) {
      onCloseCallback();
    }
  }, [user, password, setIsValid, setValidationError]);

  const onCloseCallback = useCallback(() => {
    setIsValid(true);
    props.onClose();
  }, []);
  return (
    <Modal isOpen={props.isOpen} onClose={onCloseCallback}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Configurações</Modal.Header>
        <Modal.Body>
          <FormControl>
            <SelectInput
              onItemSelected={onChangeUser}
              title={"Usuário"}
              w="100%"
              placeholder={user.current.USER}
              items={userToItemArray(CONSTANTS.USERS)}
            />
          </FormControl>
          <FormControl mt="3">
            <FormInput
              title="Senha"
              isInvalid={!isValid}
              w="100%"
              onChangeText={onChangePassword}
              isPassword={true}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer
          _text={{
            color: Theme().color.sError,
            position: "absolute",
            left: 12,
            right: 0,
          }}
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

export default memo(LoginModal);
