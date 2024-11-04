import React, {FC} from 'react';
// import {StyleSheet} from 'react-native';
import {SelectListSize} from './SelectListSize';
import {
  optionCaracts,
  optionColor,
  optionsIniitals,
  optionSize,
  optionsRocks,
} from '../utils/optionsSelects';
import {SelectListCaracts} from './SelectListCaracts';
import {SelectListColors} from './SelectListColor';
import {SelectListInitials} from './SelectListInitials';
import CustomInput from './InputNative';
import {SelectListRocks} from './SelectListRocks';

interface SelectListSize {
  control: any;
  errors: any;
  onChangeSize: (value: string) => void;
  onChangeCaracts: (value: string) => void;
  onChangeColor: (value: string) => void;
  onChangeInitials: (value: string) => void;
  onChangeRocks: (value: string) => void;
  selectValueSize: string;
  selectValueCaracts: string;
  selectValueColor: string;
  selectValueInitials: string;
  selectValueRocks: string;
}

const OptionalOnePiece: FC<SelectListSize> = ({
  control,
  errors,
  onChangeSize = () => {},
  onChangeCaracts = () => {},
  onChangeColor = () => {},
  onChangeInitials = () => {},
  onChangeRocks = () => {},
  selectValueRocks = '',
  selectValueInitials = '',
  selectValueColor = '',
  selectValueCaracts = '',
  selectValueSize = '',
}) => {
  return (
    <>
      <SelectListSize
        options={optionSize}
        label="Talla"
        placeholder="Selecciona la talla"
        onValueChange={value => {
          console.log('la seleccion es', value);
          onChangeSize(value);
        }}
        selectedValue={selectValueSize}
      />
      <SelectListCaracts
        options={optionCaracts}
        label="Kilataje"
        placeholder="Selecciona el kilate"
        onValueChange={value => {
          console.log('la seleccion es', value);
          onChangeCaracts(value);
        }}
        selectedValue={selectValueCaracts}
      />
      <SelectListColors
        options={optionColor}
        label="Color"
        placeholder="Selecciona la talla"
        onValueChange={value => {
          console.log('la seleccion es', value);
          onChangeColor(value);
        }}
        selectedValue={selectValueColor}
      />
      <SelectListInitials
        options={optionsIniitals}
        label="Iniciales"
        placeholder="Selecciona la talla"
        onValueChange={value => {
          console.log('la seleccion de iniciales es', value);
          onChangeInitials(value);
        }}
        selectedValue={selectValueInitials}
      />
      {selectValueInitials === 'N/A' ? (
        <CustomInput
          control={control}
          name={'nombre_pedido'}
          label="Nombre"
          errors={errors.nombre_pedido}
          placeholder="“Nuestros diseños respetan mayúsculas y minusculas”"
        />
      ) : null}
      <SelectListRocks
        options={optionsRocks}
        label="Piedra"
        placeholder="Selecciona la piedra"
        onValueChange={value => {
          console.log('la seleccion es', value);
          onChangeRocks(value);
        }}
        selectedValue={selectValueRocks}
      />
    </>
  );
};

export default OptionalOnePiece;
// const styles = StyleSheet.create({container: {}});
