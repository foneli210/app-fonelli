import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackProps} from '../types';
import IconImage from '../utils/iconImage';
import {Icons} from '../assets/icons';

const BottomNavBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
  const route = useRoute();

  const isActive = (routeName: any) => {
    // Considera NewOrder como la pantalla "inicio"
    if (routeName === 'NewOrder') {
      console.log(route.name);
      return route.name === 'NewOrder' || route.name === 'Dashboard';
    }
    console.log(route.name);

    return route.name === routeName;
  };

  const getTextColor = (routeName: any) => {
    return isActive(routeName) ? '#24b1e7' : '#ffffff';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}>
          <IconImage
            size={22}
            source={
              isActive('Dashboard') || isActive('NewOrder')
                ? Icons.tab.active.home
                : Icons.tab.inActive.home
            }
          />

          <Text style={[styles.navText, {color: getTextColor('NewOrder')}]}>
            Inicio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => Linking.openURL('https://wa.me/tunumerodewhatsapp')}>
          <IconImage size={24} source={Icons.tab.active.contact} />

          <Text style={[styles.navText, {color: getTextColor('Contact')}]}>
            Contacto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('OrderHistory')}>
          <IconImage
            size={24}
            source={
              isActive('OrderHistory')
                ? Icons.tab.active.history
                : Icons.tab.inActive.history
            }
          />

          <Text style={[styles.navText, {color: getTextColor('OrderHistory')}]}>
            Historial
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1E3A8A',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 12,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default BottomNavBar;
