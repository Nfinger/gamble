import styled, { keyframes } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Loader = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const SpinKeyframes = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Line = styled.div`
  border: 3px solid transparent;
  border-top-color: #3cefff;
  border-right-color: #3cefff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Outer = styled(Line)`
  width: 3.5em;
  height: 3.5em;
  margin-left: -1.75em;
  margin-top: -1.75em;
  animation: ${SpinKeyframes} 2s linear infinite;
`;

export const Middle = styled(Line)`
  width: 2.1em;
  height: 2.1em;
  margin-left: -1.05em;
  margin-top: -1.05em;
  animation: ${SpinKeyframes} 1.75s linear reverse infinite;
`;

export const Inner = styled(Line)`
  width: 0.8em;
  height: 0.8em;
  margin-left: -0.4em;
  margin-top: -0.4em;
  animation: ${SpinKeyframes} 1.5s linear infinite;
`;
