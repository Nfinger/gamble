// @flow
import * as React from 'react';
import CreateLeagueForm from '../components/CreateLeagueForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props => (
  <DefaultCon title="Create League" {...props}>
    <CreateLeagueForm {...props} />
  </DefaultCon>
));
