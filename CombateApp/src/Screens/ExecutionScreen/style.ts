import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    borderTopWidth: 0.2,
    marginLeft: '2%',
    width: '96%',
    borderColor: 'white',
  },
  closeLineContainer: {
    alignSelf: 'center',
  },
  closeLine: {
    width: 40,
    height: 4,
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
});
