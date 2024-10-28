import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {IconImageProps} from '../types';
import Responsive from './responsive';
import { Colors } from '../theme/colors';

const IconImage = ({size, source}: IconImageProps) => {
  return (
    <Image style={styles(size).icon} resizeMode="contain" source={source} />
  );
};

export default IconImage;

const styles = (size: number) =>
  StyleSheet.create({
    icon: {
      backgroundColor: Colors.transparent,
      justifyContent: 'center',
      alignSelf: 'center',
      width: Responsive(size),
      height: Responsive(size),
      opacity: 1,
    },
  });
