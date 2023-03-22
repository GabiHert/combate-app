import { StyleSheet } from 'react-native';
import { AppConfig } from '../../app/config/app-config';
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
    fontSize: Theme().font.size.s(AppConfig.screen.width),
    fontWeight: '500',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  versionText: { color: 'white' },
});
