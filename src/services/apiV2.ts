import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URI = 'http://192.168.2.6:4000/api/orders';

export const createOrder = async (orderData: any) => {
  const userId = await AsyncStorage.getItem('userId');
  const OrderData = {
    ...orderData,
    customer_id: userId,
  };

  try {
    // const token = await AsyncStorage.getItem('userToken');
    // const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('No se encontró información de autenticación');
    }
    // const OrderData = {
    //   ...orderData,
    //   customer_id: userId,
    // };
    const post = await axios.post(`${BASE_URI}`, OrderData, {
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return post.data;
  } catch (error) {
    console.log('TCL: error', error);
    throw new Error('creacion del pedido fallo');
  }
};

export const getOrdersById = async () => {
  try {
    // const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');

    if (!userId) {
      throw new Error('No se encontró información de autenticación');
    }

    const response = await axios.get(`${BASE_URI}/${userId}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    throw new Error('creacion del pedido fallo');
  }
};

export const cancelOrder = async (orderId: string) => {
  const userId = await AsyncStorage.getItem('userId');

  if (!userId) {
    throw new Error('No se encontró información de autenticación');
  }
  try {
    await axios.put(`${BASE_URI}/${orderId}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('cancelacion del pedido fallo');
  }
};

export const getById = async (orderId: string) => {
  const userId = await AsyncStorage.getItem('userId');

  if (!userId) {
    throw new Error('No se encontró información de autenticación');
  }
  try {
    const response = await axios.get(`${BASE_URI}/byId/${orderId}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response?.data;
  } catch (error) {
    throw new Error('informacion del pedido fallo');
  }
};
