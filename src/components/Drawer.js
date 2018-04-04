import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, { Component } from 'react';
import DrawerScreen from './DrawerScreen';
import FormScreen from '../screens/FormScreen'

const getNavigationOptionsWithAction = (headerLeft) => ({
  headerLeft: headerLeft,
});

const getDrawerItem = navigation => (
  <Text 
    onPress={() => {
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen');
      } else {
        navigation.navigate('DrawerClose');
      }
    }}
    style={styles.menuButton}
  >
    Menu
  </Text>
);

class CustomDrawerContentComponent extends Component {
  constructor() {
    super();
  };

  render() {
    return (
      <View style={styles.container}>
        <DrawerScreen />
      </View>
    );
  }
};

const Drawer = DrawerNavigator({
  FormScreen: { screen: FormScreen },
}, {
  drawerWidth: 300,
  drawerPosition: 'left',
  contentComponent: props => <CustomDrawerContentComponent items={props} />
});

Drawer.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction(getDrawerItem(navigation));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  menuButton: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 15,
    fontSize: 16
  }
});

export default Drawer;
