import React from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, Text, TextInput} from 'react-native';
import { Type } from '../types';

interface PropsInput {
  name: string;
  control: any;
  label: string;
  type?: Type;
  errors: any;
  placeholder: string;
  defaultValue?: string | number;
  textarea?:boolean
}


const CustomInput = ({
  name,
  control,
  label,
  type = Type.DEFAULT,
  errors,
  placeholder = 'default',
  defaultValue = '',
  textarea = false,
}: PropsInput) => {
  const {field} = useController({
    control,
    name,
    rules: {required: true},
    defaultValue,
  });
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={!textarea ? styles.input : styles.textArea}
        value={field.value}
        onChangeText={field.onChange}
        keyboardType={type}
        placeholder={placeholder}
      />
      {errors && <Text style={styles.textError}>{errors.message}</Text>}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 200,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1F2937',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  textError: {
    color: '#ff0000',
    fontSize: 16,
  },
});
