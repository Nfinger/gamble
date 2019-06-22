import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const CustomHorizontalSelect = styled.div`
  border: 1px solid #efefef;
  border-radius: 4px;
  display: inline-block;
  font-size: 100%;
  margin: 5px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  max-width: 320px;
`;

export const SelectItem = styled.div`
  border-bottom: 1px solid #efefef;
  border-width: 0;
  cursor: pointer;
  display: inline-block;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 10px;
  vertical-align: baseline;
  width: 60px;

  &:hover {
    background: #f5f5f5;
  }
`;

export const Meta = styled.div`
  align-items: center;
  border-width: 0;
  display: flex;
  flex-direction: column;
  font-size: 100%;
  justify-content: center;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const Name = styled.div`
  border-width: 0;
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const Description = styled.div`
  border-width: 0;
  font-size: 10px;
  margin: 3px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const SelectedItem = styled.div`
  background-color: #efefef;
  border-bottom: 1px solid #efefef;
  border-width: 0;
  cursor: pointer;
  display: inline-block;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 10px;
  vertical-align: baseline;
  width: 60px;

  &:hover {
    background-color: #f5f5f5;
  }
`;
