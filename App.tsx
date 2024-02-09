import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '@/Screens/Home';

import {QueryClient, QueryClientProvider} from 'react-query';
import ResultScreen from '@/Screens/Results';
import SearchScreen from '@/Screens/Search';
import {Text} from 'react-native';
import TicketsScreen from '@/Screens/Tickets';
import {Neutral, Primary} from '@/Assets/Colors';

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
                tabBarIcon: props => {
                  return <Icon name="home" size={24} color={props.color} />;
                },
              }}
            />
            <Tab.Screen
              name="SearchStack"
              component={SearchStack}
              options={{
                tabBarLabel: 'Search',
                tabBarIcon: props => {
                  return <Icon name="search" size={24} color={props.color} />;
                },
              }}
            />
            <Tab.Screen
              name="TicketsStack"
              component={TicketsStack}
              options={{
                tabBarLabel: 'Tickets',
                tabBarIcon: props => {
                  return (
                    <Icon
                      name="airplane-ticket"
                      size={24}
                      color={props.color}
                    />
                  );
                },
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
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Results" component={ResultScreen} />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Results" component={ResultScreen} />
    </Stack.Navigator>
  );
};

const TicketsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tickets" component={TicketsScreen} />
    </Stack.Navigator>
  );
};

export default App;
