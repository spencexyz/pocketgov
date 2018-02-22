import React, { Component } from 'react';
import { 
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  ReactNative
} from 'react-native';

class InputItem extends Component {
  get inputLabel () {
    return this.props.access + ' input field';
  }

  render() {
    return (
      <View style={styles.inputContainerSingle}>
        <Text accessible={true} style={styles.label}>{this.props.label}</Text>
        <View style={[styles.underline, this.props.editable ? {} : { borderBottomWidth: 0 }]}>
          <TextInput
            accessibilityLabel={this.inputLabel}
            editable={this.props.editable}
            underlineColorAndroid="#FFF"
            returnKeyType='done'
            keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
            style={styles.inputSingle}
            placeholder={this.props.placeholder}
            onChangeText={(text) => this.props.setVal(text)}
            value={this.props.value}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainerSingle: {
    borderBottomWidth: 0.5,
    height: (Platform.OS === 'ios') ? 80 : 100,
    flexWrap: 'nowrap',
    overflow: 'hidden',
    borderColor: '#DDD',
    padding: 15,
  },
  label: {
    fontSize: 18,
    fontFamily: 'System',
    paddingBottom: 5,
  },
  inputSingle: {
    fontFamily: 'System',
    flex: 1,
    color: '#757575'
  },
  underline: {
    flex: 1,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#fff'
  }
});

export default InputItem;
