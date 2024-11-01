import './gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar, useWindowDimensions} from 'react-native';
import Router from './src/routes';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const windowWidth = useWindowDimensions().width;
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1, width: windowWidth}}>
        <Router />
        <StatusBar />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
