import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: null,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    logoutSuccess: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, setLoading, logoutSuccess } = authSlice.actions;

export const login = (result: any) => async (dispatch: any) => {
  try {
    const token =
      result?.data?.RegisterUser?.accessToken || result?.data?.loginWithPin?.accessToken;
    const user = JSON.stringify(result?.data?.RegisterUser || result?.data?.loginWithPin);
    await AsyncStorage.setItem('@TOKEN', token);
    await AsyncStorage.setItem('@USER', user);
    dispatch(setToken(token));
    dispatch(setUser(JSON.parse(user)));
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    await AsyncStorage.removeItem('@TOKEN');
    await AsyncStorage.removeItem('@USER');
    dispatch(logoutSuccess());
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const loadUserData = () => async (dispatch: any) => {
  try {
    const token = await AsyncStorage.getItem('@TOKEN');
    const user = await AsyncStorage.getItem('@USER');
    if (token && user) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(user)));
    } else {
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
