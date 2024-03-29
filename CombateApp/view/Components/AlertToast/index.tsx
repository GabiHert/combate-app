import { Alert, CloseIcon, HStack, IconButton, Text, Toast } from 'native-base';
import Sound from 'react-native-sound';
import { Severity } from '../../../src/internal/core/enum/severity';
import { appConfig } from '../../../view/app/config/app-config';
import { Theme } from '../../../view/app/theme/theme';
const alertSound = require('../../app/assets/alert.mp3');

Sound.setCategory('Playback');
const alert = new Sound(alertSound, Sound.MAIN_BUNDLE);
export function AlertToast(props: {
  title: string;
  message?: string;
  severity: Severity;
  onCloseButtonPressed?: () => void;
}) {
  return (
    <Alert
      variant={'top-accent'}
      borderRadius={5}
      bgColor={props.severity.color}
      status={props.severity.name}
      alignItems="center"
      justifyContent={'center'}
      w={appConfig.screen.width - appConfig.screen.width / 5}
    >
      <HStack space={2}>
        <HStack space={2} flexShrink={1} alignItems="center" justifyContent={'center'}>
          <Alert.Icon color={'white'} />
          <Text
            textAlign={'center'}
            fontSize={Theme().font.size.l(appConfig.screen)}
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

      <Text fontSize={Theme().font.size.s(appConfig.screen)} color={'black'}>
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
  alertSounding?: boolean;
}) {
  if (props.alertSounding) {
    alert.setVolume(1).play().setNumberOfLoops(-1);
  }

  let onCloseButtonPressed = undefined;
  const id = Math.random();
  if (props.closeButton) {
    onCloseButtonPressed = () => {
      Toast.close(id);
    };
  }
  Toast.show({
    id: id,
    duration: props.durationMs ? props.durationMs : null,
    placement: 'top',
    onCloseComplete: () => {
      if (props.alertSounding) alert.stop();
    },
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
