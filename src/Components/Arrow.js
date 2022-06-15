import React from 'react';
import styled from 'styled-components';

const Arrow = () => {
  return (
    <Wrapper>
      <div className='arrow'></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  margin-right: 7px;

  .arrow {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 3px solid var(--clr-border);
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: rotate(135deg);
    transition: var(--transition);
  }
  @keyframes moveArrow {
    from {
      scale: 1;
    }
    50% {
      scale: 1.7;
    }
    to {
      scale: 1;
    }
  }
`;

export default Arrow;
