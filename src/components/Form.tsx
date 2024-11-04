import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CustomInput from './InputNative';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import {Type} from '../types';
import {SelectListPiece} from './SelectListPiece';
import {optionsNumber} from '../utils/optionsSelects';
import OptionalOnePiece from './OptionalOnePiece';
// import {useForm} from 'react-hook-form';
// import InputNative from './InputNative';

const Schema = yup.object().shape({
  modelo: yup.string().required('Ingrese el modelo de la joya'),
  numero_piezas: yup.string().required('Ingrese la cantidad de piezas'),
  observaciones: yup.string(),
});

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onChange', resolver: yupResolver(Schema)});

  const [numberPieces, setNumberPieces] = useState<string>('1');
  const [numberSize, setNumberSize] = useState<string>('4');
  const [numberCaracts, setNumberCaracts] = useState<string>('10');
  const [color, setColor] = useState<string>('Amarillo');
  const [initials, setInitials] = useState<string>('No aplica');
  const [rocks, setRocks] = useState<string>('No aplica');

  // const {
  //   // control,
  //   // handleSubmit,
  //   // formState: {errors},
  // } = useForm({mode: 'onChange', resolver: yupResolver(Schema)});

  //   const [formData, setFormData] = useState<any>({
  //     modelo: '',
  //     numero_piezas: '',
  //     talla: '',
  //     kilataje: '',
  //     color: 'Amarillo',
  //     inicial: '',
  //     nombre_pedido: '',
  //     piedra: '',
  //     largo: '',
  //     observaciones: '',
  //   });

  const onsubmit = (data: any) => {
    console.log('data form', data);
  };

  return (
    <View style={styles.container}>
      <CustomInput
        control={control}
        name={'modelo'}
        label="Modelo"
        errors={errors.modelo}
        placeholder="Ingresa el modelo"
      />

      <SelectListPiece
        options={optionsNumber}
        label="Piezas"
        onValueChange={value => {
          console.log('la seleccion es', value);
          setNumberPieces(value.toString());
        }}
        selectedValue={numberPieces}
      />
      {numberPieces === '1' ? (
        <OptionalOnePiece
          control={control}
          errors={errors}
          onChangeSize={setNumberSize}
          onChangeCaracts={setNumberCaracts}
          onChangeColor={setColor}
          onChangeInitials={setInitials}
          onChangeRocks={setRocks}
          selectValueSize={numberSize}
          selectValueCaracts={numberCaracts}
          selectValueColor={color}
          selectValueInitials={initials}
          selectValueRocks={rocks}
        />
      ) : null}

      <CustomInput
        control={control}
        name={'observaciones'}
        label="Observaciones"
        textarea
        errors={errors.observaciones}
        placeholder="Escribe las observaciones (opcional)"
      />

      <Pressable style={styles.submitButton}>
        <Text style={styles.submitButtonText} onPress={handleSubmit(onsubmit)}>
          Hacer nuevo pedido
        </Text>
      </Pressable>
    </View>
  );
};

export default Form;
const styles = StyleSheet.create({
  container: {},
  submitButton: {
    backgroundColor: '#1E3A8A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
