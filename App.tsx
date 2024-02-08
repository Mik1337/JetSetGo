import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '@/Screens/Home';

import {QueryClient, QueryClientProvider} from 'react-query';
import ResultScreen from '@/Screens/Results';
import SearchScreen from '@/Screens/Search';

const queryClient = new QueryClient();

interface ResultsParams {
  from: string;
  to: string;
}

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Results: ResultsParams;
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
            <Tab.Screen
              name="HomeStack"
              component={HomeStack}
              options={{
                tabBarLabel: 'Home',
              }}
            />
            <Tab.Screen
              name="SearchStack"
              component={SearchStack}
              options={{
                tabBarLabel: 'Search',
              }}
            />
            <Tab.Screen
              name="TicketsStack"
              component={TicketsStack}
              options={{
                tabBarLabel: 'Tickets',
              }}
            />
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
      <Stack.Screen name="Results" component={ResultScreen} />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Results" component={ResultScreen} />
    </Stack.Navigator>
  );
};

const TicketsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default App;
