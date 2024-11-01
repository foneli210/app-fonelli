import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {RootStackProps} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

  useEffect(() => {
    setTimeout(async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        navigation.navigate('Welcome');
      } else {
        navigation.navigate('Dashboard');
      }
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/fonelli-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Fonelli Joyería</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff', // Fondo azul oscuro
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A', // Texto blanco
    textAlign: 'center',
  },
});

export default SplashScreen;
