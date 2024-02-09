jest.mock('@react-native-async-storage/async-storage', () => {
  let store = {};
  return {
    setItem: (key, value) => {
      return new Promise((resolve, reject) => {
        if (typeof key !== 'string' || typeof value !== 'string') {
          reject(new Error('key and value must be string'));
        }
        store[key] = value;
        resolve(null);
      });
    },
    getItem: key => {
      return new Promise(resolve => {
        if (store.hasOwnProperty(key)) {
          resolve(store[key]);
        } else {
          resolve(null);
        }
      });
    },
    removeItem: key => {
      return new Promise((resolve, reject) => {
        if (store.hasOwnProperty(key)) {
          resolve(delete store[key]);
        } else {
          reject('No such key!');
        }
      });
    },
    clear: () => {
      store = {};
      return Promise.resolve(null);
    },
  };
});

jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn(),
  };
});

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('react-native-date-picker', () => 'DatePicker');

jest.mock('@gorhom/bottom-sheet', () => ({
  BottomSheet: 'BottomSheet',
  BottomSheetBackdrop: 'BottomSheetBackdrop',
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: () => null,
    Screen: () => null,
  }),
}));

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    GestureHandlerRootView: View,
    Direction: {},
    State: {},
  };
});
