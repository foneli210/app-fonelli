import {ParamListBase} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';

export interface RootTabsProps {
  [key: string]: undefined;
  Inicio: undefined;
  //   Hoteles: undefined;
  //   Tienda: undefined;
  //   Rutas: undefined;
  //   Perfil: undefined;
}

export interface RootStackProps extends ParamListBase {
  Home: undefined;
  //   HotelDetails: {hotelId: string};
  //   PathwaysDetails: {pathwayId: string};
  //   ProductDetails: {productId: string};
  // [key: string]: undefined | { hotelId: string };
}

export interface IconImageProps {
  size: number;
  source: ImageSourcePropType;
}
