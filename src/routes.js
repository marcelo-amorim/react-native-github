// import { createAppContainer } from 'react-navigation';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      headerBackTitleVisible={false}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2c80ff',
        },
        headerTintColor: '#FFF',
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ title: 'Usuários' }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={({ route }) => ({ title: route.params.user.name })}
      />
      <Stack.Screen
        name="Repository"
        component={Repository}
        options={({ route }) => ({ title: route.params.repository.full_name })}
      />
    </Stack.Navigator>
  );
}
