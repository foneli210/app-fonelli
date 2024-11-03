import {ParamListBase} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';

export interface RootTabsProps {
  [key: string]: undefined;
  Inicio: undefined;
}

export interface RootStackProps extends ParamListBase {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Dashboard: undefined;
  NewOrder: undefined;
  OrderHistory: undefined;
  EditOrder: {
    orderId: string;
    onOrderUpdated: () => Promise<void>;
  };
}

export interface IconImageProps {
  size: number;
  source: ImageSourcePropType;
}

export enum Type {
  DEFAULT = 'default',
  EMAIL = 'email-address',
  NUMBER = 'number-pad',
}
