import React from 'react';
import Select, { components } from 'react-select';

const ControlComponent = (props) => {
  const { selectProps } = props;

  const handleClick = (e) => {
    e.stopPropagation();
    selectProps.onIndicatorClick();
  }

  return(
    <div onClick={handleClick}>
    <components.Control {...props} />
  </div>
  )
}

const SelectForm = ({ optionValue, selectedValue, onChangeEvent,menuState, clickEvent, inputRef,placeHolder }) => {

  return (
    <Select
      onChange={onChangeEvent}
      components={{ Control: ControlComponent}}
      options={optionValue}
      value={selectedValue}
      menuIsOpen={menuState}
      onClick={clickEvent}
      onIndicatorClick={clickEvent}
      ref={inputRef}
      placeholder={placeHolder}
      isSearchable 
    />
  );
};

export default SelectForm;
