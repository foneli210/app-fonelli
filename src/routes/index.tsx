// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
// import {RootStackProps, RootTabsProps} from '../types';
// import Login from '../views/Auth/login';
// import Responsive from '../utils/responsive';
// import {Colors} from '../theme/colors';
// import IconImage from '../utils/iconImage';
// import {Icons} from '../assets/icons';
// import Home from '../components/home';

// const Tab = createBottomTabNavigator<RootTabsProps>();
// const Stack = createStackNavigator<RootStackProps>();

// const RouterTabs = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Inicio"
//       screenOptions={{
//         tabBarLabelStyle: {
//           fontWeight: '800',
//           fontSize: Responsive(12),
//           fontFamily: 'Gilroy-ExtraBold',
//         },
//         tabBarActiveTintColor: Colors.textPrimary,
//         tabBarHideOnKeyboard: true,
//         tabBarItemStyle: {
//           gap: 20,
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//         tabBarStyle: {
//           height: '9%',
//           alignItems: 'center',
//           paddingTop: Responsive(30),
//           paddingBottom: Responsive(15),
//         },
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           title: 'general.home',
//           tabBarIcon: ({size, focused}) => (
//             <IconImage
//               size={size}
//               source={focused ? Icons.tabs.active.home : Icons.tabs.active.home}
//             />
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tab.Screen
//         name="Hotels"
//         component={Home}
//         options={{
//           title: 'general.hotels',
//           tabBarIcon: ({size, focused}) => (
//             <IconImage
//               size={size}
//               source={focused ? Icons.tabs.active.home : Icons.tabs.active.home}
//             />
//           ),
//           headerShown: false,
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const Router = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="Login"
//         component={Login as never}
//       />
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="Main"
//         component={RouterTabs}
//       />
//     </Stack.Navigator>
//   );
// };

// export default Router;

import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackProps, RootTabsProps} from '../types';
import Login from '../views/Auth/login';
import Responsive from '../utils/responsive';
import {Colors} from '../theme/colors';
import IconImage from '../utils/iconImage';
import {Icons} from '../assets/icons/icons';
import Home from '../views/home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator<RootTabsProps>();
const Stack = createStackNavigator<RootStackProps>();

// Extraer la función para renderizar el icono del tab
const renderIcon = (size: number, focused: boolean, icon: any) => (
  <IconImage size={size} source={focused ? icon.active : icon.inactive} />
);

const RouterTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: '800',
          fontSize: Responsive(12),
          fontFamily: 'Gilroy-ExtraBold',
        },
        tabBarActiveTintColor: Colors.textPrimary,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          gap: 20,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: {
          height: '9%',
          alignItems: 'center',
          paddingTop: Responsive(30),
          paddingBottom: Responsive(15),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'general.home',
          tabBarIcon: ({size, focused}) =>
            renderIcon(size, focused, {
              active: Icons.tabs.active.home,
              inactive: Icons.tabs.active.home,
            }),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Hotels"
        component={Home}
        options={{
          title: 'general.hotels',
          tabBarIcon: ({size, focused}) =>
            renderIcon(size, focused, {
              active: Icons.tabs.active.home,
              inactive: Icons.tabs.active.home,
            }),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('@TOKEN');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={RouterTabs}
        />
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login as never}
        />
      )}
    </Stack.Navigator>
  );
};

export default Router;
