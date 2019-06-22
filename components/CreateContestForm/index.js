import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import HorizontalSelect from '../HorizontalSelect';

import {
  RadioButton,
  RadioContainer,
  FilledRadioButton,
  RadioMeta,
  RadioName,
  RadioGroup,
  RadioDescription,
  RadioNameContainer,
  RadioSubtext,
  Container,
  Header,
  HeaderTitle,
  HeaderText,
  DoubleCol,
  LeftCol,
  RightCol,
  FormSection,
  FormSectionLabel,
  FormSectionElements,
  FormInput,
  SwitchContainer,
  SwitchTextContainer,
  SwitchTitle,
  UnderlinedTitle,
  SwitchSlider,
  Switch,
  FormButtonContainer,
  FormButton,
  EventContainer,
  EventMeta,
  ScrollingContainer,
  RankContainer,
  Rank
} from './styles';
import connect from './store';
import {
  scoringFormats,
  payouts,
  OrdinalSuffix,
  dateFormat,
  toProperCase
} from '../../utils';

library.add(faTimes);

type Props = {
  id: String,
  loading: Boolean,
  leagueName: String,
  allEvents: Array,
  sports: Array,
  defaultBuyIn: Number,
  mutations: {
    createContest: Object => Promise<Object>
  }
};

const CreateContestForm = (props: Props) => {
  if (props.loading) return <div>loading</div>;
  console.log(props);
  const [payoutRadio, setPayoutRadio] = React.useState('allToFirst');
  const [places, setPlaces] = React.useState(['']);
  const [selectedSports, setSelectedSports] = React.useState([]);
  const [selectedEvents, setSelectedEvents] = React.useState([]);
  const [selectedScoringFormats, setSelectedScoringFormats] = React.useState(
    {}
  );
  const [contestName, setContestName] = React.useState(
    `${props.leagueName} Contest ${1}`
  );
  const [buyIn, setBuyIn] = React.useState(props.defaultBuyIn);
  const [numberOfEntries, setNumberOfEntries] = React.useState(1);
  const [limitEntries, setLimitEntries] = React.useState(false);
  const [sideBets, setSwitch] = React.useState(true);

  const eventContainer = event => {
    const idx = selectedEvents.findIndex(({ id }) => id === event.id);

    return (
      <EventContainer
        selected={idx > -1}
        onClick={() => {
          if (idx > -1) {
            const editable = [...selectedEvents];
            editable.splice(idx);
            setSelectedEvents(editable);
          } else setSelectedEvents([event, ...selectedEvents]);
        }}
        key={event.id}
      >
        <EventMeta>
          <RadioName>{toProperCase(event.name)}</RadioName>
          <RadioDescription>
            {format(event.start, dateFormat)} - {format(event.end, dateFormat)}
          </RadioDescription>
        </EventMeta>
      </EventContainer>
    );
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Create a New Contest</HeaderTitle>
        <HeaderText>
          We took a few things from your league settings we hope you don{"'"}t
          mind
        </HeaderText>
      </Header>
      <DoubleCol>
        <LeftCol>
          <FormSection>
            <FormSectionLabel>CONTEST NAME</FormSectionLabel>
            <FormSectionElements>
              <FormInput
                type="text"
                name="contestName"
                value={contestName}
                placeholder="Enter the name of your league"
                onChange={({ target: { value } }) => setContestName(value)}
              />
            </FormSectionElements>
          </FormSection>
          <FormSection>
            <FormSectionLabel>BUY-IN</FormSectionLabel>
            <FormSectionElements>
              <FormInput
                type="number"
                name="buyIn"
                value={buyIn}
                placeholder="Enter the default buy-in amount"
                onChange={({ target: { value } }) => setBuyIn(value)}
              />
            </FormSectionElements>
          </FormSection>
          <FormSection>
            <FormSectionLabel>PAYOUT STRUCTURE</FormSectionLabel>
            <RadioGroup>
              {payouts.map(({ name, subtext, description, value }) => (
                <RadioContainer key={value}>
                  <RadioButton onClick={() => setPayoutRadio(value)}>
                    <FilledRadioButton selected={payoutRadio === value} />
                  </RadioButton>
                  <RadioMeta>
                    <RadioNameContainer>
                      <RadioName>
                        {name}
                        <RadioSubtext>{subtext}</RadioSubtext>
                      </RadioName>
                    </RadioNameContainer>
                    <RadioDescription>{description}</RadioDescription>
                  </RadioMeta>
                </RadioContainer>
              ))}
              {payoutRadio === 'custom' && (
                <>
                  {places.map((place, idx) => (
                    <FormSectionElements key={OrdinalSuffix(idx + 1)}>
                      <RankContainer>
                        <RadioMeta>
                          <RadioNameContainer>
                            <Rank>{OrdinalSuffix(idx + 1)}</Rank>
                          </RadioNameContainer>
                        </RadioMeta>
                        <FormInput
                          type="number"
                          name={`${place}`}
                          value={places[idx]}
                          placeholder={`${OrdinalSuffix(
                            idx + 1
                          )} place winnings in %`}
                          onChange={({ target: { value } }) => {
                            const editable = [...places];
                            editable[idx] = value;
                            setPlaces(editable);
                          }}
                        />
                        {idx > 0 && (
                          <FontAwesomeIcon
                            onClick={() => {
                              const editable = [...places];
                              editable.splice(idx);
                              setPlaces(editable);
                            }}
                            icon={faTimes}
                          />
                        )}
                      </RankContainer>
                    </FormSectionElements>
                  ))}
                  <RadioDescription
                    onClick={() => {
                      console.log('click');
                      if (places.includes('')) return;
                      const editable = [...places];
                      editable.push('');
                      setPlaces(editable);
                    }}
                  >
                    + Add Place
                  </RadioDescription>
                </>
              )}
            </RadioGroup>
          </FormSection>
          <FormSection>
            <FormSectionLabel>LIMITS ON ENTRIES</FormSectionLabel>
            <SwitchContainer>
              <Switch onClick={() => setLimitEntries(!limitEntries)}>
                <SwitchSlider on={limitEntries} />
              </Switch>
              <SwitchTextContainer>
                <SwitchTitle>
                  Limit the max number of entries per league member
                </SwitchTitle>
              </SwitchTextContainer>
            </SwitchContainer>
            {limitEntries && (
              <FormSectionElements>
                <FormInput
                  type="number"
                  name="numberOfEntries"
                  value={numberOfEntries}
                  placeholder="Enter max number of entires per league member"
                  onChange={({ target: { value } }) =>
                    setNumberOfEntries(value)
                  }
                />
              </FormSectionElements>
            )}
          </FormSection>
          <FormSection>
            <FormSectionLabel>CONTEST{"'"}S SPORTS</FormSectionLabel>
            <HorizontalSelect
              selected={selectedSports}
              handleSelect={setSelectedSports}
              options={props.sports}
              multi
            />
          </FormSection>
          <FormSection>
            <FormSectionLabel>Scoring Format</FormSectionLabel>
            {selectedSports.map(sport => (
              <>
                <ScrollingContainer>
                  {props.allEvents[sport.toLowerCase()] &&
                    props.allEvents[sport.toLowerCase()].map(eventContainer)}
                </ScrollingContainer>
                <SwitchTextContainer>
                  <UnderlinedTitle>{sport}</UnderlinedTitle>
                </SwitchTextContainer>
                <RadioGroup>
                  {scoringFormats[sport.toLowerCase()].map(
                    ({ name, subtext, description, value }) => (
                      <RadioContainer key={value}>
                        <RadioButton
                          onClick={() =>
                            setSelectedScoringFormats({
                              ...selectedScoringFormats,
                              [sport.toLowerCase()]: value
                            })
                          }
                        >
                          <FilledRadioButton
                            selected={
                              selectedScoringFormats[sport.toLowerCase()] ===
                              value
                            }
                          />
                        </RadioButton>
                        <RadioMeta>
                          <RadioNameContainer>
                            <RadioName>
                              {name}
                              <RadioSubtext>{subtext}</RadioSubtext>
                            </RadioName>
                          </RadioNameContainer>
                          <RadioDescription>{description}</RadioDescription>
                        </RadioMeta>
                      </RadioContainer>
                    )
                  )}
                </RadioGroup>
              </>
            ))}
          </FormSection>
          <FormSection>
            <SwitchContainer>
              <Switch onClick={() => setSwitch(!sideBets)}>
                <SwitchSlider on={sideBets} />
              </Switch>
              <SwitchTextContainer>
                <SwitchTitle>Allow Side Betting</SwitchTitle>
              </SwitchTextContainer>
            </SwitchContainer>
          </FormSection>
          <FormSection>
            <FormButtonContainer>
              <FormButton
                onClick={() =>
                  props.mutations.createContest({
                    contestName,
                    buyIn,
                    payout: payoutRadio,
                    places,
                    sports: selectedSports,
                    limitEntries,
                    numberOfEntries,
                    eventsIds: selectedEvents.map(({ id }) => id),
                    scoringFormats: selectedScoringFormats,
                    sideBets,
                    start: selectedEvents.sort((a, b) => a.start - b.start)[0]
                      .start,
                    end: selectedEvents.sort((a, b) => b.end - a.end)[0].end,
                    leagueId: props.id
                  })
                }
              >
                Create Contest
              </FormButton>
            </FormButtonContainer>
          </FormSection>
        </LeftCol>
        <RightCol />
      </DoubleCol>
    </Container>
  );
};

CreateContestForm.propTypes = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  leagueName: PropTypes.string.isRequired,
  allEvents: PropTypes.array.isRequired,
  sports: PropTypes.array.isRequired,
  defaultBuyIn: PropTypes.number.isRequired,
  mutations: PropTypes.shape({
    createContest: PropTypes.func.isRequired
  }).isRequired
};

export default connect(CreateContestForm);
