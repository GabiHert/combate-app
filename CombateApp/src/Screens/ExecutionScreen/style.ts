import { StyleSheet } from 'react-native';
import { Theme } from '../../app/theme/theme';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    borderTopWidth: 0.9,
    marginLeft: '2%',
    width: '96%',
    borderColor: 'white',
  },
  closeLineContainer: {
    paddingBottom: 20,
    alignSelf: 'center',
  },
  closeLine: {
    width: 70,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'white',
    marginTop: 9,
    marginBottom: 9,
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  statusBarContainer: {
    height: '15%',
    paddingTop: '2%',
  },
  statusBar: {
    width: '98%',
    backgroundColor: Theme().color.b400,
    marginLeft: '1%',
    height: '90%',
    borderRadius: 100,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  velocityContainer: {
    width: 120,
    height: '100%',
    marginLeft: '5%',
  },
  velocityLabel: {color: 'white', marginBottom: 0},
  velocity: {color: 'white', fontSize: 60},
  doseSelectorContainer: {
    backgroundColor: 'black',
    width: '100%',
    height: '60%',
  },
  doseButtonContainer: {backgroundColor: 'blue', width: '100%', height: '25%'},
});
