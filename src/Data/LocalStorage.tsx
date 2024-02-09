/**
 * Store booking data in local storage, since we don't have a backend yet
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import {Result} from '@/Data/Interface';

export const storeBookingData = async (data: Result) => {
  try {
    // take the data and convert add it to existing data array
    const existingData = await AsyncStorage.getItem('bookingData');

    if (existingData) {
      const parsedData = JSON.parse(existingData);

      // if the data already exists, don't add it again
      if (parsedData.find((item: Result) => item.id === data.id)) {
        return;
      }

      const newData = [...parsedData, data];
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem('bookingData', jsonValue);
    } else {
      const jsonValue = JSON.stringify([data]);
      await AsyncStorage.setItem('bookingData', jsonValue);
    }
  } catch (e) {
    console.log('Error storing data', e);
  }
};

export const removeBookingData = async (id: string) => {
  try {
    const existingData = await AsyncStorage.getItem('bookingData');

    if (existingData) {
      const parsedData = JSON.parse(existingData);
      const newData = parsedData.filter((item: Result) => item.id !== id);
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem('bookingData', jsonValue);
    }
  } catch (e) {
    console.log('Error removing data', e);
  }
};

export const getBookingData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('bookingData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error getting data', e);
  }
};
