import React from 'react';
import PropTypes from 'prop-types';
import {
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
  SwitchSlider,
  Switch,
  FormButtonContainer,
  FormButton
} from './styles';
import connect from './store';
import HorizontalSelect from '../HorizontalSelect';
import redirect from '../../libraries/redirect';

const options = [
  {
    title: 'Football',
    field: 'sports'
  },
  {
    title: 'Basketball',
    field: 'sports'
  },
  {
    title: 'Golf',
    field: 'sports'
  },
  {
    title: 'Baseball',
    field: 'sports'
  }
];

type Props = {
  mutations: {
    createLeague: Object => Promise<Object>,
    reduxState: {
      auth: {
        user: Object
      }
    }
  }
};

const CreateLeagueForm = ({
  mutations: { createLeague },
  reduxState: { auth: { user } = {} } = {}
}: Props) => {
  const [sports, setSelectedSports] = React.useState([]);
  const [leagueName, setLeagueName] = React.useState('');
  const [defaultBuyIn, setDefaultBuyIn] = React.useState(0);
  const [autoCreate, setSwitch] = React.useState(true);

  return (
    <Container>
      <Header>
        <HeaderTitle>Create a League for 2019</HeaderTitle>
        <HeaderText>
          Don{"'"}t worry, you{"'"}ll be able to make changes to all settings
          later
        </HeaderText>
      </Header>
      <DoubleCol>
        <LeftCol>
          <FormSection>
            <FormSectionLabel>LEAGUE NAME</FormSectionLabel>
            <FormSectionElements>
              <FormInput
                type="text"
                name="leagueName"
                value={leagueName}
                placeholder="Enter the name of your league"
                onChange={({ target: { value } }) => setLeagueName(value)}
              />
            </FormSectionElements>
          </FormSection>
          <FormSection>
            <FormSectionLabel>LEAGUE{"'"}S SPORTS</FormSectionLabel>
            <HorizontalSelect
              selected={sports}
              handleSelect={setSelectedSports}
              options={options}
              multi
            />
          </FormSection>
          <FormSection>
            <FormSectionLabel>DEFAULT BUY-IN</FormSectionLabel>
            <FormSectionElements>
              <FormInput
                type="number"
                name="defaultBuyIn"
                value={defaultBuyIn}
                placeholder="Enter the default buy-in amount"
                onChange={({ target: { value } }) => setDefaultBuyIn(value)}
              />
            </FormSectionElements>
          </FormSection>
          <FormSection>
            <SwitchContainer>
              <Switch onClick={() => setSwitch(!autoCreate)}>
                <SwitchSlider on={autoCreate} />
              </Switch>
              <SwitchTextContainer>
                <SwitchTitle>Auto Create Contests</SwitchTitle>
              </SwitchTextContainer>
            </SwitchContainer>
          </FormSection>
          <FormSection>
            <FormButtonContainer>
              <FormButton
                onClick={() =>
                  createLeague({
                    sports,
                    leagueName,
                    defaultBuyIn: Number(defaultBuyIn),
                    autoCreate,
                    createdById: user.id
                  })
                    .then(
                      (response: {
                        data: {
                          createLeague: { id: string }
                        }
                      }) => {
                        if (response.data.createLeague) {
                          redirect(
                            {},
                            `/league/${response.data.createLeague.id}`
                          );
                        } else {
                          this.setState({
                            errors: response.data.createLeague.errors
                          });
                        }
                      }
                    )
                    .catch(
                      (err: { graphQLErrors?: Array<{ message: string }> }) => {
                        // this.getServerErrors(err);
                        console.log(err);
                      }
                    )
                }
              >
                Create League
              </FormButton>
            </FormButtonContainer>
          </FormSection>
        </LeftCol>
        <RightCol />
      </DoubleCol>
    </Container>
  );
};

CreateLeagueForm.propTypes = {
  mutations: PropTypes.shape({
    createLeague: PropTypes.func.isRequired
  }).isRequired,
  reduxState: PropTypes.object.isRequired
};

export default connect(CreateLeagueForm);
