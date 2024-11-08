import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, TouchableOpacity, Text} from 'react-native';
import BottomNavBar from '../../components/BottomNavBar';
import Form from '../../components/Form';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackProps} from '../../types';
import {getById} from '../../services/apiV2';

type NewOrderScreenRouteProp = RouteProp<RootStackProps, 'NewOrder'>;
const NewOrderScreen = ({route}: {route: NewOrderScreenRouteProp}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
  const [dataEdit, setDataedit] = useState<any>({});
  console.log('TCL: NewOrderScreen -> [dataEdit', dataEdit);

  const isEditId = route?.params?.orderId;

  const getDataEditOrder = async () => {
    if (!isEditId) {
      return;
    }
    try {
      const response = await getById(isEditId);
      console.log('TCL: getDataEditOrder -> response', response);
      setDataedit(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataEditOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditId]);

  // const handleSubmit = async () => {
  //   if (!validateForm() || isLoading) {
  //     Alert.alert('Error', 'Por favor corrija los errores en el formulario');
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const userId = await AsyncStorage.getItem('userId');
  //     if (!userId) {
  //       throw new Error('No se encontró información del usuario');
  //     }

  //     const orderData = {
  //       ...formData,
  //       numero_piezas: parseInt(formData.numero_piezas, 10),
  //       inicial: formData.inicial || null,
  //       largo: formData.largo ? parseFloat(formData.largo) : null,
  //       observaciones: formData.observaciones || null,
  //     };

  //     await createOrder(orderData);
  //     Alert.alert('Éxito', 'Pedido creado correctamente', [
  //       {text: 'OK', onPress: () => navigation.navigate('Dashboard')},
  //     ]);
  //   } catch (error: any) {
  //     Alert.alert('Error', error.message || 'No se pudo crear el pedido');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <View style={styles.containerGeneral}>
      <View style={styles.containerForm}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <IconImage size={24} source={Icons.general.arrowLeft} />
          </TouchableOpacity>
          {isEditId ? (
            <Text style={styles.title}>Editando Pedido</Text>
          ) : (
            <Text style={styles.title}>Nuevo Pedido</Text>
          )}
        </View>
        <Form dataEdit={dataEdit}/>
      </View>
      <View style={styles.containerTab}>
        <View style={styles.bottomNavSpacer} />
        <BottomNavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerGeneral: {flex: 1, justifyContent: 'space-around'},
  containerTab: {
    flex: 1,
    maxHeight: 80,
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#1E3A8A',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  formContainer: {
    flex: 1,
  },
  formContentContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1F2937',
    fontWeight: '500',
  },
  required: {
    color: '#DC2626',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#DC2626',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#93C5FD',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNavSpacer: {
    height: 80,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
});

export default NewOrderScreen;
