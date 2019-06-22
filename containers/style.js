import styled, { css } from 'styled-components';

export const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${props => (props.unauthed ? '#2D4D83' : '#fff')};
  overflow-y: hidden;
  display: flex;
  -ms-overflow-style: none;
`;

export const SiteBody = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  background: ${props => (props.unauthed ? '#2D4D83' : '#fff')};
  vertical-align: baseline;
  width: 100%;
`;
export const SiteContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  height: 100vh;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  z-index: 1;
  ${props =>
    props.center &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;
