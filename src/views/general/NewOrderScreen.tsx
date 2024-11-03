import React from 'react';
import {
  View,
  StyleSheet,
  // KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {createOrder} from '../../services/api';
import BottomNavBar from '../../components/BottomNavBar';
import Form from '../../components/Form';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackProps} from '../../types';

const NewOrderScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

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
      {/* <KeyboardAvoidingView
        style={styles.containerForm}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
      {/* <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <IconImage size={24} source={Icons.general.arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.title}>Nuevo Pedido</Text>
      </View>

      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={styles.formContentContainer}
        showsVerticalScrollIndicator={false}>
        {Object.keys(formData).map(field => (
          <View key={field} style={styles.inputContainer}>
            <Text style={styles.label}>
              {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
              {fieldValidations[field].required && (
                <Text style={styles.required}> *</Text>
              )}
            </Text>

            {field === 'kilataje' ? (
              <Picker
                selectedValue={formData.kilataje}
                onValueChange={value => handleChange('kilataje', value)}
                style={styles.picker}>
                <Picker.Item label="10k" value="10k" />
                <Picker.Item label="14k" value="14k" />
                <Picker.Item label="18k" value="18k" />
              </Picker>
            ) : field === 'color' ? (
              <Picker
                selectedValue={formData.color}
                onValueChange={value => handleChange('color', value)}
                style={styles.picker}>
                <Picker.Item label="Amarillo" value="Amarillo" />
                <Picker.Item label="Blanco" value="Blanco" />
                <Picker.Item label="Rosa" value="Rosa" />
                <Picker.Item label="Florentino" value="Florentino" />
                <Picker.Item label="Amarillo/Blanco" value="Amarillo/Blanco" />
                <Picker.Item label="Blanco/Rosa" value="Blanco/Rosa" />
                <Picker.Item label="Amarillo/Rosa" value="Amarillo/Rosa" />
              </Picker>
            ) : (
              <TextInput
                style={[
                  styles.input,
                  errors[field] ? styles.inputError : null,
                  field === 'observaciones' ? styles.textArea : null,
                ]}
                value={formData[field]}
                onChangeText={value => handleChange(field, value)}
                placeholder={fieldValidations[field]?.helper}
                keyboardType={
                  fieldValidations[field]?.type === 'number' ||
                  fieldValidations[field]?.type === 'decimal'
                    ? 'numeric'
                    : 'default'
                }
                multiline={field === 'observaciones'}
                numberOfLines={field === 'observaciones' ? 4 : 1}
                editable={!isLoading}
              />
            )}
            {errors[field] ? (
              <Text style={styles.errorText}>{errors[field]}</Text>
            ) : (
              <Text style={styles.helperText}>
                {fieldValidations[field].helper}
              </Text>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}>
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Creando pedido...' : 'Crear Pedido'}
          </Text>
        </TouchableOpacity> */}

      {/* </ScrollView> */}
      {/* </KeyboardAvoidingView> */}
      <View style={styles.containerForm}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <IconImage size={24} source={Icons.general.arrowLeft} />
          </TouchableOpacity>
          <Text style={styles.title}>Nuevo Pedido</Text>
        </View>
        <Form />
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
