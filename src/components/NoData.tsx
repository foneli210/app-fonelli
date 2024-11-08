import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const NoData = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aún no hay pedidos aquí</Text>
    </View>
  );
};

export default NoData;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 600,
  },
});
