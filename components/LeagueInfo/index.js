import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Rodal from 'rodal';
import { format } from 'date-fns';
import Router from 'next/router';
// include styles
import 'rodal/lib/rodal.css';
import {
  RadioName,
  FormSection,
  FormSectionLabel,
  FormInput,
  DualPanel,
  CentralPanel,
  LeaguePanel,
  LeagueContainer,
  LeagueChild,
  RadioDescription,
  FormButtonContainer,
  FormButton,
  RadioContainer,
  RadioMeta,
  RadioNameContainer,
  ModalBody,
  ModalFooter,
  MemberContainer,
  MemberRank,
  MemberRow,
  MemberDescriptionContainer,
  MemberAvatarContainer,
  MemberAvatar,
  MemberMeta,
  MemberName,
  MemberTeamName,
  MemberDescription,
  MemberActionContainer,
  ActionButtonContainer,
  ActionButton,
  ContestContainer,
  ContestMeta,
  RightPanel,
  RightContainer,
  DragAndDrop,
  ChatPanel,
  ChatHeaderContainer,
  ChatHeader,
  ChatAvatarContainer,
  ChatAvatar,
  ChatNameContainer,
  ChatName,
  ChatMeta,
  ChatMetaDescription,
  ChatHeaderButton,
  BodyContainer,
  BodyPanel,
  Body,
  CommentList,
  LeagueHeaderContainer,
  LeagueNameContainer,
  LeagueName,
  LeagueDescription,
  LeagueScrollContainer,
  LeaguePanelBody,
  LeagueSectionHeader,
  LeagueSectionHeaderAction,
  ScrollingContainer,
  Section,
  ContestEntryButton,
  ChatBodyActionButtonContainer,
  DualColumn,
  ColumnItem,
  ColumnSpacer,
  LeagueSectionHeaderContainer,
  PlayerContainer,
  EntryDescriptionContainer
} from './styles';
import { OrdinalSuffix, toProperCase } from '../../utils';
import EntryForm from '../EntryForms';
import SignUpForm from '../SignUpForm';
import Copy from '../Copy';
import connect from './store';

type Props = {
  League: Object,
  contests: Object,
  create: Boolean,
  socket: Object,
  loading: Boolean
};

const LeagueInfo = ({
  loading,
  League: {
    id,
    leagueName,
    members = [],
    contests = [
      {
        contestName: 'Create New Contest',
        entries: [],
        create: true
      }
    ]
  } = {},
  create,
  socket
}: Props) => {
  if (loading) return <>Loading</>;
  // React Hooks
  const [activeContest, setActiveContest] = useState(contests[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentFunction, setModalContentFunction] = useState(null);
  const [email, setEmail] = useState('');
  const [modalWidth, setModalWidth] = useState(null);
  const [modalHeight, setModalHeight] = useState(null);
  const [socketListening, setSocketListening] = useState(false);
  useEffect(() => {
    if (socket && !socketListening) {
      socket.on('contestUpdate', args => {
        // let editable = [...contests];
        // const idx = contests.findIndex(
        //   ({ id: contestId }) => args.id === contestId
        // );
        // editable[idx] = args;
        if (activeContest.id === args.id) setActiveContest(args);
      });
      setSocketListening(true);
    }
    if (create && !isModalOpen) {
      setModalContentFunction(<SignUpForm leagueId={id} />);
      setModalHeight(365);
      setModalWidth(500);
      setIsModalOpen(true);
    }
  });

  const memberContainer = (member, idx) => (
    <MemberContainer
      key={member.id}
      onClick={() => {
        if (member.modalFunction) {
          setModalContentFunction(member.modalFunction);
          setModalHeight(365);
          setModalWidth(500);
          setIsModalOpen(true);
        }
      }}
    >
      <MemberRank>{idx + 1}.</MemberRank>
      <MemberRow>
        <MemberDescriptionContainer>
          <MemberAvatarContainer>
            <MemberAvatar />
          </MemberAvatarContainer>
          <MemberMeta>
            <MemberName>
              {member.firstName} {member.lastName}
            </MemberName>
            <MemberTeamName>{member.email}</MemberTeamName>
            <MemberDescription>{member.email}</MemberDescription>
          </MemberMeta>
        </MemberDescriptionContainer>
        <MemberActionContainer>
          <ActionButtonContainer>
            <ActionButton>Set Keepers</ActionButton>
          </ActionButtonContainer>
          <ActionButtonContainer>
            <ActionButton>Propose Trade</ActionButton>
          </ActionButtonContainer>
        </MemberActionContainer>
      </MemberRow>
    </MemberContainer>
  );

  const contestContainer = contest => (
    <ContestContainer
      key={contest.id}
      onClick={() =>
        contest.create
          ? Router.push('/createContest', { query: { id } })
          : setActiveContest(contest)
      }
    >
      <ContestMeta>
        <RadioName>{contest.contestName}</RadioName>
        {contest.start && (
          <RadioDescription>
            {format(contest.start, 'MM/DD/YYYY')} -{' '}
            {format(contest.end, 'MM/DD/YYYY')}
          </RadioDescription>
        )}
      </ContestMeta>
    </ContestContainer>
  );

  const entryContainer = entry => (
    <FormSection>
      <LeagueNameContainer>
        <LeagueName>{toProperCase(entry.entryName)}</LeagueName>
      </LeagueNameContainer>
      {entry.players.map((player, idx) => (
        <PlayerContainer>
          <LeagueSectionHeader>
            {OrdinalSuffix(idx + 1)} Tier
          </LeagueSectionHeader>
          <RadioContainer>
            <RadioMeta>
              <RadioNameContainer>
                <RadioName>{player}</RadioName>
              </RadioNameContainer>
            </RadioMeta>
          </RadioContainer>
        </PlayerContainer>
      ))}
    </FormSection>
  );

  const renderInvite = () => (
    <ModalBody height={200}>
      <FormSection height="50%">
        <FormSectionLabel>Invite Friend</FormSectionLabel>
        <FormInput
          type="email"
          name="email"
          value={email}
          placeholder="Enter an email address"
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <Copy text={`http://localhost:3000/league/${id}&create=true`} />
      </FormSection>
      <ModalFooter>
        <FormButtonContainer>
          <FormButton>Send Invitations</FormButton>
        </FormButtonContainer>
      </ModalFooter>
    </ModalBody>
  );

  const renderCreateEntry = () => (
    <EntryForm
      onClose={() => setIsModalOpen(false)}
      activeContest={activeContest}
    />
  );

  const membersToShow = [...members];

  while (membersToShow.length < 6) {
    membersToShow.push({
      id: membersToShow.length,
      email: '+ Invite Friend',
      modalFunction: renderInvite
    });
  }

  return (
    <DualPanel>
      <Rodal
        customStyles={{ overflowY: 'auto' }}
        height={modalHeight}
        width={modalWidth}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {modalContentFunction}
      </Rodal>
      <CentralPanel>
        <LeaguePanel>
          <LeagueHeaderContainer>
            <LeagueNameContainer>
              <LeagueName>Welcome to {leagueName}!</LeagueName>
              <LeagueDescription>
                Time to take your friends{"'"} money
              </LeagueDescription>
            </LeagueNameContainer>
          </LeagueHeaderContainer>
          <LeagueScrollContainer>
            <LeaguePanelBody>
              <LeagueContainer>
                <LeagueChild>
                  <Section>
                    <LeagueSectionHeaderContainer>
                      <LeagueSectionHeader>Members</LeagueSectionHeader>
                      <LeagueSectionHeaderAction
                        onClick={() => {
                          setModalContentFunction(renderInvite());
                          setModalHeight(200);
                          setModalWidth(300);
                          setIsModalOpen(true);
                        }}
                      >
                        + Invite Friend
                      </LeagueSectionHeaderAction>
                    </LeagueSectionHeaderContainer>
                    {membersToShow.map(memberContainer)}
                  </Section>
                  <Section>
                    <LeagueSectionHeaderContainer>
                      <LeagueSectionHeader>Active Contests</LeagueSectionHeader>
                      <Link href={`/createContest?id=${id}`}>
                        <LeagueSectionHeaderAction>
                          + Create Contest
                        </LeagueSectionHeaderAction>
                      </Link>
                    </LeagueSectionHeaderContainer>
                    <ScrollingContainer>
                      {contests.map(contestContainer)}
                    </ScrollingContainer>
                  </Section>
                </LeagueChild>
              </LeagueContainer>
            </LeaguePanelBody>
          </LeagueScrollContainer>
        </LeaguePanel>
      </CentralPanel>
      <RightPanel>
        <RightContainer>
          <DragAndDrop>
            <ChatPanel>
              <ChatHeaderContainer>
                <ChatHeader>
                  <ChatAvatarContainer>
                    <ChatAvatar />
                  </ChatAvatarContainer>
                  <ChatNameContainer>
                    <ChatName>{activeContest.contestName}</ChatName>
                    <ChatMeta>
                      {activeContest.start && (
                        <ChatMetaDescription>
                          {format(activeContest.start, 'MM/DD/YYYY')} -{' '}
                          {format(activeContest.end, 'MM/DD/YYYY')}
                        </ChatMetaDescription>
                      )}
                    </ChatMeta>
                  </ChatNameContainer>
                  <ChatHeaderButton />
                  <ChatHeaderButton />
                </ChatHeader>
              </ChatHeaderContainer>
              <BodyContainer>
                <BodyPanel>
                  <Body>
                    <CommentList>
                      {!activeContest.create && (
                        <Section>
                          <LeagueSectionHeaderContainer>
                            <LeagueSectionHeader>
                              Leaderboard
                            </LeagueSectionHeader>
                            <LeagueSectionHeaderAction
                              onClick={() => {
                                setModalContentFunction(renderCreateEntry);
                                setModalHeight(550);
                                setModalWidth(500);
                                setIsModalOpen(true);
                              }}
                            >
                              {activeContest.limitEntries
                                ? `${
                                    activeContest.ownedEntries <
                                    activeContest.numberOfEntries
                                      ? '+ Create Entry - '
                                      : ''
                                  }${activeContest.ownedEntries}/${
                                    activeContest.numberOfEntries
                                  } created`
                                : '+ Create Entry'}
                            </LeagueSectionHeaderAction>
                          </LeagueSectionHeaderContainer>
                          {activeContest.entries.length === 0 && (
                            <ChatBodyActionButtonContainer
                              onClick={() => {
                                setModalContentFunction(renderCreateEntry);
                                setModalHeight(550);
                                setModalWidth(500);
                                setIsModalOpen(true);
                              }}
                            >
                              <ContestEntryButton>
                                Create Entry
                              </ContestEntryButton>
                            </ChatBodyActionButtonContainer>
                          )}
                          <DualColumn>
                            {activeContest.entries.map((entry, idx) => (
                              <>
                                <ColumnItem
                                  onClick={() => {
                                    setModalContentFunction(() =>
                                      entryContainer(entry)
                                    );
                                    setModalHeight(400);
                                    setModalWidth(500);
                                    setIsModalOpen(true);
                                  }}
                                >
                                  <MemberContainer noBorder>
                                    <MemberRank>{idx + 1}.</MemberRank>
                                    <EntryDescriptionContainer>
                                      <MemberMeta>
                                        <MemberName>
                                          {entry.entryName}
                                        </MemberName>
                                        <MemberTeamName>
                                          {entry.user.email}
                                        </MemberTeamName>
                                        <MemberDescription>
                                          Click to view picks
                                        </MemberDescription>
                                      </MemberMeta>
                                    </EntryDescriptionContainer>
                                  </MemberContainer>
                                </ColumnItem>
                                {idx % 2 === 0 && <ColumnSpacer />}
                              </>
                            ))}
                          </DualColumn>
                        </Section>
                      )}
                      {activeContest.create && (
                        <ChatBodyActionButtonContainer
                          onClick={() => {
                            Router.push('/createContest', { query: { id } });
                          }}
                        >
                          <ContestEntryButton>
                            Create First Contest
                          </ContestEntryButton>
                        </ChatBodyActionButtonContainer>
                      )}
                    </CommentList>
                  </Body>
                </BodyPanel>
              </BodyContainer>
            </ChatPanel>
          </DragAndDrop>
        </RightContainer>
      </RightPanel>
    </DualPanel>
  );
};

export default connect(LeagueInfo);
