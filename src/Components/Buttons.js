import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../Context';

const Buttons = () => {
  const { tasks, showAll, showActive, showCompleted, clearCompleted } =
    useGlobalContext();
  return (
    <div className='items-container buttons-container'>
      <Wrapper>
        <article>
          <button>
            <span>
              {`${tasks.reduce((prev, current) => {
                if (!current.isCompleted) prev += 1;
                return prev;
              }, 0)} items left`}
            </span>
          </button>
        </article>
        <article>
          <button className='buttons' onClick={(e) => showAll(e)}>
            <p>All</p>
          </button>
          <button className='buttons' onClick={(e) => showActive(e)}>
            <p>Active</p>
          </button>
          <button className='buttons' onClick={(e) => showCompleted(e)}>
            <p>Completed</p>
          </button>
        </article>
        <article>
          <button onClick={clearCompleted}>
            <p>Clear completed</p>
          </button>
        </article>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 10px;
  p {
    transition: all 0.5s linear;
    padding: 2px 4px;
    transform: translateY(-40%);
  }
  p:hover {
    cursor: pointer;
    color: var(--clr-border);
    outline: 1px solid var(--clr-border);
  }
  span {
    display: block;
    margin-top: 5px;
  }
  .buttons {
    margin-right: 30px;
  }
  .buttons-active p {
    outline: 1px solid var(--clr-border);
  }
  @media screen and (max-width: 740px) {
    .buttons {
      margin-right: 8px;
    }
  }
`;
export default Buttons;
