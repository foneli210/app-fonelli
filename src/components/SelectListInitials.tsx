import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectListProps {
  options: SelectOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label: string;
}

export const SelectListInitials: React.FC<SelectListProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Selecciona la opción',
  label = ' ',
}) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [customInput, setCustomInput] = React.useState('');
  const [isCustomInputSelected, setCustomInputSelected] = React.useState(false);

  const handleOptionPress = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
    setCustomInput('');
    setCustomInputSelected(false);
  };

  const handleCustomInputSelect = () => {
    if (customInput.length === 2) { // Aseguramos que sean solo 2 iniciales
      onValueChange(customInput);
      setModalVisible(false);
      setCustomInputSelected(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.selector}>
        <Text style={styles.selectorText}>
          {isCustomInputSelected
            ? customInput.toUpperCase()
            : selectedValue
              ? options.find(option => option.value === selectedValue)?.label
              : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={[...options, { label: 'Personalizado', value: 'custom' }]}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    item.value === 'custom'
                      ? setCustomInputSelected(true)
                      : handleOptionPress(item.value)
                  }
                  style={styles.option}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            {isCustomInputSelected && (
              <View style={styles.customInputContainer}>
                <TextInput
                  value={customInput}
                  onChangeText={setCustomInput}
                  placeholder="Ingresa dos iniciales"
                  maxLength={2}
                  style={styles.customInput}
                />
                <TouchableOpacity onPress={handleCustomInputSelect} style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>Aplicar</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
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
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '50%',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  customInputContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  customInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    textAlign: 'center',
    fontSize: 16,
  },
  applyButton: {
    padding: 10,
    backgroundColor: '#1E3A8A',
    borderRadius: 5,
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
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
});
