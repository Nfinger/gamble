import styled, { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  border-width: 0;
  box-sizing: border-box;
  font-size: 100%;
  height: 100vh;
  margin: 0;
  max-width: 100%;
  outline: 0;
  overflow: auto;
  padding: 38px 40px;
  vertical-align: baseline;
`;

export const Header = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const HeaderTitle = styled.div`
  border-width: 0;
  color: #444;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
  margin: 0 0 5px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;
export const HeaderText = styled.div`
  border-width: 0;
  color: #505050;
  font-size: 14px;
  letter-spacing: 0.2px;
  line-height: 1.64;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const DualPanel = styled.div`
  border-width: 0;
  display: flex;
  flex-grow: 1;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const CentralPanel = styled.div`
  border-width: 0;
  flex: 0 0 500px;
  font-size: 100%;
  height: 100vh;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const LeaguePanel = styled.div`
  background-color: #fbfbfb;
  border-right: 1px solid #efefef;
  border-width: 0;
  font-size: 100%;
  height: 100vh;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  vertical-align: baseline;
`;

export const LeagueContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const LeagueChild = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const LeagueScrollContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  height: 100%;
  margin: 0;
  outline: 0;
  overflow: hidden;
  overflow-anchor: none;
  padding: 0;
  position: relative;
  touch-action: auto;
  vertical-align: baseline;
`;

export const PanelBody = styled.div`
  border-width: 0;
  box-sizing: border-box;
  font-size: 100%;
  height: calc(100vh - 63px);
  margin: 0;
  outline: 0;
  overflow: auto;
  padding: 15px;
  vertical-align: baseline;
`;

export const DoubleCol = styled.div`
  border-width: 0;
  display: flex;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const LeftCol = styled.div`
  border-width: 0;
  flex: 0 0 360px;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const RightCol = styled.div`
  border-width: 0;
  flex-grow: 1;
  font-size: 100%;
  margin: 0 45px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const FormSection = styled.div`
  ${props =>
    props.height &&
    css`
      height: props.height;
    `}
  border-width: 0;
  font-size: 100%;
  margin: 50px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const FormSectionLabel = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  color: #aaa;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const FormSectionElements = styled.div`
  border-width: 0;
  display: inline-block;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  vertical-align: baseline;
  width: 100%;
`;

export const FormInput = styled.input`
  border: none;
  border-bottom: 1px solid #bbb;
  background: none;
  color: #444;
  width: 100%;
  padding: 7px 0;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  opacity: 0.7;
  box-sizing: border-box;
`;

export const RadioContainer = styled.div`
  border-width: 0;
  cursor: pointer;
  display: flex;
  font-size: 100%;
  margin: 0 0 15px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const RadioGroup = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 15px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const RadioButton = styled.div`
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 50%;
  display: flex;
  flex: 0 0 28px;
  font-size: 100%;
  height: 28px;
  justify-content: center;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  vertical-align: baseline;
  width: 28px;
`;

export const FilledRadioButton = styled.div`
  background-color: #2196f3;
  border-radius: 50%;
  border-width: 0;
  display: block;
  flex: 0 0 22px;
  font-size: 100%;
  height: 22px;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  width: 22px;

  transform: ${props => (props.selected ? 'scale(1)' : 'scale(0)')};
  transition-delay: 0s;
  transition-duration: 0.1s;
  transition-property: all;
  transition-timing-function: ease;
`;

export const RadioLabel = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const RadioMeta = styled.div`
  border-width: 0;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  justify-content: center;
  margin: 0 0 0 10px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const RadioNameContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const RadioName = styled.div`
  border-width: 0;
  font-size: 100%;
  font-weight: 700;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const RadioNameDiv = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const RadioDescription = styled.div`
  border-width: 0;
  color: #bbb;
  font-size: 12px;
  margin: 3px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const RadioSubtext = styled.span`
  border-width: 0;
  color: #666;
  font-size: 12px;
  margin: 0;
  outline: 0;
  padding: 0 0 0 5px;
  vertical-align: baseline;
`;

export const SwitchContainer = styled.div`
  align-items: center;
  border-width: 0;
  display: flex;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const Switch = styled.label`
  border-width: 0;
  display: inline-block;
  font-size: 100%;
  height: 34px;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  vertical-align: baseline;
  width: 60px;
`;

export const SwitchSlider = styled.span`
  ${props =>
    props.on
      ? css`
          background-color: #93e133;
          border-radius: 34px;
          border-width: 0;
          bottom: 0;
          cursor: pointer;
          font-size: 100%;
          left: 0;
          margin: 0;
          outline: 0;
          padding: 0;
          position: absolute;
          right: 0;
          top: 0;
          transition-delay: 0s;
          transition-duration: 0.4s;
          transition-property: all;
          transition-timing-function: ease;
          vertical-align: baseline;
        `
      : css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: 0.4s;
          transition: 0.4s;

          border-radius: 34px;
          border-width: 0;
          cursor: pointer;
          font-size: 100%;
          margin: 0;
          outline: 0;
          padding: 0;
          transition-delay: 0s;
          transition-duration: 0.4s;
          transition-property: all;
          transition-timing-function: ease;
          vertical-align: baseline;
        `}

  &::before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${props => (props.on ? 'translateX(26px)' : '')};
  }
`;

export const SwitchTextContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const SwitchTitle = styled.div`
  border-width: 0;
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 0 10px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const UnderlinedTitle = styled.div`
  border-width: 0;
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 0 10px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  text-decoration: underline;
`;

export const FormButtonContainer = styled.div`
  border-width: 0;
  display: inline-block;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  vertical-align: baseline;
`;

export const FormButton = styled.button`
  align-items: center;
  background-color: #93e133;
  border-radius: 5px;
  border-style: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  height: 40px;
  justify-content: center;
  outline: none;
  padding: 10px 50px;
  text-transform: uppercase;

  &:hover {
    background-color: #9be93b;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ScrollingContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  max-width: 400px;
`;

export const EventContainer = styled.div`
  height: 100px;
  width: 360px;
  border: 1px solid #efefef;
  border-radius: 4px;
  display: inline-block;
  font-size: 100%;
  margin: 5px 0 0;
  margin-right: 5px;
  outline: 0;
  padding: 0 10px;
  vertical-align: baseline;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${props =>
    props.selected &&
    css`
      background-color: #efefef;
    `}

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const EventMeta = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  width: 150px;
`;

export const RankContainer = styled.div`
  border-width: 0;
  display: flex;
  font-size: 100%;
  margin: 0 0 15px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const Rank = styled.div`
  border-width: 0;
  font-size: 100%;
  font-weight: 700;
  margin-right: 5px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;
