import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '@/Screens/Home';

import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Details: {itemId: number};
  Search: undefined;
};

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="SearchStack" component={SearchStack} />
          </Tab.Navigator>
        </GestureHandlerRootView>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default App;
