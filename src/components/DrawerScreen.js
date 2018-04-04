import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ApiActions from '../actions/ApiActions'

class DrawerScreen extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      msg: '',
      loading: false,
      feedbackResp: ''
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'success') {
      this.setState({
        feedbackResp: nextProps.feedbackResp,
        loading: false,
        email: '',
        msg: ''
      });
    } else {
      this.setState({
        feedbackResp: nextProps.feedbackResp,
        loading: false,
      });
    }

    setTimeout(function () {
      this.setState({ feedbackResp: '' });
    }.bind(this), 2000);
  }

  submit() {
    this.setState({ loading: true });
    this.props.dispatch(ApiActions.submitFeedback(this.state));
  }

  render() {
    return (
      <View>
        <Text style={{ color: '#616161', fontWeight: '700', fontSize: 15 }}>
          Pocketgov is an open-source app built with donated time by developers in Denver. 
          We do our best, but we're only human. How can we make this app even better?
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
          style={[styles.buttonContainer, { marginBottom: 10 }]}
        >
          <View>
            {this.state.loading ?
              <ActivityIndicator size="small" color="#fff" />:
              <Text style={[styles.buttonText]}>Talk to the Developers</Text>
            }
          </View>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center' }}>{this.state.feedbackResp}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  inputContainer: {
    marginTop: 15
  },
  buttonContainer: {
    padding: 10,
    marginTop: 20,
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
});

const mapStateToProps = (state) => {
  const { feedbackResp, status } = state.apiReducer;

  return { feedbackResp, status };
}

export default connect(mapStateToProps)(DrawerScreen)
