import { 
  StatusBar,
  View,
  NetInfo,
  Alert,
  Text,
  Image
} from 'react-native'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { StackNavigator } from 'react-navigation'
import FormScreen from './screens/FormScreen'
import reducers from './reducers'
import Drawer from './components/Drawer'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    const Navigator = StackNavigator({
        Drawer: { 
          screen: Drawer
        },
        Home: { 
          screen: FormScreen,
        },
      }, {
        initialRouteName: 'Drawer',
        headerMode: 'screen',
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#0b59a0',
          },
          headerTitle: <View style={{alignSelf: 'center', alignContent: 'center', padding: 3}}><Image style={{flex: 1,resizeMode: 'contain'}} source={require('./pocketgov_logo.png')}/></View>,
          headerTitleStyle: {
            color: 'white',
          },
        //   //change this to white to see the back button text
          // headerBackTitleStyle: {
          //   color: '#000',
          // },
        //   headerTintColor: '#fff'
        }
      }
    );

    return (
      <Provider store={reducers}>
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#000"
          />
          <Navigator onNavigationStateChange={null} />
        </View>
      </Provider>
    );
  }
}

export default App;
