import styled, { keyframes } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export

export const CopyText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2%;
  font-size: 9px;
  color: #b6b6b6;
  font-weight: 100;
  text-transform: uppercase;
  cursor: pointer;
`;

export const CopiedKeyFrames = keyframes`
	0% {
		opacity: 0;
		transform: translateY(0);
	}
	70% {
		opacity: 1;
		transform: translateY(100%);
	}
	100% {
		opacity: 0;
	}
`;

export const Copied = styled.div`
  position: absolute;
  top: 50%;
  /* right: 110%; */
  height: 30px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  cursor: pointer;
  display: block;
  font-size: 0.75em;
  padding: 2px 3px;
  color: #fff;
  background-color: #93e133;
  border-radius: 3px;
  opacity: 0;
  will-change: opacity, transform;
  animation: ${CopiedKeyFrames} 1.5s ease;
`;

export const CopyBody = styled.div`
  margin-top: 2%;
`;
