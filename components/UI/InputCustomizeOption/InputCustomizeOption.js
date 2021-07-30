import React from 'react';

export default function InputCustomizeOption({ inputValue, onChange = () => null }) {
  return (
    <input 
        className='input-customize-option'
        placeholder='Unit'
        // defaultValue={inputValue}
        onChange={(event) => {
          const value = event.target.value
          if(!isNaN(Number(value.trim()))){
            onChange(Number(value))
          }
        }}
        value={inputValue}
    />
  );
}
