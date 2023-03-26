import {
  Alert,
  Box,
  CloseIcon,
  Divider,
  HStack,
  IconButton,
  Stack,
  Text,
  Toast,
  VStack,
} from 'native-base';
import { Severity } from '../../api/core/enum/severity';
import { AppConfig } from '../../app/config/app-config';
import { Theme } from '../../app/theme/theme';

export function AlertToast(props: {
  title: string;
  message?: string;
  severity: Severity;
  onCloseButtonPressed?: () => void;
}) {
  return (
    <Alert
      variant={'top-accent'}
      p={2}
      borderRadius={5}
      bgColor={props.severity.color}
      status={props.severity.name}
      alignItems="center"
      justifyContent={'center'}
    >
      <HStack space={2}>
        <HStack space={2} flexShrink={1} alignItems="center" justifyContent={'center'}>
          <Alert.Icon color={'white'} />
          <Text
            textAlign={'center'}
            fontSize={Theme().font.size.l(AppConfig.screen.width)}
            fontWeight={'bold'}
            color={'black'}
          >
            {props.title}
          </Text>
        </HStack>
        {props.onCloseButtonPressed ? (
          <IconButton
            _pressed={{ opacity: 0.8 }}
            onPress={props.onCloseButtonPressed}
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="4" />}
            _icon={{
              color: 'black',
            }}
          />
        ) : (
          ''
        )}
      </HStack>

      <Text fontSize={Theme().font.size.s(AppConfig.screen.width)} color={'black'}>
        {props.message}
      </Text>
    </Alert>
  );
}

export function ShowToast(props: {
  title: string;
  message?: string;
  durationMs: number;
  severity: Severity;
  closeButton?: boolean;
}) {
  let onCloseButtonPressed = undefined;
  const id = Math.random();
  if (props.closeButton) {
    onCloseButtonPressed = () => {
      Toast.close(id);
    };
  }
  Toast.show({
    id: id,
    duration: props.durationMs ? props.durationMs + 1000 : undefined,
    placement: 'top',
    minW: '60%',
    maxW: '80%',
    render: () => {
      return (
        <AlertToast
          onCloseButtonPressed={onCloseButtonPressed}
          title={props.title}
          message={props.message}
          severity={props.severity}
        />
      );
    },
  });
}
