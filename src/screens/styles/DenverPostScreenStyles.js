import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  inputContainer: {
    // borderBottomWidth: 0.5,
    flex: 1,
    flexWrap: 'nowrap',
    overflow: 'hidden',
    borderColor: '#DDD',
    padding: 15,
  },
  inputContainerSingle: {
    borderBottomWidth: 0.5,
    flex: 1,
    height: (Platform.OS === 'ios') ? 80 : 100,
    flexWrap: 'nowrap',
    overflow: 'hidden',
    borderColor: '#DDD',
    padding: 15,
  },
  // inputSingle: {
  //   height: 40,
  //   fontFamily: 'System',
  //   flex: 1,
  // },
  input: {
    height: 70,
    fontFamily: 'System',
    flex: 1,
    fontSize: 16,
    color: '#757575'
  },
  inputSingle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  inputDouble: {
    height: 200,
    marginTop: 10
  },
  // inputContainer: {
  //   marginTop: 15
  // },
  buttonContainer: {
    padding: 10,
    marginTop: 20,
    backgroundColor: '#f1851c',
    borderRadius: 3,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1.5
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700'
  },
  link: {
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: '#00B0FF',
  }
});
