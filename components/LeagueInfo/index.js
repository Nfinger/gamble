import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Rodal from 'rodal';
import { format, isPast } from 'date-fns';
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
  // MemberActionContainer,
  EntryActionContainer,
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
import { OrdinalSuffix, toProperCase, getBase } from '../../utils';
import EntryForm from '../EntryForms';
import SignUpForm from '../SignUpForm';
import Copy from '../Copy';
import Loader from '../Loader';
import connect from './store';

type Props = {
  League: Object,
  contests: Object,
  router: Boolean,
  headers: Object,
  user: Object,
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
  user,
  router: { url: { query: { create } = {} } = {} },
  headers: { host } = {}
}: Props) => {
  // React Hooks
  const [activeContest, setActiveContest] = useState(contests[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentFunction, setModalContentFunction] = useState(null);
  const [email, setEmail] = useState('');
  const [modalWidth, setModalWidth] = useState(null);
  const [modalHeight, setModalHeight] = useState(null);

  useEffect(() => {
    const idx = contests.findIndex(
      ({ id: contestId }) => activeContest.id === contestId
    );
    if (idx > -1) {
      setActiveContest(contests[idx]);
    } else if (activeContest.create) {
      setActiveContest(contests[0]);
    }
    if (create && !isModalOpen) {
      setModalContentFunction(<SignUpForm leagueId={id} />);
      setModalHeight(200);
      setModalWidth(300);
      setIsModalOpen(true);
    }
  });

  const memberContainer = (member, idx) => (
    <MemberContainer
      key={member.id}
      onClick={() => {
        if (member.modalFunction) {
          setModalContentFunction(member.modalFunction);
          setModalHeight(200);
          setModalWidth(300);
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
            {member.wins && (
              <MemberDescription>
                {member.wins.length === 1
                  ? `${member.wins.length} Win`
                  : `${member.wins.length} Wins`}
              </MemberDescription>
            )}
          </MemberMeta>
        </MemberDescriptionContainer>
        {/* <MemberActionContainer>
          <ActionButtonContainer>
            <ActionButton>Set Keepers</ActionButton>
          </ActionButtonContainer>
          <ActionButtonContainer>
            <ActionButton>Propose Trade</ActionButton>
          </ActionButtonContainer>
        </MemberActionContainer> */}
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
      {entry.picks.map((player, idx) => (
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
        <Copy text={`${getBase(host)}/league/${id}&create=true`} />
      </FormSection>
      <ModalFooter>
        <FormButtonContainer>
          <FormButton>Send Invitations</FormButton>
        </FormButtonContainer>
      </ModalFooter>
    </ModalBody>
  );

  const renderCreateEntry = (entry, contest) => (
    <EntryForm
      user={user}
      entry={entry}
      onClose={() => setIsModalOpen(false)}
      activeContest={contest}
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
        {loading && <Loader />}
        {!loading && (
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
                        <LeagueSectionHeader>
                          Active Contests
                        </LeagueSectionHeader>
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
        )}
      </CentralPanel>
      {!loading && (
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
                                {activeContest.limitEntries}
                              </LeagueSectionHeader>
                              <LeagueSectionHeaderAction
                                onClick={() => {
                                  if (
                                    activeContest.ownedEntries.length ===
                                    activeContest.numberOfEntries
                                  ) {
                                    return;
                                  }
                                  setModalContentFunction(
                                    renderCreateEntry(null, activeContest)
                                  );
                                  setModalHeight(550);
                                  setModalWidth(500);
                                  setIsModalOpen(true);
                                }}
                              >
                                {activeContest.limitEntries
                                  ? `${
                                      activeContest.ownedEntries.length <
                                      activeContest.numberOfEntries
                                        ? '+ Create Entry - '
                                        : ''
                                    }${activeContest.ownedEntries.length}/${
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
                                  <ColumnItem>
                                    <MemberContainer noBorder>
                                      <MemberRank>{entry.rank}.</MemberRank>
                                      <EntryDescriptionContainer>
                                        <MemberMeta>
                                          <MemberName>
                                            {entry.entryName}
                                          </MemberName>
                                          <MemberTeamName>
                                            {entry.owner.email}
                                          </MemberTeamName>
                                          <MemberDescription
                                            onClick={() => {
                                              setModalContentFunction(() =>
                                                entryContainer(entry)
                                              );
                                              setModalHeight(400);
                                              setModalWidth(500);
                                              setIsModalOpen(true);
                                            }}
                                          >
                                            Click to view picks
                                          </MemberDescription>
                                        </MemberMeta>
                                      </EntryDescriptionContainer>
                                      {isPast(entry.start) && (
                                        <EntryActionContainer>
                                          <ActionButtonContainer
                                            onClick={() => {
                                              setModalContentFunction(
                                                renderCreateEntry(
                                                  entry,
                                                  activeContest
                                                )
                                              );
                                              setModalHeight(550);
                                              setModalWidth(500);
                                              setIsModalOpen(true);
                                            }}
                                          >
                                            <ActionButton>
                                              Edit Entry
                                            </ActionButton>
                                          </ActionButtonContainer>
                                          <ActionButtonContainer>
                                            <ActionButton>
                                              Delete Entry
                                            </ActionButton>
                                          </ActionButtonContainer>
                                        </EntryActionContainer>
                                      )}
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
      )}
    </DualPanel>
  );
};

export default connect(LeagueInfo);
