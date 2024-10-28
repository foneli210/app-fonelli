import './gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, useWindowDimensions} from 'react-native';
import Router from './src/routes';

const App = () => {
  const windowWidth = useWindowDimensions().width;
  return (
    <SafeAreaView style={{flex: 1, width: windowWidth}}>
      <NavigationContainer>
        <Router />
        <StatusBar />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
