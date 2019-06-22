import { graphql } from 'react-apollo';
import sidebarGql from './sidebar.gql';

const withData = graphql(sidebarGql, {
  options: ({ reduxState: { auth: { user } = {} } }) => ({
    variables: {
      userId: user.id
    }
  }),
  props: ({ data: { loading, allLeagues, error } }) => ({
    loading,
    allLeagues,
    error
  })
});

export default comp => withData(comp);
