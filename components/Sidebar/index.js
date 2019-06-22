import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSlidersH,
  faSearch,
  faAngleLeft,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import { isPast, isFuture } from 'date-fns';
import {
  SportWrapper,
  SidebarHeader,
  NavSearch,
  Search,
  SearchInput,
  SideBarList,
  SidebarFooter,
  FooterProfile,
  AvatarDiv,
  NameContainer,
  Name,
  NavBarSectionHeader,
  NavBarItem,
  IconContainer,
  SearchIcon,
  Icon,
  PanelContainer,
  DirectMessage,
  Title,
  Description,
  HeaderContainer,
  HeaderTitle,
  HeaderActionIconContainer,
  HeaderActionContainer,
  HeaderActionTextContainer,
  HeaderActionIcon,
  HeaderActionPadding,
  Role
} from './styles';
import connect from './store';
import { Link } from '../../routes';

type Props = {
  reduxState: Object
};

const routes = [
  {
    title: 'Leagues',
    link: '/createLeague',
    actionIcon: 'angle-left',
    actionTitle: 'New',
    children: []
  }
];

library.add(faAngleLeft, faAngleRight, faSearch, faSlidersH);

const Sidebar = ({
  reduxState: {
    auth: { user: { firstName, lastName, leagues = [] } } = {}
  } = {}
}: Props) => {
  console.log('DO I HAVE A USER?', { firstName, lastName, leagues });
  routes[0].children = leagues.map(({ id, contests = [], leagueName }) => {
    const activeContests = contests.filter(
      contest => isPast(contest.start) && !isPast(contest.end)
    );
    const upcomingContests = contests.filter(contest =>
      isFuture(contest.start)
    );
    return {
      id,
      name: leagueName,
      link: `/league/${id}`,
      description: `${activeContests.length} Active Contest${
        activeContests.length === 1 ? '' : 's'
      } - ${upcomingContests.length} Upcoming Contest${
        upcomingContests.length === 1 ? '' : 's'
      }`
    };
  });

  return (
    <PanelContainer>
      <SportWrapper>
        <SidebarHeader>
          <NavSearch>
            <Search>
              <SearchInput placeholder="Search" />
              <SearchIcon>
                <FontAwesomeIcon icon="search" />
              </SearchIcon>
            </Search>
          </NavSearch>
        </SidebarHeader>
        <SideBarList>
          <NavBarItem>
            <DirectMessage>
              <Title>Direct Message</Title>
              <Description>Private 1:1 and group messages</Description>
            </DirectMessage>
          </NavBarItem>
          <NavBarItem>
            <DirectMessage>
              <Title>Inbox</Title>
              <Description>Your mentions, topics, comments</Description>
            </DirectMessage>
          </NavBarItem>
          {routes.map(({ title, link, actionTitle, actionIcon, children }) => (
            <div key={title}>
              <HeaderContainer>
                <NavBarSectionHeader>
                  <HeaderTitle>{title}</HeaderTitle>
                  <Link href={link}>
                    <HeaderActionContainer>
                      <HeaderActionIconContainer>
                        <HeaderActionIcon>
                          <FontAwesomeIcon icon={actionIcon} />
                        </HeaderActionIcon>
                      </HeaderActionIconContainer>
                      <HeaderActionTextContainer>
                        {actionTitle}
                      </HeaderActionTextContainer>
                      <HeaderActionPadding>
                        <HeaderActionIconContainer>
                          <HeaderActionIcon>
                            <FontAwesomeIcon icon="angle-right" />
                          </HeaderActionIcon>
                        </HeaderActionIconContainer>
                      </HeaderActionPadding>
                    </HeaderActionContainer>
                  </Link>
                </NavBarSectionHeader>
              </HeaderContainer>
              {children.map(obj => (
                <Link key={obj.id} href={obj.link}>
                  <NavBarItem>
                    <DirectMessage>
                      <Title>{obj.name}</Title>
                      <Description>{obj.description}</Description>
                    </DirectMessage>
                  </NavBarItem>
                </Link>
              ))}
            </div>
          ))}
        </SideBarList>
        <SidebarFooter>
          <FooterProfile>
            <AvatarDiv />
            <NameContainer>
              <Name>
                {firstName} {lastName}
              </Name>
              <Role />
            </NameContainer>
            <IconContainer>
              <Icon>
                <FontAwesomeIcon icon="sliders-h" />
              </Icon>
            </IconContainer>
          </FooterProfile>
        </SidebarFooter>
      </SportWrapper>
    </PanelContainer>
  );
};

Sidebar.propTypes = {
  reduxState: PropTypes.object.isRequired
};

export default connect(Sidebar);
