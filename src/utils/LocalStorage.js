'use strict';

import { AsyncStorage, Alert } from 'react-native';

async function getObjData(key) {
  try {
    var value = await AsyncStorage.getItem(key);
    if (value !== null){
      return JSON.parse(value);
    } else {
      return false;
    }
  } catch (error) {
    // Error retrieving data
    throw('Error Retrieving Data', error);
  }
}

async function saveObjData(key, obj) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
    return true;
  } catch (error) {
    // Error saving data
    throw('Error Saving Data', error);
  }
}

async function removeObjData(key) {
  //TODO
}

async function clearAll() {
  await AsyncStorage.clear();
  Alert.alert(
    'Storage Cleared',
    'Favorites, current routes, etc cleared.',
    [
      {text: 'OK'},
    ]
  );
}

module.exports = {
  getObjData,
  saveObjData,
  removeObjData,
  clearAll,
};
