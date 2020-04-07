import 'react-native-gesture-handler';
import './config/ReactotronConfig';

import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

export default function () {
  return (
    <NavigationContainer>
      <>
        <StatusBar barStyle="light-content" backgroundColor="#2c80ff" />
        <Routes />
      </>
    </NavigationContainer>
  );
}
