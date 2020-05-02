import React, { useEffect } from 'react';

import { Provider as ReduxProvider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationContainer,
  DefaultTheme as NavigationTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import { store } from './redux';
import HomeScreen from './screens/HomeScreen';
import MovementsScreen from './screens/MovementsScreen';
import GroupsScreen from './screens/GroupsScreen';
import NewGroup from './screens/NewGroup';
import { colors } from './values/colors';
import { StatusBar } from 'react-native';
import EnvelopesScreen from './screens/EnvelopesScreen';
import NewEnvelope from './screens/NewEnvelope';

const navigationTheme = {
  ...NavigationTheme,
  colors: {
    ...NavigationTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
  },
};

const paperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
  },
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabNavigatorOptions = {
  keyboardHidesTabBar: true,
  inactiveBackgroundColor: colors.accent,
  activeBackgroundColor: colors.accent,
  inactiveTintColor: colors.background,
  activeTintColor: colors.primary,
  style: {
    height: 52,
  },
};

const homeOptions = {
  tabBarIcon: (props) => <MaterialCommunityIcons name="home" {...props} />,
};

const envelopeOptions = {
  title: 'Envelopes',
  tabBarIcon: (props) => <MaterialCommunityIcons name="email" {...props} />,
};

const studyOptions = {
  tabBarIcon: (props) => <MaterialCommunityIcons name="book" {...props} />,
};

const movementsOptions = {
  tabBarIcon: (props) => (
    <MaterialCommunityIcons name="clipboard-flow" {...props} />
  ),
};

const gruopsOptions = {
  tabBarIcon: (props) => (
    <MaterialCommunityIcons name="account-group" {...props} />
  ),
};

const EnvelopeStackScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        options={envelopeOptions}
        name="Envelope"
        component={EnvelopesScreen}
      />
      <Stack.Screen
        options={studyOptions}
        name="NewEnvelope"
        component={NewEnvelope}
      />
    </Stack.Navigator>
  );
};

const GroupStackScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        options={gruopsOptions}
        name="Group"
        component={GroupsScreen}
      />
      <Stack.Screen
        options={gruopsOptions}
        name="NewGroup"
        component={NewGroup}
      />
    </Stack.Navigator>
  );
};

function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <StatusBar
          backgroundColor={colors.primaryDark}
          barStyle="light-content"
        />
        <NavigationContainer theme={navigationTheme}>
          <Tab.Navigator
            tabBarOptions={tabNavigatorOptions}
            initialRouteName="Home">
            <Tab.Screen
              options={homeOptions}
              name="Home"
              component={HomeScreen}
            />
            <Tab.Screen
              options={envelopeOptions}
              name="Envelope"
              component={EnvelopeStackScreen}
            />
            <Tab.Screen
              options={studyOptions}
              name="Home3"
              component={HomeScreen}
            />
            <Tab.Screen
              options={movementsOptions}
              name="Movements"
              component={MovementsScreen}
            />
            <Tab.Screen
              options={gruopsOptions}
              name="Grupos"
              component={GroupStackScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;
