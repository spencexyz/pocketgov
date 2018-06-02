import {
  View,
  Text,
  Picker,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
  ScrollView,
  Alert
} from 'react-native'
import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Hyperlink from 'react-native-hyperlink'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles/DenverPostScreenStyles'
import { connect } from 'react-redux'
import dismissKeyboard from 'dismissKeyboard'
// import SelectAuthorityScreen from '../screens/SelectAuthorityScreen'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import InputItem from '../components/InputItem'
// import CustomButton from '../components/CustomButton'
import ApiActions from '../actions/ApiActions'
import LocalStorage from '../utils/LocalStorage'
// import PrefActions from '../actions/PrefActions'
// import { trackWithProperties } from '../utils/Analytics'
import ListItemPicker from '../components/ListItemPicker'
import InputItem from '../components/InputItem'
import ListItem from '../components/ListItem'

class DenverPostScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      msg: '',
      loading: false,
      feedbackResp: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dpStatus === 'success') {
      this.setState({
        feedbackResp: nextProps.dpResp,
        loading: false,
        email: '',
        msg: ''
      });
    } else {
      this.setState({
        feedbackResp: nextProps.dpResp,
        loading: false,
      });
    }

    setTimeout(function () {
      this.setState({ feedbackResp: '' });
    }.bind(this), 2000);
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  submit() {
    if (!this.state.email) {
      Alert.alert(
        'Not just yet!',
        'We need your email so that we can follow up with you.',
        [
          {text: 'Add Email'},
        ]
      );
      return;
    } else if (!this.validateEmail(this.state.email)) {
      Alert.alert(
        'Invalid email.',
        'There is an issue with the format of your email. Please try again.',
        [
          {text: 'OK'},
        ]
      );
      return;
    } else if (!this.state.msg) {
      Alert.alert(
        'Woah there!',
        'What\'s your message?',
        [
          {text: 'Add Message'},
        ]
      );
      return;
    }
    this.setState({ loading: true });
    this.props.dispatch(ApiActions.submitDenverPost(this.state));
  }

  render() {
    return (
      <KeyboardAwareScrollView 
        style={styles.container}
        extraScrollHeight={50}
        key={1111}
      >
        <View>
          <Text style={{ color: '#616161', fontWeight: '700', fontSize: 15 }}>
            The Denverite is investigating why the City shut us down. Let the reporters at the Denverite 
            know what you liked about the app and how you feel about it being turned off.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColorAndroid="#FFF"
              returnKeyType='done'
              keyboardType={'default'}
              placeholder='mayor@denver.org'
              style={styles.inputSingle}
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
            />
            <TextInput
              style={[styles.inputSingle, styles.inputDouble]}
              multiline={true}
              placeholder='What is it you want to tell us?'
              onChangeText={(text) => this.setState({ msg: text })}
              value={this.state.msg}
              returnKeyType='done'
              blurOnSubmit={true}
              fontSize={16}
            />
          </View>
          <TouchableOpacity
            accessibilityTraits={'button'}
            onPress={() => this.submit()}
            style={styles.buttonContainer}
          >
            <View>
              {this.state.loading ?
                <ActivityIndicator size="small" color="#fff" />:
                <Text style={[styles.buttonText]}>Tell the Denverite!</Text>
              }
            </View>
          </TouchableOpacity>
          <Text style={{ textAlign: 'center' }}>{this.state.feedbackResp}</Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { dpResp, dpStatus } = state.apiReducer;

  return { dpResp, dpStatus };
}

export default connect(mapStateToProps)(DenverPostScreen)
