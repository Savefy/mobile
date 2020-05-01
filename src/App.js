import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationContainer,
  DefaultTheme as NavigationTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { store } from './redux';
import HomeScreen from './screens/HomeScreen';
import { colors } from './values/colors';

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

const tabNavigatorOptions = {
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
  tabBarIcon: (props) => <MaterialCommunityIcons name="email" {...props} />,
};

const studyOptions = {
  tabBarIcon: (props) => <MaterialCommunityIcons name="book" {...props} />,
};

const settingsOptions = {
  tabBarIcon: (props) => <MaterialCommunityIcons name="settings" {...props} />,
};

function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={paperTheme}>
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
              name="Home2"
              component={HomeScreen}
            />
            <Tab.Screen
              options={studyOptions}
              name="Home3"
              component={HomeScreen}
            />
            <Tab.Screen
              options={settingsOptions}
              name="Config"
              component={HomeScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;
