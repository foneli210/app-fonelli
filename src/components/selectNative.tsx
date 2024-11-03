import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

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

export const SelectList: React.FC<SelectListProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  label = ' ',
}) => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  const handleOptionPress = (value: string) => {
    onValueChange(value);
    setDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setDropdownOpen(!isDropdownOpen)}
        style={styles.selector}>
        <Text style={styles.selectorText}>
          {selectedValue
            ? options.find(option => option.value === selectedValue)?.label
            : placeholder}
        </Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <FlatList
          data={options}
          keyExtractor={item => item.value}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleOptionPress(item.value)}
              style={styles.option}>
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}
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
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1F2937',
    fontWeight: '500',
  },
});
