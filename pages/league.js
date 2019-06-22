// @flow
import * as React from 'react';
import LeagueInfo from '../components/LeagueInfo';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props => (
  <DefaultCon title="Create Post" {...props}>
    <LeagueInfo {...props} />
  </DefaultCon>
));
