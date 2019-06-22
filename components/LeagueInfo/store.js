import { graphql } from 'react-apollo';
import leagueInfoGql from './leagueInfo.gql';

const withData = graphql(leagueInfoGql, {
  options: ({
    router: {
      url: {
        query: { leagueId }
      }
    }
  }) => ({
    variables: {
      leagueId
    }
  }),
  props: ({ data }) => {
    console.log(data);
    return {
      loading: data.loading,
      League: data.League,
      error: data.error
    };
  }
});

export default comp => withData(comp);
