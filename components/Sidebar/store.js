import { graphql } from 'react-apollo';
import sidebarGql from './sidebar.gql';

const withData = graphql(sidebarGql, {
  props: ({ data: { loading, error } }) => ({
    loading,
    error
  })
});

export default comp => withData(comp);
