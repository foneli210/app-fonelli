import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackProps} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

  const handleLogout = async () => {
    Alert.alert('Cerrar Sesión', '¿Está seguro que desea cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sí, cerrar sesión',
        style: 'destructive',
        onPress: async () => {
          try {
            // Limpiar todos los datos de sesión
            await AsyncStorage.multiRemove([
              'userToken',
              'userId',
              'userRole',
              'userName',
              'userEmail',
              'userImage',
            ]);

            // Navegar a Login
            navigation.navigate('Login');
          } catch (error) {
            console.error('Error al cerrar sesión:', error);
            Alert.alert(
              'Error',
              'No se pudo cerrar sesión. Por favor intente nuevamente.',
            );
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/fonelli-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NewOrder')}>
          <Text style={styles.buttonText}>Nuevo pedido</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={styles.buttonText}>Historial de pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://wa.me/tunumerodewhatsapp')}>
          <Text style={styles.buttonText}>Nuestro catálogo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: '60%',
    height: '30%',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E3A8A',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
  },
  logoutButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DashboardScreen;
