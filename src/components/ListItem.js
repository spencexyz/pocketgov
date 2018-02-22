import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  AccessibilityInfo,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import Checkbox from './Checkbox';
// import Icon from 'react-native-vector-icons/FontAwesome';

class ListItem extends Component {
  constructor() {
    super();
  }

  getStyles() {
    let totalChildren = React.Children.count(this.props.children);
    if (totalChildren === 1) {
      return ({
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10
      });
    }
  }

  selectItem() {
    if (this.props.value) {
      this.props.toggle();
    } else {
      this.props.toggle();
    }
  }

  renderCheckbox() {
    return <Checkbox toggle={this.selectItem.bind(this)} checked={this.props.value} />;
  }

  checkingAccessTap() {
    if (this.props.checkbox) {
      return (
        <View accessible={true} onAccessibilityTap={() => this.selectItem()} accessibilityTraits={'button'} style={[styles.ListItemContainer, this.getStyles(), this.props.customStyle, this.props.checkbox ? '' : { padding: 13 } ]}>
          <View style={styles.leftContainer}>
            {this.renderCheckbox()}
            <Text style={styles.titleText}>{this.props.text}</Text>
          </View>
          {this.props.children}
        </View>
      )
    } else if (this.props.switch) {
      return (
        <View accessible={true} onAccessibilityTap={() => this.props.toggle()} accessibilityTraits={'button'} style={[styles.ListItemContainer, this.getStyles(), this.props.customStyle, this.props.checkbox ? '' : { padding: 13 } ]}>
          <View style={styles.leftContainer}>
            <Text style={styles.titleText}>{this.props.text}</Text>
          </View>
          {this.props.children}
        </View>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.toggle()}>
          <View accessible={true} accessibilityTraits={'button'} style={[styles.ListItemContainer, this.getStyles(), this.props.customStyle, this.props.checkbox ? '' : { padding: 13 } ]}>
            <View style={styles.leftContainer}>
              <Text style={styles.titleText}>{this.props.text}</Text>
            </View>
            {this.props.children}
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  render() {
    return this.checkingAccessTap();
  }
}

const styles = new StyleSheet.create({
  ListItemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ListItem;
