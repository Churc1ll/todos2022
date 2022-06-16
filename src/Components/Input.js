import React from 'react';
import { useGlobalContext } from '../Context';
import Arrow from './Arrow';

const Input = () => {
  const { handleEnterPress, writeValue } = useGlobalContext();
  return (
    <div className='items-container'>
      <Arrow />
      <input
        className='input-task'
        type='text'
        placeholder='What needs to be done?'
        onKeyPress={(e) => handleEnterPress(e)}
      />
      <button className='input-task__submit' onClick={writeValue}>
        add
      </button>
    </div>
  );
};

export default Input;
