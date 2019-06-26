import styled, { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const MemberContainer = styled.div`
  align-items: center;
  border-width: 0;
  border-bottom: ${props => (props.noBorder ? 0 : '1px solid #efefef')};
  color: #555;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  min-height: 30px;
  outline: 0;
  padding: 10px 0;
  vertical-align: baseline;

  &:hover {
    background-color: #fefefe;
    cursor: pointer;
  }
`;

export const MemberRank = styled.div`
  border-width: 0;
  display: inline;
  font-size: 100%;
  margin: 0 10px 0 0;
  min-width: 20px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const MemberRow = styled.div`
  align-items: center;
  border-width: 0;
  display: flex;
  flex: 1;
  flex-direction: row;
  font-size: 100%;
  justify-content: space-between;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const MemberDescriptionContainer = styled.div`
  align-items: center;
  border-width: 0;
  display: flex;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const MemberAvatarContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0 10px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const MemberAvatar = styled.div`
  align-items: center;
  background-image: url('https://sleepercdn.com/avatars/thumbs/a7edf17a1956ebe79017732156625301');
  background-position: center center;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
  border-radius: 50%;
  border-width: 0;
  color: #fff;
  display: flex;
  flex: 0 0 40px;
  font-size: 18px;
  font-weight: 300;
  height: 40px;
  justify-content: center;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  width: 40px;
`;

export const MemberMeta = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 2px 10px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const MemberName = styled.div`
  border-width: 0;
  color: #555;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  outline: 0;
  padding: 0;
  text-transform: none;
  vertical-align: baseline;
`;

export const MemberTeamName = styled.div`
  border-width: 0;
  color: gray;
  font-size: 11px;
  font-weight: 400;
  line-height: 12px;
  margin: 3px 0 0;
  max-width: 110px;
  outline: 0;
  overflow: hidden;
  padding: 0;
  text-transform: none;
  vertical-align: baseline;
  white-space: nowrap;
`;

export const MemberDescription = styled.div`
  border-width: 0;
  color: #aaa;
  font-size: 11px;
  margin: 3px 0 1px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const MemberActionContainer = styled.div`
  border-width: 0;
  display: flex;
  flex-direction: column;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const ActionButtonContainer = styled.div`
  border-width: 0;
  display: inline-block;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  vertical-align: baseline;
`;

export const ActionButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  color: #a1a1a1;
  cursor: pointer;
  display: flex;
  font-size: 10px;
  font-weight: 700;
  height: 30px;
  justify-content: center;
  margin-bottom: 10px;
  outline: none;
  padding: 8px 25px;
  text-transform: uppercase;
  width: 150px;

  &:hover {
    border-color: #b4b4b4;
  }
`;

export const ContestContainer = styled.div`
  height: 100px;
  width: 200px;
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

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ContestMeta = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  width: 180px;
`;

export const RightPanel = styled.div`
  border-width: 0;
  flex-grow: 1;
  font-size: 100%;
  height: 100vh;
  margin: 0;
  min-width: 500px;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  z-index: 1;
`;

export const RightContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const DragAndDrop = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  vertical-align: baseline;
`;

export const ChatPanel = styled.div`
  border-width: 0;
  display: flex;
  flex-direction: column;
  font-size: 100%;
  height: 100vh;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const ChatHeaderContainer = styled.div`
  border-width: 0;
  flex: 0 0 60px;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const ChatHeader = styled.div`
  align-items: center;
  border-width: 0;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  font-size: 100%;
  height: 60px;
  margin: 0;
  outline: 0;
  padding: 1px 20px;
  vertical-align: baseline;
`;

export const ChatAvatarContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0 10px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const ChatAvatar = styled.div`
  align-items: center;
  background-color: transparent;
  background-image: url('https://sleepercdn.com/images/v2/icons/league/league_avatar_pink.png');
  background-position: center center;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
  border-radius: 10px;
  border-width: 0;
  color: #fff;
  display: flex;
  flex: 0 0 40px;
  font-size: 18px;
  font-weight: 300;
  height: 40px;
  justify-content: center;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  vertical-align: baseline;
  width: 40px;
`;

export const ChatNameContainer = styled.div`
  border-width: 0;
  flex-grow: 1;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const ChatName = styled.div`
  border-width: 0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.3px;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const ChatMeta = styled.div`
  border-width: 0;
  color: #bbb;
  display: flex;
  font-size: 11px;
  line-height: 12px;
  margin: 3px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const ChatMetaDescription = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const ChatHeaderButton = styled.div`
  border-width: 0;
  color: #ccc;
  cursor: pointer;
  flex: 0 0 50px;
  font-size: 24px;
  margin: 0;
  outline: 0;
  padding: 0;
  text-align: center;
  vertical-align: baseline;

  &:hover {
    color: #333;
  }
`;

export const BodyContainer = styled.div`
  border-width: 0;
  display: flex;
  flex-grow: 1;
  font-size: 100%;
  margin: 0;
  outline: 0;
  overflow-y: auto;
  padding: 0;
  position: relative;
  vertical-align: baseline;
`;

export const BodyPanel = styled.div`
  border-width: 0;
  flex-grow: 1;
  font-size: 100%;
  margin: 0;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  position: relative;
  transition-delay: 0s;
  transition-duration: 0.15s;
  transition-property: all;
  transition-timing-function: ease;
  vertical-align: baseline;
`;

export const Body = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const CommentList = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  margin-left: 2%;
  margin-right: 2%;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const LeagueHeaderContainer = styled.div`
  align-items: center;
  background-color: #fbfbfb;
  border-bottom: 1px solid #eee;
  border-width: 0;
  box-sizing: border-box;
  display: flex;
  font-size: 100%;
  height: 63px;
  margin: 0;
  outline: 0;
  padding: 0 20px 2px;
  vertical-align: baseline;
`;

export const LeagueNameContainer = styled.div`
  border-width: 0;
  flex-grow: 1;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const LeagueName = styled.div`
  border-width: 0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.3px;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const LeagueDescription = styled.div`
  border-width: 0;
  color: #bbb;
  font-size: 11px;
  line-height: 12px;
  margin: 3px 0 0;
  max-width: 232px;
  outline: 0;
  overflow-x: hidden;
  padding: 0;
  vertical-align: baseline;
  white-space: nowrap;
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

export const LeaguePanelBody = styled.div`
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

export const LeagueSectionHeaderContainer = styled.div`
  border-width: 0;
  border-bottom: 1px solid #efefef;
  display: flex;
  margin: 0;
  outline: 0;
  padding: 0 0 5px;
  vertical-align: baseline;
`;

export const LeagueSectionHeader = styled.div`
  font-size: 11px;
  color: #b6b6b6;
  font-weight: 700;
  text-transform: uppercase;
`;

export const LeagueSectionHeaderAction = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2%;
  font-size: 9px;
  color: #b6b6b6;
  font-weight: 100;
  text-transform: uppercase;
  cursor: pointer;
`;

export const ScrollingContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  max-width: 500px;
`;

export const Section = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 50px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const ContestEntryButton = styled.div`
  align-items: center;
  background-color: transparent;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  color: #a1a1a1;
  cursor: pointer;
  display: flex;
  font-size: 10px;
  font-weight: 700;
  height: 30px;
  justify-content: center;
  margin-bottom: 10px;
  outline: none;
  padding: 8px 25px;
  text-transform: uppercase;
  width: 400px;

  &:hover {
    border-color: #b4b4b4;
  }
`;

export const ChatBodyActionButtonContainer = styled.div`
  border-width: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  align-items: center;
  margin-top: 2%;
  vertical-align: baseline;
`;

export const DualColumn = styled.div`
  border-width: 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 100%;
  margin: 7px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const ColumnItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-basis: 0;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  font-size: 13px;
  height: 75px;
  letter-spacing: 0.3px;
  margin: 0;
  margin-bottom: 2%;
  outline: 0;
  padding: 0 5px 0;

  &:hover {
    border-color: #b4b4b4;
  }
`;

export const ColumnSpacer = styled.span`
  align-items: center;
  border-width: 0;
  display: flex;
  font-size: 12px;
  font-weight: 900;
  justify-content: center;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  width: 40px;
`;

export const PlayerContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 5px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const EntryContainer = styled.div`
  align-items: center;
  border-width: 0;
  border-bottom: ${props => (props.noBorder ? 0 : '1px solid #efefef')};
  color: #555;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 2%;
  min-height: 30px;
  outline: 0;
  padding: 10px 0;
  vertical-align: baseline;

  &:hover {
    background-color: #fefefe;
    cursor: pointer;
  }
`;

export const EntryDescriptionContainer = styled.div`
  align-items: center;
  border-width: 0;
  display: flex;
  font-size: 100%;
  min-width: 150px;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

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

  /* :hover */
  background-color: #9be93b;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
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

export const ModalBody = styled.div`
  height: ${props => props.height || 500};
  overflow: auto;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  margin: 2%;
`;
