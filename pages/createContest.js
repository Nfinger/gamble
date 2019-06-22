// @flow
import * as React from 'react';
import CreateContestForm from '../components/CreateContestForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props => (
  <DefaultCon title="Create Contest" {...props}>
    <CreateContestForm {...props} />
  </DefaultCon>
));
