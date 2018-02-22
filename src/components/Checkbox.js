import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Checkbox extends Component {
  render() {
    const { iconName, onPress } = this.props;
    return (
      <TouchableOpacity onPress={() => this.props.toggle()} style={[styles.container, this.props.checked ? styles.checked : styles.unchecked]}>
        <View>
          <Icon name={'check'} size={20} color={'blue'} style={[styles.titleText, this.props.checked ? styles.titleTextChecked : styles.titleTextUnchecked]}>{this.props.text}</Icon>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    height: 24,
    width: 24,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTextChecked: {
    color: '#fff'
  },
  titleTextUnchecked: {
    color: '#fff'
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'System',
  },
  checked: {
    backgroundColor: '#4FC3F7'
  },
  unchecked: {
    borderColor: '#4FC3F7',
    borderWidth: 1
  }
});

export default Checkbox;
