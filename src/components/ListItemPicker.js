import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Picker,
  Platform,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  DatePickerIOS,
  TimePickerAndroid,
  DatePickerAndroid
} from 'react-native';

class ListItemPicker extends Component {
  constructor() {
    super();

    this.state = {
      visible: false
    };
  }

  renderPickerIOS() {
    return (
      <Picker
        selectedValue={this.props.val}
        onValueChange={(itemValue) => this.props.press(itemValue)}>
        {this.props.pickerData.map(function(val, index) {
          return <Picker.Item key={val} label={val} value={index} />;
        })}
      </Picker>
    );
  }

  renderBody() {
    return (
      <TouchableHighlight
        style={styles.ListItemContainer}
        onPress={() => this.setState({ visible: true })}
        underlayColor={'#F2F2F2'}
        accessibilityLabel={this.props.label + ', drop down list'}
      >
        <View style={styles.innerContainer}>
          <Text style={{textAlign: 'left', flex: 1}}>{this.props.pickerData[this.props.val]}</Text>
          <Modal
            animationType={'slide'}
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => {}}
          >
            <View style={{backgroundColor: '#FFF', marginTop: Dimensions.get('window').height-250}}>
              <View style={styles.pickerModalTopBar} >
                <TouchableOpacity onPress={() => this.setState({ visible: false })} >
                  <Text allowFontScaling={false} style={{color: 'blue', fontFamily: 'System'}}>Done</Text>
                </TouchableOpacity>
              </View>
              { this.renderPickerIOS() }
            </View>
          </Modal>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        { this.renderBody() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ListItemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#ECECEC',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  pickerModalTopBar: {
    backgroundColor: 'white',
    flexGrow: 1,
    height: 40,
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD',
    flexDirection: 'row-reverse'
  },
  modalRowTextArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
});

export default ListItemPicker;