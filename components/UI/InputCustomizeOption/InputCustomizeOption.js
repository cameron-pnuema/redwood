import React from 'react';

export default function InputCustomizeOption({ noOfUnit = 0, onChange = () => null }) {
  var reg = new RegExp('^[0-9]+$');
  return (
    <input 
        className='input-customize-option'
        placeholder='No of unit'
        onChange={(event) => {
          let value = event.target.value
          if(reg.test(value) || !value){
            value = value || 0
            onChange(Number(value))
          }
        }}
        value={noOfUnit}
    />
  );
}
