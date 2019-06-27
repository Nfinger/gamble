import * as React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import connect from './store';

import {
  Section,
  LeagueSectionHeader,
  LeagueHeaderContainer,
  LeagueNameContainer,
  LeagueName,
  LeagueDescription,
  FormSection,
  RadioContainer,
  RadioButton,
  FilledRadioButton,
  RadioNameContainer,
  RadioName,
  FormButtonContainer,
  FormButton,
  FormInput,
  RadioMeta,
  ModalBody,
  ModalFooter
} from '../LeagueInfo/styles';
import { toProperCase } from '../../utils';

type Props = {
  loading: Boolean,
  activeContest: Object,
  stats: Object,
  entry: Object,
  mutations: {
    trigger: Object => Promise<Object>,
    addToLeague: Object => Promise<Object>
  },
  user: Object,
  onClose: Function
};

type State = {
  entryName: String,
  tiers: Object
};

const dateFormat = 'MM/DD/YY';

class EntryForms extends React.Component<Props, State> {
  state = {
    entryName: (this.props.entry && this.props.entry.entryName) || '',
    tiers: {
      first:
        this.props.entry && this.props.entry.picks && this.props.entry.picks[0],
      second:
        this.props.entry && this.props.entry.picks && this.props.entry.picks[1],
      third:
        this.props.entry && this.props.entry.picks && this.props.entry.picks[2],
      fourth:
        this.props.entry && this.props.entry.picks && this.props.entry.picks[3],
      fifth:
        this.props.entry && this.props.entry.picks && this.props.entry.picks[4]
    }
  };

  componentWillUnmount() {
    this.setState({
      entryName: '',
      tiers: {
        first: null,
        second: null,
        third: null,
        fourth: null,
        fifth: null
      }
    });
  }

  golftier = (events, golf) => {
    const { tiers } = this.state;
    const Choice = ({ name }, tier) => (
      <RadioContainer>
        <RadioButton
          onClick={() =>
            this.setState({
              tiers: {
                ...tiers,
                [tier]: name
              }
            })
          }
        >
          <FilledRadioButton selected={tiers[tier] === name} />
        </RadioButton>
        <RadioMeta>
          <RadioNameContainer>
            <RadioName>{name}</RadioName>
          </RadioNameContainer>
        </RadioMeta>
      </RadioContainer>
    );

    return (
      <div>
        {events.map(event => {
          const field = event.participants.map(
            ({ first_name: firstName, last_name: lastName }) =>
              `${firstName} ${lastName}`
          );

          const includes = golf.filter(
            ({ name, thisWeek }) => field.includes(name) && thisWeek
          );
          const firstTier = includes.slice(0, 9);
          const secondTier = includes.slice(9, 19);
          const thirdTier = includes.slice(19, 29);
          const fourthTier = includes.slice(29, 39);
          const fifthTier = includes.slice(39, 59);
          return (
            <FormSection>
              <LeagueHeaderContainer>
                <LeagueNameContainer>
                  <LeagueName>{toProperCase(event.name)}</LeagueName>
                  <LeagueDescription>
                    {format(event.start, dateFormat)} -{' '}
                    {format(event.end, dateFormat)}
                  </LeagueDescription>
                </LeagueNameContainer>
              </LeagueHeaderContainer>
              <FormInput
                type="text"
                name="entryName"
                value={this.state.entryName}
                placeholder="Entry Name"
                onChange={({ target: { value } }) =>
                  this.setState({ entryName: value })
                }
              />
              <Section>
                <LeagueSectionHeader>First Tier</LeagueSectionHeader>
                {firstTier.map(player => Choice(player, 'first'))}
              </Section>
              <Section>
                <LeagueSectionHeader>Second Tier</LeagueSectionHeader>
                {secondTier.map(player => Choice(player, 'second'))}
              </Section>
              {thirdTier.length > 0 && (
                <Section>
                  <LeagueSectionHeader>Third Tier</LeagueSectionHeader>
                  {thirdTier.map(player => Choice(player, 'third'))}
                </Section>
              )}
              {fourthTier.length > 0 && (
                <Section>
                  <LeagueSectionHeader>Fourth Tier</LeagueSectionHeader>
                  {fourthTier.map(player => Choice(player, 'fourth'))}
                </Section>
              )}
              {fifthTier.length > 0 && (
                <Section>
                  <LeagueSectionHeader>Fifth Tier</LeagueSectionHeader>
                  {fifthTier.map(player => Choice(player, 'fifth'))}
                </Section>
              )}
            </FormSection>
          );
        })}
      </div>
    );
  };

  createEntry = async () => {
    const {
      entry,
      activeContest: { id: contestId },
      mutations: { updateOrCreateEntry, trigger },
      user: { id: ownerId },
      onClose
    } = this.props;

    const { tiers, entryName } = this.state;

    const picks = [];
    const id = entry ? entry.id : '';
    Object.keys(tiers).map(tier => picks.push(tiers[tier]));
    updateOrCreateEntry({ id, entryName, ownerId, contestId, picks }).then(() =>
      trigger({ contestId })
    );
    onClose();
  };

  render() {
    const {
      loading,
      activeContest: { sports, events, scoringFormats },
      stats
    } = this.props;
    if (loading) return <>Loading</>;

    return (
      <div>
        <ModalBody>
          {sports.map(sport => {
            const functionName = `${sport}${scoringFormats[sport]}`;
            const sportEvents = events.filter(({ sport: s }) => s === sport);
            return this[functionName](sportEvents, stats[sport]);
          })}
        </ModalBody>
        <ModalFooter>
          <FormButtonContainer onClick={this.createEntry}>
            <FormButton>Submit Entry</FormButton>
          </FormButtonContainer>
        </ModalFooter>
      </div>
    );
  }
}

EntryForms.defaultProps = {
  entry: {}
};

EntryForms.propTypes = {
  entry: PropTypes.object,
  mutations: PropTypes.shape({
    updateOrCreateEntry: PropTypes.func.isRequired,
    trigger: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  activeContest: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired
};

export default connect(EntryForms);
