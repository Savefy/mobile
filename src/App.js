import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationContainer,
  DefaultTheme as NavigationTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { store } from './redux';
import { colors } from './values/colors';
import { StatusBar } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ContentScreen from './screens/ContentScreen';
import ContentVisualizationScreen from './screens/ContentVisualizationScreen';

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
  title: 'Conteúdos',
};

const settingsOptions = {
  tabBarIcon: (props) => <MaterialCommunityIcons name="settings" {...props} />,
};

const ContentManagement = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen
        options={studyOptions}
        name="Conteudos"
        component={ContentScreen}
      />
      <Stack.Screen
        options={homeOptions}
        name="VisualizarConteudo"
        component={ContentVisualizationScreen}
      />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
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
              name="Conteudos"
              component={ContentManagement}
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
