import React, {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Type} from '../types';

interface InputProps {
  placeholder: string;
  label: string;
  type?: Type;
  onChangeName: any;
  selectValueName: string;
}

const InputControlOff: FC<InputProps> = ({
  label,
  placeholder,
  type = Type.DEFAULT,
  onChangeName = () => {},
  selectValueName,
}) => {
  const onChangeInput = (text: string) => {
    onChangeName(text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={selectValueName}
        onChangeText={value => onChangeInput(value)}
        keyboardType={type}
        placeholder={placeholder}
      />
    </View>
  );
};

export default InputControlOff;
const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1F2937',
    fontWeight: '500',
  },
});
