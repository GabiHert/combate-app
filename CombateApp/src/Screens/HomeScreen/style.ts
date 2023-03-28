import { StyleSheet } from 'react-native';
import { appConfig } from '../../app/config/app-config';
import { Theme } from '../../app/theme/theme';

export default StyleSheet.create({
  button: {
    width: '35%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonColorPressed: {
    opacity: 50,
  },
  buttonColorReleased: {
    opacity: 100,
  },
  buttonText: {
    fontSize: Theme().font.size.s(appConfig.screen),
    fontWeight: '500',
  },
  container: {},
  versionText: { color: 'white' },
});
