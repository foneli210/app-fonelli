import { moderateScale } from 'react-native-size-matters';

const Responsive = (size: number) => {
  return moderateScale(size, 0.5);
};

export default Responsive;
