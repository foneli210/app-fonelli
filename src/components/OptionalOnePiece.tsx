import React, {FC} from 'react';
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
import {SelectListRocks} from './SelectListRocks';
import {SelectListLong} from './SelectListLong';
import InputControlOff from './InputControlOff';

interface SelectListSize {
  control: any;
  errors: any;
  onChangeSize: (value: string) => void;
  onChangeCaracts: (value: string) => void;
  onChangeColor: (value: string) => void;
  onChangeInitials: (value: string) => void;
  onChangeName: (value: string) => void;
  onChangeRocks: (value: string[]) => void;
  onChangeLong: (value: string[]) => void;
  selectValueSize: string;
  selectValueCaracts: string;
  selectValueColor: string;
  selectValueInitials: string;
  selectValueName: string;
  selectValueRocks: string;
  selectValueLong: string;
}

const OptionalOnePiece: FC<SelectListSize> = ({
  onChangeSize = () => {},
  onChangeCaracts = () => {},
  onChangeColor = () => {},
  onChangeInitials = () => {},
  onChangeName = () => {},
  onChangeRocks = () => {},
  onChangeLong = () => {},
  selectValueRocks,
  selectValueLong = '',
  selectValueInitials = '',
  selectValueName = '',
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
          onChangeSize(value);
        }}
        selectedValue={selectValueSize}
      />
      <SelectListCaracts
        options={optionCaracts}
        label="Kilataje"
        placeholder="Selecciona el kilate"
        onValueChange={value => {
          onChangeCaracts(value);
        }}
        selectedValue={selectValueCaracts}
      />
      <SelectListColors
        options={optionColor}
        label="Color"
        placeholder="Selecciona la talla"
        onValueChange={value => {
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
            onChangeInitials(value);
          }}
          selectedValue={selectValueInitials}
        />
      ) : null}
      {selectValueInitials === 'N/A' ? (
        <InputControlOff
          label="Nombre"
          placeholder="“Nuestros diseños respetan mayúsculas y minusculas”"
          onChangeName={onChangeName}
          selectValueName={selectValueName}
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
