import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  divider: {
    borderTopWidth: 0.9,
    marginLeft: '2%',
    width: '96%',
    borderColor: 'white',
  },
  closeLineContainer: {
    paddingBottom: 2,
    height: 30,
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
  statusBarContainer: {
    height: '15%',
  },

  velocityContainer: {
    width: '20%',
    height: '100%',
    marginLeft: '3%',
  },
  velocityLabel: { color: 'white' },
  velocity: { color: 'white', fontSize: 60 },
});
