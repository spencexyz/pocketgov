import { 
  StatusBar,
  View,
  NetInfo,
  Alert,
  Text
} from 'react-native'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { StackNavigator } from 'react-navigation'
import FormScreen from './screens/FormScreen'
import reducers from './reducers'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    const Navigator = StackNavigator({
        Home: { 
          screen: FormScreen,
        },
      }, {
        initialRouteName: 'Home',
        headerMode: 'screen',
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#0b59a0',
          },
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
