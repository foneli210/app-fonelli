import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {StatusProps} from '../types';

interface Props {
  data: any;
  handleCancel: (data: string) => void;
  handleEdit: (data: string) => void;
}
const CardDataAll: FC<Props> = ({data, handleCancel, handleEdit}) => {
  const {model_name, piece, _id} = data;
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <View>
          <View style={styles.containerTitleSmall}>
            <Text style={styles.textTitle}>Modelo: </Text>
            <Text style={styles.textSubtitle}>{model_name}</Text>
          </View>
          <View style={styles.containerTitleSmall}>
            <Text style={styles.textTitle}>Piezas: </Text>
            <Text style={styles.textSubtitle}>{piece}</Text>
          </View>
        </View>
        <View style={styles.containerTitleSmall}>
          <Text style={styles.textTitle}>Estado: </Text>
          <Text
            style={[
              styles.textStatus,
              data?.status === StatusProps.REQUIRED && styles.required,
            ]}>
            {(data?.status === StatusProps.REQUIRED && 'Solicitado') ||
              'Sin estado'}
          </Text>
        </View>
      </View>
      <View style={styles.containerBtn}>
        <Pressable style={styles.btnCancel} onPress={() => handleCancel(_id)}>
          <Text style={styles.buttonText}>Cancelar Pedido</Text>
        </Pressable>
        <Pressable style={styles.btnEdit} onPress={() => handleEdit(_id)}>
          <Text style={styles.buttonText}>Editar Pedido</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CardDataAll;
const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    backgroundColor: '#fff',
    minHeight: 50,
    borderRadius: 10,
    marginVertical: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 3,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  btnCancel: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  btnEdit: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  textTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E3A8A',
  },
  textSubtitle: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  textStatus: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
  },
  required: {
    color: '#ffaa00',
  },
  containerTitleSmall: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
