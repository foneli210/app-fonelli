import React, {FC} from 'react';
// import {StyleSheet} from 'react-native';
import {SelectListSize} from './SelectListSize';
import {
  optionCaracts,
  optionColor,
  optionsIniitals,
  optionSize,
  optionsLong,
  optionsRocks,
} from '../utils/optionsSelects';
import {SelectListCaracts} from './SelectListCaracts';
import {SelectListColors} from './SelectListColor';
import {SelectListInitials} from './SelectListInitials';
import CustomInput from './InputNative';
import {SelectListRocks} from './SelectListRocks';
import {SelectListLong} from './SelectListLong';

interface SelectListSize {
  control: any;
  errors: any;
  onChangeSize: (value: string) => void;
  onChangeCaracts: (value: string) => void;
  onChangeColor: (value: string) => void;
  onChangeInitials: (value: string) => void;
  onChangeRocks: (value: string[]) => void;
  onChangeLong: (value: string[]) => void;
  selectValueSize: string;
  selectValueCaracts: string;
  selectValueColor: string;
  selectValueInitials: string;
  selectValueRocks: string;
  selectValueLong: string;
}

const OptionalOnePiece: FC<SelectListSize> = ({
  control,
  errors,
  onChangeSize = () => {},
  onChangeCaracts = () => {},
  onChangeColor = () => {},
  onChangeInitials = () => {},
  onChangeRocks = () => {},
  onChangeLong = () => {},
  selectValueRocks,
  selectValueLong = '',
  selectValueInitials = '',
  selectValueColor = '',
  selectValueCaracts = '',
  selectValueSize = '',
}) => {
  console.log('TCL: onChangeLong -> selectValueRocks', selectValueRocks);
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
      <SelectListLong
        label="Largo"
        onValueChange={onChangeLong}
        options={optionsLong}
        selectedValue={selectValueLong}
      />
      {selectValueLong === 'N/A' ? (
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
      ) : null}
      {selectValueInitials === 'N/A' ? (
        <CustomInput
          control={control}
          name={'name'}
          label="Nombre"
          errors={errors.name}
          placeholder="“Nuestros diseños respetan mayúsculas y minusculas”"
        />
      ) : null}
      <SelectListRocks
        options={optionsRocks}
        label="Piedras"
        setSelectRocks={onChangeRocks}
        placeholder={selectValueRocks}
      />
    </>
  );
};

export default OptionalOnePiece;
// const styles = StyleSheet.create({container: {}});
