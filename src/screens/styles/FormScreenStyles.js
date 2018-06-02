import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 22,
    paddingBottom: 3,
    paddingTop: 15,
    fontWeight: '700'
  },
  headerContainer: {
    // borderColor: '#000',
    // borderBottomWidth: 1
  },
  label: {
    fontSize: 18,
    fontFamily: 'System',
    paddingBottom: 5,
  },
  inputContainer: {
    borderBottomWidth: 0.5,
    flex: 1,
    height: 150,
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
  inputSingle: {
    height: 40,
    fontFamily: 'System',
    flex: 1,
  },
  input: {
    height: 70,
    fontFamily: 'System',
    flex: 1,
    fontSize: 16,
    color: '#757575'
  },
  ListItemContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ECECEC',
    borderBottomWidth: 1
  },
  prefContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ECECEC',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    padding: 10,
    margin: 20,
    backgroundColor: '#f1851c',
    borderRadius: 3,
    shadowColor: '#000',
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
  subText: {
    color: '#9E9E9E',
    fontWeight: '600'
  },
  nestedQuestion: {
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: 'transparent'
  },
  imageSuccess: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#4CAF50'
  },
  imageFailure: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#E91E63'
  },
  image: {
    height: 200,
    width: 150,
    alignSelf: 'center',
    marginTop: 15
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 60,
    backgroundColor: 'transparent'
  },
  errorMsg: {
    color: '#f44336',
    paddingLeft: 15,
    marginTop: 8,
    marginBottom: -10
  },
  successMsg: {
    color: '#66BB6A',
    paddingLeft: 15,
    marginTop: 8,
    marginBottom: -10
  },
  modalText: {
    fontSize: 25,
    fontWeight: '700',
    padding: 20
  },
  msgPara: {
    paddingTop: 10,
    fontSize: 16
  },
  msgContainer: {
    padding: 10,
  }
});
