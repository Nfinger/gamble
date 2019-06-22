import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const PanelContainer = styled.div`
  background-color: #373a44;
  border-width: 0;
  display: flex;
  flex: 0 0 230px;
  flex-direction: column;
  font-size: 100%;
  height: 100vh;
  margin: 0;
  outline: 0;
  overflow: hidden;
  padding: 0;
  vertical-align: baseline;
`;

export const SportWrapper = styled.div`
  border-width: 0;
  display: flex;
  flex-direction: column;
  font-size: 100%;
  height: 100vh;
  margin: 0;
  outline: 0;
  overflow: hidden;
  padding: 0;
  vertical-align: baseline;
`;

export const SidebarHeader = styled.div`
  border-width: 0;
  flex: 0 0 61px;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const NavSearch = styled.div`
  background-color: #454955;
  border-width: 0;
  font-size: 100%;
  margin: 0 0 1px;
  outline: 0;
  padding: 15px;
  text-align: center;
  vertical-align: baseline;
`;

export const Search = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0 28px 0 0;
  position: relative;
  vertical-align: baseline;
`;

export const SearchInput = styled.input`
  background-color: #373a44;
  border: 1px solid #343740;
  border-radius: 5px;
  box-shadow: rgba(98, 98, 98, 0.27) 0 1px 2px 0 inset;
  color: #fff;
  font-size: 12px;
  height: 30px;
  padding: 0 12px;
  width: 100%;
`;

export const SearchIcon = styled.i`
  -webkit-font-smoothing: antialiased;
  color: #fff;
  display: inline-block;
  font-family: FontAwesome;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 400;
  line-height: 1;
  opacity: 0.4;
  position: absolute;
  right: 15px;
  text-rendering: auto;
  top: 7px;
`;

// .nav-search .player-search .fa-search {
//     position:absolute;
//     right:15px;
//     color:#fff;
//     opacity:.4;
//     top:7px;
//     font-size:16px
// }

export const SideBarList = styled.div`
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  width: 250px;
`;

export const SidebarFooter = styled.div`
  border-width: 0;
  flex: 0 0 60px;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const FooterProfile = styled.div`
  align-items: center;
  background-color: #373a44;
  border-top: 1px solid #343740;
  border-width: 0;
  display: flex;
  flex-direction: row;
  font-size: 100%;
  height: 60px;
  margin: 0;
  outline: 0;
  padding: 0 15px;
  position: relative;
  vertical-align: baseline;
`;
export const AvatarDiv = styled.div`
  align-items: center;
  background-image: url('https://sleepercdn.com/avatars/thumbs/a7edf17a1956ebe79017732156625301');
  background-position: center center;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
  border-radius: 50%;
  border-width: 0;
  color: #fff;
  display: flex;
  flex: 0 0 32px;
  font-size: 18px;
  font-weight: 300;
  height: 32px;
  justify-content: center;
  margin: 0 15px 0 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  width: 32px;
`;

export const NameContainer = styled.div`
  border-width: 0;
  flex-grow: 1;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const Name = styled.div`
  border-width: 0;
  color: #fff;
  font-size: 15px;
  letter-spacing: 0.4px;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const Role = styled.div`
  border-width: 0;
  color: #fff;
  font-size: 9px;
  line-height: 9px;
  margin: 0;
  opacity: 0.7;
  outline: 0;
  padding: 0;
  text-transform: uppercase;
  vertical-align: baseline;
`;

export const NavBarSection = styled.div`
  align-items: center;
  border-width: 0;
  cursor: pointer;
  display: flex;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 25px 2px 5px 15px;
  vertical-align: baseline;
`;

export const NavBarSectionAction = styled.div`
  align-items: flex-end;
  border-width: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: 700;
  margin: 0;
  opacity: 0.7;
  outline: 0;
  padding: 0 20px 0 0;
  vertical-align: baseline;
`;

export const NavBarSectionHeader = styled.div`
  align-items: center;
  border-width: 0;
  cursor: pointer;
  display: flex;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 25px 2px 5px 15px;
  vertical-align: baseline;
`;

export const DirectMessage = styled.div`
  background-color: #454955;
  border-width: 0;
  cursor: pointer;
  font-size: 100%;
  margin: 0 0 1px;
  opacity: 1;
  outline: 0;
  padding: 12px 15px 10px;
  position: relative;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: ease;
  vertical-align: baseline;

  &:hover {
    background-color: #60646e;
  }
`;

export const HeaderContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const Title = styled.div`
  border-width: 0;
  color: #fff;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 14px;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const HeaderTitle = styled.div`
  border-width: 0;
  color: #969696;
  flex-grow: 1;
  font-size: 10px;
  font-weight: 700;
  line-height: 16px;
  margin: 0;
  opacity: 1;
  outline: 0;
  padding: 0;
  text-transform: uppercase;
  vertical-align: baseline;
`;
export const HeaderActionContainer = styled.div`
  align-items: flex-end;
  border-width: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: 700;
  margin: 0;
  opacity: 0.7;
  outline: 0;
  padding: 0 20px 0 0;
  vertical-align: baseline;

  &:hover {
    opacity: 1;
  }
`;

export const HeaderActionIconContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const HeaderActionIcon = styled.i`
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-family: FontAwesome;
  font-size: 15px;
  font-stretch: normal;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 700;
  line-height: 1;
  margin-left: 5px;
  margin-right: 5px;
  text-rendering: auto;
`;

export const HeaderActionTextContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const HeaderActionPadding = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  opacity: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const Description = styled.div`
  border-width: 0;
  color: #fff;
  font-size: 10px;
  margin: 2px 0 0;
  opacity: 0.75;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const NavBarItem = styled.div`
  border-width: 0;
  flex: 1 1 auto;
  font-size: 100%;
  margin: 0;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  vertical-align: baseline;
  width: 250px;
`;

export const NavBarItemHeader = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: #fff;
  line-height: 14px;
  text-transform: capitalize;
  letter-spacing: 0.5px;
`;

export const NavBarItemDescription = styled.div`
  font-size: 10px;
  color: #fff;
  opacity: 0.75;
  margin-top: 2px;
`;

export const IconContainer = styled.div`
  border-width: 0;
  font-size: 100%;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
`;

export const Icon = styled.div`
  -webkit-font-smoothing: antialiased;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: FontAwesome;
  font-size: 25px;
  font-stretch: normal;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 400;
  line-height: 1;
  opacity: 0.6;
  position: relative;
  text-rendering: auto;
  top: -2px;
  &:hover {
    opacity: 1;
  }
`;
