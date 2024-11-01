import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackProps} from '../types';

import LoginScreen from '../views/Auth/login';
import SplashScreen from '../views/general/SplashScreen';
import WelcomeScreen from '../views/general/WelcomeScreen';
import DashboardScreen from '../views/Auth/dashboard';
import NewOrderScreen from '../views/general/NewOrderScreen';
import OrderHistoryScreen from '../views/general/OrderHistoryScreen';
import EditOrderScreen from '../views/general/EditOrderScreen';

const Stack = createStackNavigator<RootStackProps>();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FFFFFF'},
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="NewOrder" component={NewOrderScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />

      <Stack.Screen
        name="EditOrder"
        component={EditOrderScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
