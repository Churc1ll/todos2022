import React from 'react';
import { useGlobalContext } from '../Context';

const Task = ({ item, index, isCompleted }) => {
  const { handleCheck } = useGlobalContext();
  return (
    <div className='items-container'>
      <input
        className={isCompleted && `completed`}
        type='radio'
        name={index}
        onClick={(e) => {
          handleCheck(e);
        }}
      />
      <p className={isCompleted ? `task-name checked` : `task-name`}>
        {item.name}
      </p>
      {isCompleted && (
        <button
          onClick={(e) => {
            handleCheck(e);
          }}
          className='marked'
        >
          &nbsp;✔&nbsp;
        </button>
      )}
    </div>
  );
};

export default Task;
