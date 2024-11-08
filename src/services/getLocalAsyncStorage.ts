import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentUser = async () => {
  try {
    const [token, userId, userRole, userName, userEmail, userImage] =
      await Promise.all([
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('userRole'),
        AsyncStorage.getItem('userName'),
        AsyncStorage.getItem('userEmail'),
        AsyncStorage.getItem('userImage'),
      ]);

    if (!token || !userId) {
      throw new Error('No se encontró información de autenticación');
    }

    return {
      id: userId,
      nombre: userName,
      email: userEmail,
      rol: userRole,
      imagen_url: userImage,
    };
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
    throw new Error('Error al obtener información del usuario');
  }
};

export const loadUserData = async (setUserData: any) => {
  try {
    const user = await getCurrentUser();
    setUserData(user);
  } catch (error) {
    console.error('Error al cargar datos del usuario:', error);
  }
};
