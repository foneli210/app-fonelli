import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import IconImage from '../utils/iconImage';
import { Icons } from '../assets/icons';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectListProps {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  setSelectRocks: any;
}

export type optionNewObj = {
  value: string;
  label: string;
};

export const SelectListRocks: React.FC<SelectListProps> = ({
  options = [],
  setSelectRocks = () => {},
  placeholder = 'Selecciona las piedras',
  label = ' ',
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [itemsOptions, setItemsOptions] = useState<optionNewObj[]>([...options]);

  const [itemsSelect, setItemsSelect] = useState<optionNewObj[]>([]);

  useEffect(() => {
    setItemsOptions(
      options.filter(
        item => !itemsSelect.some(selected => selected.value === item.value)
      )
    );
  }, [itemsSelect, options]);

  const handleOptionPress = (value: string) => {
    if (value === 'N/A') {
      setItemsSelect([]);
      setItemsOptions(options);
      setModalVisible(false);
      return;
    }
    const newSelection: optionNewObj = {
      value,
      label: value,
    };
    const inList = itemsSelect.find(item => item.value === value);
    if (inList) {
      return;
    }
    setItemsSelect(prev => [...prev, newSelection]);
  };

  const handleDeleteOptionPress = (value: string) => {
    setItemsSelect(prev => prev.filter(item => item.value !== value));
  };

  const handleSaveOptionPress = () => {
    setSelectRocks(itemsSelect);
    setModalVisible(false);
  };

  // Placeholder dinámico basado en las opciones seleccionadas
  const placeholderText =
    itemsSelect.length > 0
      ? `Seleccionados: ${itemsSelect.map(item => item.label).join(', ')}`
      : placeholder;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.selector}>
        <Text style={styles.selectorText}>{placeholderText}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.containerBtn}>
              <View style={styles.containerFlexBox}>
                <Pressable
                  style={styles.btnClose}
                  onPress={handleSaveOptionPress}>
                  <Text style={styles.textBtnClose}>Guardar</Text>
                </Pressable>
              </View>
              <View style={styles.containerFlexBox}>
                <Pressable
                  style={styles.btnClose}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textBtnClose}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.areaSelection}>
              <Text style={styles.labelOptionText}>Seleccionados</Text>
              {itemsSelect.length ? (
                <FlatList
                  data={itemsSelect}
                  keyExtractor={item => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleDeleteOptionPress(item.value)}
                      style={styles.option}>
                      <View style={styles.containerItemInt}>
                        <Text style={styles.optionText}>{` ${item.label}`}</Text>
                        <IconImage source={Icons.general.check} size={14} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text style={styles.textConditional}>
                  Aún no seleccionaste ningún ítem
                </Text>
              )}
            </View>
            <View style={styles.containerDown}>
              <Text style={styles.labelOptionText}>
                Selecciona las opciones
              </Text>
              <FlatList
                data={itemsOptions}
                keyExtractor={item => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleOptionPress(item.value)}
                    style={styles.option}>
                    <Text style={styles.optionText}>{` ${item.label}`}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerBtn: {
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
  },
  containerDown: {
    borderWidth: 2,
    borderColor: '#e1ff00',
    flex: 1,
  },
  selector: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1F2937',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff0000',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: '#ee00ff',
    flex: 1,
  },
  option: {
    padding: 10,
    borderColor: '#eee',
    borderWidth: 2,
  },
  containerItemInt: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 30,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  labelOptionText: {
    fontSize: 16,
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#1E3A8A',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  btnClose: {
    borderWidth: 2,
  },
  containerFlexBox: {
    flex: 1,
    paddingHorizontal: 40,
  },
  textBtnClose: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: '#1E3A8A',
  },
  areaSelection: {
    minHeight: 90,
    maxHeight: '50%',
  },
  textConditional: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: '#7c7c7c',
  },
});


