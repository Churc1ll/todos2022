import React from 'react';
import { useGlobalContext } from '../Context';
import Task from './Task';

const List = () => {
  const { tasks, showing } = useGlobalContext();
  const { active, completed } = showing;
  return (
    <section className='list-section'>
      {!active &&
        !completed &&
        tasks.map((item, index) => {
          const isCompleted = item.isCompleted;
          return <Task item={item} isCompleted={isCompleted} index={index} />;
        })}

      {active &&
        tasks.map((item, index) => {
          const isCompleted = item.isCompleted;
          if (!isCompleted) {
            return <Task item={item} isCompleted={isCompleted} index={index} />;
          }
          return true;
        })}

      {completed &&
        tasks.map((item, index) => {
          const isCompleted = item.isCompleted;
          if (isCompleted) {
            return <Task item={item} isCompleted={isCompleted} index={index} />;
          }
          return true;
        })}
    </section>
  );
};

export default List;
