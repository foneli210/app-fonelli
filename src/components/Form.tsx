import React, {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomInput from './InputNative';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {SelectListPiece} from './SelectListPiece';
import {optionsNumber} from '../utils/optionsSelects';
import OptionalOnePiece from './OptionalOnePiece';
import {editOrder, createOrder} from '../services/apiV2';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackProps, StatusProps} from '../types';

const Schema = yup.object().shape({
  model_name: yup.string().required('Ingrese el modelo de la joya'),
  piece: yup.string(),
  observations: yup.string(),
  name: yup.string(),
});

interface FormProps {
  dataEdit: any;
}

const Form: FC<FormProps> = ({dataEdit}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({mode: 'onChange', resolver: yupResolver(Schema)});

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

  const [loading, setLoading] = useState<boolean>(false);
  const [numberPieces, setNumberPieces] = useState<string>('1');
  const [pieceDetails, setPieceDetails] = useState<Array<any>>(
    Array.from({length: 1}, () => ({
      size: '4',
      caratage: '10',
      color: 'Amarillo',
      initial: 'No aplica',
      name: '',
      rocks: ['No aplica'],
      long: '18',
    })),
  );

  useEffect(() => {
    if (dataEdit?._id) {
      setValue('model_name', dataEdit?.model_name);
      setValue('observations', dataEdit.observations);
      setNumberPieces(dataEdit.piece || '1');

      if (dataEdit.details) {
        setPieceDetails(
          dataEdit.details.map((detail: any) => ({
            size: detail.size || 'N/A',
            caratage: detail.caratage || 'N/A',
            color: detail.color || 'N/A',
            initial: detail.initial || 'No aplica',
            name: detail.name || '',
            rocks: detail.rocks.map((rock: any) =>
              typeof rock === 'string' ? rock : rock.label,
            ),
            long: detail.long || 'N/A',
          })),
        );
      }
    }
  }, [dataEdit, setValue]);

  const handlePieceChange = (value: string) => {
    setNumberPieces(value);
    setPieceDetails(
      Array.from(
        {length: Number(value)},
        (_, index) =>
          pieceDetails[index] || {
            size: '4',
            caratage: '10',
            color: 'Amarillo',
            initial: 'No aplica',
            name: '',
            rocks: ['No aplica'],
            long: '18',
          },
      ),
    );
  };

  const handlePieceDetailChange = (index: number, key: string, value: any) => {
    setPieceDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = {...updatedDetails[index], [key]: value};
      return updatedDetails;
    });
  };

  const onsubmit = async (data: any) => {
    setLoading(true);
    try {
      const normalizedDetails = pieceDetails.map(detail => ({
        ...detail,
        rocks: detail.rocks.map((rock: any) =>
          typeof rock === 'string' ? rock : rock.value,
        ),
      }));

      const orderData = {
        ...data,
        piece: numberPieces,
        details: normalizedDetails,
        status: StatusProps.REQUIRED,
      };
      if (!dataEdit._id) {
        await createOrder(orderData);

        Alert.alert('Pedido Creado', 'El pedido se ha creado correctamente.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ]);
      } else {
        await editOrder(orderData, dataEdit?._id);

        Alert.alert(
          'Pedido editado',
          'El pedido se ha editado correctamente.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Dashboard'),
            },
          ],
        );
      }
      reset();
      return;
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomInput
          control={control}
          name={'model_name'}
          label="Modelo"
          errors={errors.model_name}
          placeholder="Ingresa el modelo"
        />

        <SelectListPiece
          options={optionsNumber}
          label="Piezas"
          onValueChange={handlePieceChange}
          selectedValue={numberPieces}
        />

        {pieceDetails.map((piece, index) => (
          <View key={index} style={styles.pieceContainer}>
            <Text style={styles.pieceTitle}>Pieza {index + 1}</Text>
            <OptionalOnePiece
              control={control}
              errors={errors}
              onChangeSize={value =>
                handlePieceDetailChange(index, 'size', value)
              }
              onChangeCaracts={value =>
                handlePieceDetailChange(index, 'caratage', value)
              }
              onChangeColor={value =>
                handlePieceDetailChange(index, 'color', value)
              }
              onChangeInitials={value =>
                handlePieceDetailChange(index, 'initial', value)
              }
              onChangeName={value =>
                handlePieceDetailChange(index, 'name', value)
              }
              onChangeRocks={value =>
                handlePieceDetailChange(index, 'rocks', value)
              }
              onChangeLong={value =>
                handlePieceDetailChange(index, 'long', value)
              }
              selectValueSize={piece.size}
              selectValueCaracts={piece.caratage}
              selectValueColor={piece.color}
              selectValueInitials={piece.initial}
              selectValueName={piece.name}
              selectValueRocks={piece.rocks.toString()}
              selectValueLong={piece.long}
            />
          </View>
        ))}

        <CustomInput
          control={control}
          name={'observations'}
          label="Observaciones"
          textarea
          errors={errors.observations}
          placeholder="Escribe las observaciones (opcional)"
        />

        <Pressable style={styles.submitButton}>
          {loading ? (
            <Text style={styles.submitButtonText}>Enviando...</Text>
          ) : dataEdit?._id ? (
            <Text
              style={styles.submitButtonText}
              onPress={handleSubmit(onsubmit)}>
              Guardar pedido
            </Text>
          ) : (
            <Text
              style={styles.submitButtonText}
              onPress={handleSubmit(onsubmit)}>
              Hacer nuevo pedido
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 10,
  },
  pieceContainer: {
    marginTop: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  pieceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
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
