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

// import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator<RootStackProps>();

const Router = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // console.log('TCL: Router -> [isLoading', isLoading);
  // console.log('TCL: Router -> [isLoggedIn', isLoggedIn);

  // const checkLoginStatus = async () => {
  //   try {
  //     const userToken = await AsyncStorage.getItem('userToken');
  //     setIsLoggedIn(!!userToken);
  //   } catch (error) {
  //     console.error('Error al verificar el estado de inicio de sesión:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);

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
